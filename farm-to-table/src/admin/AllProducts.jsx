import React from "react";
import { Container, Row, Col } from "reactstrap";
import { MongoClient, ObjectId } from "mongodb"; // Import MongoClient and ObjectId from MongoDB driver
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";

const mongoURI = "your_mongodb_connection_string"; // Replace with your MongoDB connection string

export default function AllProducts() {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    try {
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const database = client.db("your_database_name"); // Replace with your database name
      const collection = database.collection("products");

      const result = await collection.deleteOne({ _id: ObjectId(id) }); // Use ObjectId to convert the id to MongoDB ObjectId

      if (result.deletedCount === 1) {
        toast.success("Deleted Successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      await client.close();
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className=" spinner-border text-secondary mt-5"></div>
                ) : (
                  productsData.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img src={item.imgUrl} alt={item.title} />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
