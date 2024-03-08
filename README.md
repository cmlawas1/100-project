
# Bahay Kubo

Bahay Kubo is a web application designed to be used by two types of users: the customers (farmers and buyers) and the merchants (Department of Agriculture employees). On the app, customers can purchase different types of produce, and merchants can manage orders, users, and products.

## Features

### User Platform

Customers can register to the site, as well as log in and manage their orders through their account.

### Products Purchasing

Customers can view all available products on the customer homepage, as well as the available quantity and what type of product they are (1 - Crop; 2 - Poultry). ~~The products can also be sorted depending on name, price, or quantity available.~~ The quantities are updated per product, depending on pending or confirmed orders.

Customers can add to their shopping cart on the same page, and they can delete items from their cart. Once they're satisfied, they can place an order. The total price for each order can be seen.

### Order Management

Customers can view their orders in the Orders page. ~~If the order is not yet completed, they can cancel it.~~

Merchants are able to view orders, as well as cancel or confirm them.

### User & Product Management

Merchants can view a list of all registered users, as well as the total number of users and products. Merchants can delete users, as well as delete or add products.

## How to Use 

### Dependencies
- Node JS
- React JS
- Express JS
- Axios
- Cors
- MongoDB, Mongo Compass or Mongo Shell
- Mongoose
- Concurrently

### Database Setup
You can import your own database into MongoDB or use the provided database in the project files labeled 'data'.

### Launching the App

1. Make sure your local MongoDB connection string is running.

2. Go to the root folder. Run `npm i` to install dependencies.

3. Go to the subfolder "farm-to-table". From there, open the integrated terminal.Once inside the terminal and the proper folder directory, install all necessary dependencies by running `npm i`. Alternatively, you can run `npm install express axios mongoose cors concurrently` to download all packages. 

4. Once the dependencies are installed, to run the app, simply run `npm dev`, making sure you are still in the "farm-to-table" folder.

5. Once the React app launches, you can now use it on your respective browser. Register or Log In as a user, or Log In as merchant to access the appropriate pages. The pages are accessible via navigation bar at the top of the page.

## Screenshots

### Register and Login
![App Screenshot](/screenshots/register.jpg)
![App Screenshot](/screenshots/login.jpg)

### Customer side
![App Screenshot](/screenshots/customer-home.jpg)
![App Screenshot](/screenshots/customer-home%20add-to-cart.jpg)
![App Screenshot](/screenshots/customer-orders.jpg)

### Admin side
![App Screenshot](/screenshots/merchant-home.jpg)
![App Screenshot](/screenshots/merchant-orders.jpg)
![App Screenshot](/screenshots/merchant-reports.jpg)

## Authors

- Cresel Lawas: [@cmlawas1](https://www.github.com/cmlawas1)
- Aira Moon: [@AiraMoon](https://www.github.com/AiraMoon)
- Francesca Oruga: [@hirasol FAO***a ](https://www.github.com/hirasol)
- Luel Hernandez: [@luelhernandez](https://www.github.com/luelhernandez)

from Group 2 of CMSC 100 EF-1L