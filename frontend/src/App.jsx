import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import Wishlist from "./pages/Wishlist";
import Compare from "./pages/Compare";
import Offers from "./pages/Offers";
import DailyDeals from "./pages/DailyDeals";
import FlashSale from "./pages/FlashSale";
import Category from "./pages/Category";
import CartDrawer from "./components/Cart/CartDrawer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AdminLogin from "./pages/admin/Login";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/Orders";
import OrderDetail from "./pages/admin/OrderDetail";

function App() {
  return (
    <ErrorBoundary>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/daily-deals" element={<DailyDeals />} />
        <Route path="/flash-sale" element={<FlashSale />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
      <CartDrawer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#3F3F46",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#6B4F3F",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#F59E0B",
              secondary: "#fff",
            },
          },
        }}
      />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
