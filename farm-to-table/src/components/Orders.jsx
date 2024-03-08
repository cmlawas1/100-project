// Contains the orders a user has made
import React, { useState, useEffect } from 'react';
import './Orders.css';

export default function Orders(props) {
    const [ordersList, setOrdersList] = useState(props.data);

    const fetchProductbyId = async (pid) => {
        try {
            console.log("pid: "+ pid);
            const response = await fetch(`/get-product-by-id?productID=${pid}`);
            if (response.ok) {
                const p = await response.json();
                console.log("fetchProductbyId p:" + p.url + p.name);
                return p;
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        setOrdersList(props.data);
    }, [props.data]);

    const cancelOrder = (orderId) => {
        // axios.put(`/cancel-order/${orderId}`)
        //     .then(response => {
        //         // Assuming your backend responds with the updated order details or a success message
        //         console.log(response.data);
        //         const updatedOrders = ordersList.map(order => {
        //             if (order.transactnID === orderId) {
        //                 return { ...order, orderStatus: 0 }; // Update the order status locally
        //             }
        //             return order;
        //         });
        //         setOrdersList(updatedOrders); // Update the state of ordersList with the new status
        //     })
        //     .catch(error => {
        //         console.error('Error cancelling order:', error);
        //     });
    };

    // returns the user's orders in the UI from the orders database
    return (
        <>
            <h3>ORDER STATUS</h3>

            {
                ordersList.map((order) => {
                    // const orderedProducts = itemsList.filter(product => order.productID.includes(product.id));

                    if (order.orderStatus === 1) {
                        return <>
                            <div key={order.transactnID} className={`row m-3 card-custom confirmed-container`}>
                                <div class="row p-2">
                                    {/* <img src={order.url} class="img-custom" width="100px" alt="..." /> */}
                                </div>
                                <div class="col">
                                    {order.productID.map((product, index) => (
                                        <div key={product}>
                                            <p>Product ID: {product}</p>
                                            <p id = {product}>Quantity: {order.orderQty[index]}</p>
                                            <img id = "product-url" src={fetchProductbyId(product).url} width="100px" alt="Product" />
                                            <p id = "product-name">Name: {fetchProductbyId(product).name}</p>
                                        </div>
                                    ))}

                                    
                                </div>
                                <div class="col">
                                    Date Ordered: {new Date(order.dateOrdered).toLocaleString()}
                                </div>
                                <div class="col">
                                    <button type="button" class="disabled-button">CONFIRMED</button>
                                </div>
                            </div>
                        </>
                    } else if (order.orderStatus === 2) {
                        return <>
                            <div key={order.transactnID} className={`row m-3 card-custom cancelled-container`}>
                                <div class="row">
                                    {/* <img src={order.url} class="img-custom" width="100px" alt="..." /> */}
                                </div>
                                <div class="col">
                                    <span>{order.productID}</span><br />
                                    <span>{order.orderQty}</span>
                                </div>
                                <div class="col">
                                    Date Ordered: {new Date(order.dateOrdered).toLocaleString()}
                                </div>
                                <div class="col">
                                    <button type="button" class="disabled-cancel-button" disabled>CANCELLED</button>
                                </div>
                            </div>
                        </>
                    } else {
                        return <>
                            <div key={order.transactnID} className={`row m-3 card-custom`}>
                                <div class="row">
                                    {/* <img src={order.url} class="img-custom" width="100px" alt="..." /> */}
                                </div>
                                <div class="col">
                                    <span>{order.productID}</span><br />
                                    <span>{order.orderQty}</span>
                                </div>
                                <div class="col">
                                    Status: PENDING<br />
                                    Date Ordered: {new Date(order.dateOrdered).toLocaleString()}
                                </div>
                                <div class="col">
                                    <button type="button" class="flesh cancel-button" onClick={() => cancelOrder(order.transactnID)}>CANCEL</button>
                                </div>
                            </div>
                        </>
                    }

                })
            }
        </>
    )
}