// Contains both the display items and the cart functionality
import React, { useEffect, useState } from 'react';
import './Items.css';
import axios from 'axios';

export default function Items(props) {
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);

    //useEffect for user logged in
    useEffect(() => {
        axios.get('/start-session')
            .then(res => {
                if (res.data.success) {
                    setName(res.data.fname);
                    setEmail(res.data.email);
                }
            })
            .catch(e => console.log(e))
    }, [])

    let items = props.data;

    const [cartItems, setCartItems] = useState([]);
    const [itemQuantity, setItemQuantity] = useState([]);
    const [sortOption1, setsortOption1] = useState('Sort: A-Z');
    const [sortOption2, setsortOption2] = useState('Price: Low to High');
    const [sortOption3, setsortOption3] = useState('Type: Crops');
    const [sortOption4, setsortOption4] = useState('Quantity: Low to High');

    //adds item to cart
    const addToCart = (item) => {
        if (item.productQty > 0) { //if there is enough stock
            console.log('enough stock');

            let flag = 0; //checker if item is already in cart
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id == item.productID) {
                    flag = 1;
                    if(cartItems[i].qty < item.productQty) {
                        setCartItems(
                            cartItems.map(cartItem =>
                                cartItem.id === item.productID
                                    ? { ...cartItem, qty: cartItem.qty + 1 }
                                    : cartItem
                            )
                        );
                    }
                    break;
                }
            }

            if (flag == 0) { // if item not found, create new cart item
                const newCartItem = { name: item.productName, url: item.productURL, price: item.productPrice, id: item.productID, qty: 1 }; //gets relevant info for new cart item from item info
                setCartItems([...cartItems, newCartItem]); //appends new cart item to cartItems
                console.log(item.productName + " is successfully added to cart.");
            }
            // console.log(cartItems);
        }
    }

    //deletes item in cart
    const deleteFromCart = (itemId) => {
        const index = cartItems.findIndex(item => item.id === itemId); //finds index of item in cartItems using id
        if (index !== -1) { //if index exists
            const updatedCartItems = cartItems.filter(item => item.id !== itemId); //remove item
            setCartItems(updatedCartItems.map(item => { //updates cartItems
                if (item.id > itemId) {
                    return { ...item, id: item.id - 1 }; //edits indices of items after deleted item so that there will be no duplication
                } else {
                    return item;
                }
            }));
        }
    }

    // Function to handle dropdown selection
    const handleDropdownSelect = (option, dropdownNumber) => {
        switch (dropdownNumber) {
            case 1:
                setsortOption1(option);
                // Implement sorting logic for dropdown 1 based on 'option'
                console.log("Sorting selected for dropdown 1: " + option);
                break;
            case 2:
                setsortOption2(option);
                // Implement sorting logic for dropdown 2 based on 'option'
                console.log("Sorting selected for dropdown 2: " + option);
                break;
            case 3:
                setsortOption3(option);
                // Implement sorting logic for dropdown 3 based on 'option'
                console.log("Sorting selected for dropdown 3: " + option);
                break;

            case 4:
                setsortOption4(option);
                // Implement sorting logic for dropdown 4 based on 'option'
                console.log("Sorting selected for dropdown 4: " + option);
                break;
            default:
                break;
        }
    };

    const totalPrice = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price, 0);

    const placeOrder = (cartItems) => {
        
        axios.post('/save-order', { cartItems, email }) //communicates with backend
            .then(result => {
                console.log(result);
                window.location.reload(false);
            })
            .catch(error => console.log(error));

        // DATABASE: add code on storing cartItems to database
        setCartItems([]); //empties cartItems
        console.log("Orders placed.");
    }

    // returns the items and the cart in the UI with an input in App.js
    return (
        <>
            {/* ITEMS SECTION */}
            <div className="row">
                <div className="col-md-9">
                    <h3>WELCOME, {name}!</h3>
                    <div className="row g-4"> {/* represents one row of items */}
                        {
                            items.map((item) => (
                                <div key={item.productID} className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="card card-custom">
                                        <img src={item.productURL} className="card-img-top img-custom" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title text-center">{item.productName}</h6>
                                            <span style={{ fontSize: "small" }}>Price: {item.productPrice}</span><br />
                                            <span style={{ fontSize: "small" }}>Quantity: {item.productQty}</span><br />
                                            <span style={{ fontSize: "small" }}>Type: {item.productType}</span>
                                            <button type="button" className="flesh" onClick={() => addToCart(item)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-3">

                    {/* DROPDOWNS FOR SORTING */}
                    <div className="row dropdown">
                        <button className="btn sort-button dropdown-toggle" type="button" id="alphabetical" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortOption1}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="alphabetical">
                            <li><a className="dropdown-item" onClick={() => handleDropdownSelect('Sort: A-Z', 1)}>Sort: A-Z</a></li>
                            <li><a className="dropdown-item" onClick={() => handleDropdownSelect('Sort: Z-A', 1)}>Sort: Z-A</a></li>
                        </ul>
                    </div>

                    <div className="row dropdown">
                        <button className="btn sort-button dropdown-toggle" type="button" id="pricesort" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortOption2}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="pricesort">
                            <li><a className="dropdown-item" href="#" onClick={() => handleDropdownSelect('Price: Low to High', 2)}>Price: Low to High</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleDropdownSelect('Price: High to Low', 2)}>Price: High to Low</a></li>
                        </ul>
                    </div>

                    <div className="row dropdown">
                        <button className="btn sort-button dropdown-toggle" type="button" id="typesort" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortOption3}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="typesort">
                            <li><a className="dropdown-item" href="#" onClick={() => handleDropdownSelect('Type: Crops', 3)}>Type: Crops</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleDropdownSelect('Type: Poultry', 3)}>Type: Poultry</a></li>
                        </ul>
                    </div>

                    <div className="row dropdown">
                        <button className="btn sort-button dropdown-toggle" type="button" id="qtysort" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortOption4}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="qtysort">
                            <li><a className="dropdown-item" href="#" onClick={() => handleDropdownSelect('Quantity: Low to High', 4)}>Quantity: Low to High</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleDropdownSelect('Quantity: High to Low', 4)}>Quantity: High to Low</a></li>
                        </ul>
                    </div>

                    <h3>CART ({cartItems.length} items)</h3>
                    <h5>Total Price: {totalPrice}</h5>
                    <button type="button" className="green" onClick={() => placeOrder(cartItems)}>PLACE ORDER</button>

                    {/* cart details and layout */}
                    {
                        cartItems.map((cartItem) => {
                            return <>
                                <div className="card card-custom mb-2" key={cartItem.id}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img className="img-custom" src={cartItem.url} style={{ maxHeight: "60px" }} />
                                        </div>
                                        <div className="col-md-6">
                                            <span>{cartItem.name}</span><br />
                                            <span>Price: {cartItem.price}</span><br />
                                            <span>Qty: {cartItem.qty}</span>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="green" style={{ fontSize: "smaller", paddingInline: "10px" }} onClick={() => deleteFromCart(cartItem.id)}>X</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
        </>
    )
}