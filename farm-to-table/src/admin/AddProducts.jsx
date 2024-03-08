import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { MongoClient } from "mongodb"; // Import MongoClient from MongoDB driver
import { useNavigate } from "react-router-dom";

const mongoURI = "your_mongodb_connection_string"; // Replace with your MongoDB connection string

export default function AddProducts() {
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

    try {
      // Connect to MongoDB
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      // Access the database and collection
      const database = client.db("your_database_name"); // Replace with your database name
      const collection = database.collection("products");

      // Perform the database operations
      const result = await collection.insertOne({
        productName: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        price: enterPrice,
        imgUrl: "placeholder_for_image_url", // You need to handle image storage separately
      });

      setLoading(false);
      console.log("Product Added Successfully:", result);
      navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      console.error("Failed to add product:", error);
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary "></div>
              </div>
            ) : (
              <>
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product Name</span>
                    <input
                      type="text"
                      placeholder="Product Item"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Shot Description</span>
                    <input
                      type="text"
                      placeholder="lorem....."
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Descriptipn....."
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$100"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option>Select Category</option>
                        <option value="Product1">Product1</option>
                        <option value="Product2">Product1</option>
                        <option value="Product3">Product1</option>
                        <option value="Product4">Product1</option>
                        <option value="Product5">Product1</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className="form__group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        required
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                      />
                    </FormGroup>
                  </div>
                  <button type="submit" className="buy__btn">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
