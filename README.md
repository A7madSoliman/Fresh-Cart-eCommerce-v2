# eCommerce Project

Welcome to the eCommerce project! This is a full-stack eCommerce application built with modern web technologies. Below is an overview of the features, project structure, and how to get started.

## Features

- **User Authentication**: Secure login and signup functionality with password reset options.
- **Product Management**: Browse products by categories, view product details, and manage a shopping cart.
- **Wishlist**: Users can add products to their wishlist for future purchase.
- **Shopping Cart**: Add, remove, and update products in the shopping cart.
- **Checkout**: Secure checkout process for placing orders.
- **Order History**: View past orders and their status.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Protected Routes**: Certain routes are protected and only accessible to authenticated users.

## Technologies and Packages Used

The project leverages the following technologies and packages:

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: Provides DOM-specific methods for React.
- **React Router DOM**: Handles routing and navigation in the application.
- **Axios**: A promise-based HTTP client for making API requests.
- **Formik**: A library for building forms in React with ease.
- **Yup**: A schema validation library often used with Formik.
- **JWT Decode**: A library to decode JSON Web Tokens for authentication.
- **React Query**: A library for managing server state and data fetching.
- **React Helmet**: A library to manage document head elements (e.g., title, meta tags).
- **React Hot Toast**: A lightweight toast notification library.
- **React Image Gallery**: A responsive image gallery component.
- **Swiper**: A modern slider and carousel library.
- **Material-UI (MUI)**: A popular React UI framework for building responsive and attractive designs.
  - **@mui/material**: Core Material-UI components.
  - **@mui/icons-material**: Material-UI icons.
- **Emotion**: A library for CSS-in-JS styling.
  - **@emotion/react**: Core Emotion library.
  - **@emotion/styled**: Styled components for Emotion.

## Project Structure

The project is organized as follows:

- **node_modules**: Contains all the npm packages and dependencies.
- **public**: Static assets like images and the main HTML file.
- **src**: Source code of the application.
  - **assets**: Images, styles, and other static files.
  - **Components**: Reusable UI components.
    - **CategoryGlider**: Component for displaying categories.
    - **Footer**: Footer component.
    - **HomeSlider**: Home page slider.
    - **Navbar**: Navigation bar.
    - **ProductCart**: Component for displaying product cards.
    - **ProtectedRoute**: Component for protecting routes.
  - **Context**: Context providers for global state management.
    - **Cart.context**: Manages the shopping cart state.
    - **User.context**: Manages user authentication state.
    - **Wishlist.context**: Manages the wishlist state.
  - **Hooks**: Custom React hooks.
    - **useProducts**: Hook for fetching products.
  - **Layout**: Main layout component.
  - **Loading**: Loading spinner component.
  - **Pages**: Different pages of the application.
    - **AllBrands**: Page to display all brands.
    - **AllOrders**: Page to display all orders.
    - **AllProducts**: Page to display all products.
    - **CheckOut**: Checkout page.
    - **ForgetPassword**: Page for resetting password.
    - **Home**: Home page.
    - **Login**: Login page.
    - **Notfound**: 404 page.
    - **ProductDetails**: Page for product details.
    - **ResetPassword**: Page for resetting password.
    - **ShoppingCart**: Shopping cart page.
    - **Signup**: Signup page.
    - **VerifyResetCode**: Page for verifying reset code.
    - **WishList**: Wishlist page.
  - **App.css**: Main styles for the application.
  - **App.jsx**: Main application component.
  - **Index.css**: Global styles.
  - **main.jsx**: Entry point of the application.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/A7madSoliman/Fresh-Cart-eCommerce-v2.git
   ```
