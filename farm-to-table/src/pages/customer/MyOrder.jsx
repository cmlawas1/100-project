import Header from '../../components/Header';
import Orders from '../../components/Orders';
import React, { useEffect, useState } from 'react';

//header menu options
const menus = [
  { name: "Home", url: "/customer-home", id: 1 },
  { name: "My Orders", url: "/my-orders", id: 2 },
  { name: "Log Out", url: "/", id: 3}
];

export default function MyOrder(){
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('/get-orders-by-user')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // checker
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return(
    <>
      <Header data={menus} title="Bahay Kubo"/>
      <Orders data={orders}/>
    </>
  )
}