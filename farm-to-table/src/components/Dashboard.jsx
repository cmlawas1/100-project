// Dashboard.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    // Fetch total products from your backend API
    fetch("/get-products")
      .then((response) => response.json())
      .then((data) => setTotalProducts(data.length))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch total users from your backend API (similar to above)
    fetch("/get-users")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.length);
        setUsersList(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Add more API calls as needed for other data

  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <div className="revenue__box">
                <h5>Total Sales</h5>
                <span>$3678</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="order__box">
                <h5>Orders</h5>
                <span>678</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="products__box">
                <h5>Total Products</h5>
                <span>{totalProducts}</span>
              </div>
            </Col>
            <Col lg="3">
              <div className="users__box">
                <h5>Total Users</h5>
                <span>{totalUsers}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="p-5">
        <h5>Users</h5>
        <div className="row m-3">
          <div class="col fw-bold">
            <span>First Name</span>
          </div>
          <div class="col fw-bold">
            <span>Last Name</span>
          </div>
          <div class="col fw-bold">
            <span>Email</span>
          </div>
        </div>
        {usersList.map((user) => {
          return <>
            <div key={user.id} className={`row m-3`}>
              <div class="col">
                <span>{user.firstName}</span>
              </div>
              <div class="col">
                <span>{user.lastName}</span>
              </div>
              <div class="col">
                <span>{user.email}</span>
              </div>
            </div>
          </>
        })
        }
      </div>
    </div>
  );
}
