import React from "react";
import { Container, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";
import { NavLink } from "react-router-dom";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  // {
  //   display: "Users",
  //   path: "/dashboard/users",
  // },
];

const API_BASE_URL = "http://your-backend-api-base-url"; // Replace with your backend API base URL

export default function AdminNav() {
  const { currentUser } = useAuth();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          // Include any necessary headers, such as authentication tokens
          // "Authorization": `Bearer ${yourAuthToken}`,
        },
      });
      const data = await response.json();
      console.log("Dashboard Data:", data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Similar functions for fetching product and order data

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>Multimart</h2>
                <div className="search__box">
                  <input type="text" placeholder="Search here" />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
                <div className="admin__nav-top-right">
                  <span>
                    <i className="ri-notification-3-line"></i>
                  </span>
                  <span>
                    <i className="ri-settings-2-line"></i>
                  </span>
                  <img src={currentUser && currentUser.photoURL} alt="" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, i) => (
                  <li className="admin__menu-item" key={i}>
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        if (item.path === "/dashboard") {
                          fetchDashboardData();
                        } else if (item.path === "/dashboard/all-products") {
                          // Call function to fetch product data
                        } else if (item.path === "/dashboard/orders") {
                          // Call function to fetch order data
                        }
                      }}
                      className={(navClass) =>
                        navClass.isActive ? " active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

