import { registerUser, loginUser, startSession, getUsers, getAllProducts, saveOrder, getOrdersbyUser, getProductByID, getOrderbyStatus, cancelOrder } from './controller.mjs';
// import controller from './controller.mjs';
export default function router(app) {
    // Enable CORS for all routes
    app.use((req,res,next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Credentials','true');
        res.setHeader('Access-Control-Allow-Methods','GET,HEAD,OPTIONS,PUT,POST,DELETE');
        next();
    })

    // routes
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.get('/start-session', startSession);
    app.get('/get-users', getUsers);
    app.get('/get-products', getAllProducts);
    app.post('/save-order', saveOrder);
    app.get('/get-orders-by-user', getOrdersbyUser);
    app.get('/get-product-by-id', getProductByID);
    app.get('/get-order-by-status', getOrderbyStatus);
    app.put('/cancel-order/:orderId', cancelOrder);
}