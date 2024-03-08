import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Items from '../../components/Items';

// Header menu options
const menus = [
  { name: "Home", url: "/customer-home", id: 1 },
  { name: "My Orders", url: "/my-orders", id: 2 },
  { name: "Log Out", url: "/", id: 3 }
];

export default function HomeC() {
  //useEffect for product display
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('/get-products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // checker
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Header data={menus} title="Bahay Kubo" />
      <div className="container">
        <Items data={items} />
      </div>
    </>
  )
}