import Header from '../../components/Header';
import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
// import { MongoClient } from "mongodb"; // Import MongoClient from MongoDB driver
import { useNavigate } from "react-router-dom";
import Dashboard from '../../components/Dashboard';

//header menu options
const menus = [
  { name: "Home", url: "/merchant-home", id: 1 },
  { name: "Orders", url: "/orders", id: 2 },
  { name: "Reports", url: "/reports", id: 3},
  { name: "Log Out", url: "/", id: 4}
];

// const mongoURI = "your_mongodb_connection_string"; // Replace with your MongoDB connection string

export default function HomeM() {
  const navigate = useNavigate();
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   // Connect to MongoDB
    //   const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    //   await client.connect();

    //   // Access the database and collection
    //   const database = client.db("your_database_name"); // Replace with your database name
    //   const collection = database.collection("products");

    //   // Perform the database operations
    //   const result = await collection.insertOne({
    //     productName: enterTitle,
    //     shortDesc: enterShortDesc,
    //     description: enterDescription,
    //     category: enterCategory,
    //     price: enterPrice,
    //     imgUrl: "placeholder_for_image_url", // You need to handle image storage separately
    //   });

    //   setLoading(false);
    //   console.log("Product Added Successfully:", result);
    //   navigate("/dashboard/all-products");
    // } catch (error) {
    //   setLoading(false);
    //   console.error("Failed to add product:", error);
    // } finally {
    //   // Close the MongoDB connection
    //   await client.close();
    // }
  };

  return (      
      <section>
      <Header data={menus} title="Bahay Kubo"/>
      <Dashboard/>
    </section>
  );
}