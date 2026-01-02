import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import UserListPage from './pages/UserListPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <Navbar />
                        <main style={{ flex: 1 }}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/product/:id" element={<ProductDetailsPage />} />
                                <Route path="/cart" element={<CartPage />} />

                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/profile" element={<div className="container"><h2>My Profile</h2><p>Welcome to your protected profile page.</p></div>} />
                                    <Route path="/shipping" element={<ShippingPage />} />
                                    <Route path="/payment" element={<PaymentPage />} />
                                    <Route path="/placeorder" element={<PlaceOrderPage />} />
                                    <Route path="/order/:id" element={<OrderDetailsPage />} />
                                    <Route path="/my-orders" element={<OrderHistoryPage />} />
                                    <Route path="/add-product" element={<AddProductPage />} />
                                    <Route path="/edit-product/:id" element={<EditProductPage />} />
                                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                                    <Route path="/admin/users" element={<UserListPage />} />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
