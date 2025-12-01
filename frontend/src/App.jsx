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
import RouteWrapper from "./components/RouteWrapper";

// Inner component that has access to useLocation
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteWrapper><Home /></RouteWrapper>} />
      <Route path="/product/:id" element={<RouteWrapper><ProductDetail /></RouteWrapper>} />
      <Route path="/category/:id" element={<RouteWrapper><Category /></RouteWrapper>} />
      <Route path="/checkout" element={<RouteWrapper><Checkout /></RouteWrapper>} />
      <Route path="/search" element={<RouteWrapper><Search /></RouteWrapper>} />
      <Route path="/login" element={<RouteWrapper><Login /></RouteWrapper>} />
      <Route path="/register" element={<RouteWrapper><Register /></RouteWrapper>} />
      <Route path="/wishlist" element={<RouteWrapper><Wishlist /></RouteWrapper>} />
      <Route path="/compare" element={<RouteWrapper><Compare /></RouteWrapper>} />
      <Route path="/offers" element={<RouteWrapper><Offers /></RouteWrapper>} />
      <Route path="/daily-deals" element={<RouteWrapper><DailyDeals /></RouteWrapper>} />
      <Route path="/flash-sale" element={<RouteWrapper><FlashSale /></RouteWrapper>} />
      <Route
        path="/profile"
        element={
          <RouteWrapper>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </RouteWrapper>
        }
      />
      <Route
        path="/orders"
        element={
          <RouteWrapper>
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          </RouteWrapper>
        }
      />
      <Route
        path="/addresses"
        element={
          <RouteWrapper>
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          </RouteWrapper>
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
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes />
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
