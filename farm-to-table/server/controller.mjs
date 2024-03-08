import mongoose from 'mongoose';

// CONNECT to MongoDB instance
mongoose.connect('mongodb://127.0.0.1:27017/BahayKubo');

//User Mongoose model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userType: String,
  email: String,
  password: String,
}, { collection: 'Users' });

// CREATE Mongoose models based on given format, save to respective collections
//Product Mongoose model
const productSchema = new mongoose.Schema({
  productID: Number,
  productName: String,
  productType: String,
  productPrice: Number,
  productDesc: String,
  productQty: Number,
  productURL: String,
}, { collection: 'Products' });

// Order Mongoose model
const orderSchema = new mongoose.Schema({
  transactnID: String,
  productID: [Number], // reference to product
  orderQty: [Number], // upon confirmation, will be decreased from product qty
  orderStatus: Number, // 0-Pending, 1-Completed, 2-Canceled
  email: String, // reference to user
  dateOrdered: {
    type: Date,
    default: Date.now // timestamp of when the order was created
  }
}, { collection: 'Orders' });

// Create a Mongoose model for your items
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

//POST user registration
export const registerUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    console.log('User already exists.');
  } else {
    //setting up user credentials
    const user = {
      firstName: req.body.fname,
      lastName: req.body.lname,
      userType: 'user',
      email: req.body.email,
      password: req.body.password,
    }

    try {
      const newUser = await User.insertMany(user);
      console.log(newUser);
      res.send('Successfully registered.');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

//POST user login
export const loginUser = async (req, res) => {
  //checks if user email is in the database
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    if (req.body.password === userExists.password) { //checks if passwords match
      req.session.fname = userExists.firstName;
      req.session.email = userExists.email;
      // console.log(req.session.fname);
      // console.log(req.session.email);
      res.json({ success: true, name: req.session.fname, email: req.session.email });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
}

//GET user login session
export const startSession = async (req, res) => {
  if (req.session.fname) {
    return res.json({ success: true, fname: req.session.fname, email: req.session.email });
  } else {
    return res.json({ success: false });
  }
}

//GET fetches all items from the Products collection
export const getAllProducts = async (req, res) => {
  try {
    const items = await Product.find({}); //gets all items from database
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// unused/unintegrated code: for sorting products
// when integrated, this function should be triggered via the route and via an event from frontend
// basically: onClick() -> app.get('/get-products?sort=<insert properties fetched from dropdown menu>', getAllProducts); -> triggers this function
// export const getAllProducts = async (req, res) => {
//   try {
//     let query = Models.Product.find(
//         {}, // having this empty allows us to select & find all students/users
//         // (err, output) => {
//         //     if(!err) {
//         //         console.log(output);
//         //     }
//         // }
//     );
//     // sort these products
//     if(req.query.sort){ // checks if there is a given sort option
//       const sortBy = req.query.sort.split(",").join(" "); // for more than one sorting option
//       query = query.sort(sortBy); // should be one of these: name, type, price, quantity; /sort?=<property>; prefix: - for descending, no - for ascending, eg. /sort?=-name for sort by name descending
//     } else {
//       query = query.sort("productName");
//     }
//     const items = await query; // convert the object
  
//     res.send(items);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

//GET fetches all users from the Users collection
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}); //gets all items from database
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const transactionCount = async () => {
  try {
      const count = await Order.countDocuments({});
      return count;
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}

//POST save cart items into Orders collection
export const saveOrder = async (req, res) => {
  try {
    const { cartItems, email } = req.body;
    let ids = [];
    let qtys = [];
    for(var i=0; i<cartItems.length; i++) {
      ids[i] = cartItems[i].id;
      qtys[i] = cartItems[i].qty;
    }
    
    const count = await transactionCount();
    const order = {
      transactnID: count+1,
      productID: ids, 
      orderQty: qtys, // upon confirmation, will be decreased from product qty
      orderStatus: 0, // 0-Pending, 1-Completed, 2-Canceled
      email: email, // reference to user
      dateOrdered: new Date()
    };

    try {
      const newOrder = await Order.insertMany(order);
      console.log(newOrder);
      for(var i=0;i<ids.length;i++) {
        const product = await Product.find({productID: ids[i]});
        const updatedqty = product[0].productQty - qtys[i];
        
        const updateproduct = await Product.findOneAndUpdate(
          {productID: ids[i]}, {$set: {productQty: updatedqty}}
        ); 
      }

      res.send('Order successfully placed.');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//GET fetches all user's orders from the Orders collection
export const getOrdersbyUser = async (req, res) => {
  try {
    const orders = await Order.find({email: req.session.email}); //gets all orders of user
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//GET fetches all orders from the Orders collection
export const getProductByID = async (req, res) => {
  try {
    console.log('getProductByID req:'+req.query.productID);
    // Fetch products using product IDs
    const product = await Product.findOne({ productID: req.query.productID });
    console.log(product.productName);
    console.log(product.productURL);
    return res.json({url: product.productURL,name:product.productName});
    // return {url: product.productURL,name:product.productName};

  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

//GET fetches all orders from the Orders collection
export const getOrderbyStatus = async (req, res) => {
  try {
    const orders = await Order.find({orderStatus: req.params}); //gets all orders from database
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    Order.updateOne({ transactnID: orderId }, { $set: { orderStatus: 0 } })
    .then(updatedOrder => {
        res.json(updatedOrder);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to cancel the order' });
    });

    res.json({ message: 'Order successfully cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};