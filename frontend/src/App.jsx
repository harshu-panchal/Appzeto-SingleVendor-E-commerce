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
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailPage from "./pages/OrderDetail";
import TrackOrder from "./pages/TrackOrder";
// Mobile App Routes
import MobileHome from "./pages/App/Home";
import MobileProductDetail from "./pages/App/ProductDetail";
import MobileCategory from "./pages/App/Category";
import MobileCategories from "./pages/App/categories";
import MobileCheckout from "./pages/App/Checkout";
import MobileSearch from "./pages/App/Search";
import MobileLogin from "./pages/App/Login";
import MobileRegister from "./pages/App/Register";
import MobileProfile from "./pages/App/Profile";
import MobileOrders from "./pages/App/Orders";
import MobileOrderDetail from "./pages/App/OrderDetail";
import MobileAddresses from "./pages/App/Addresses";
import MobileWishlist from "./pages/App/Wishlist";
import MobileCompare from "./pages/App/Compare";
import MobileOffers from "./pages/App/Offers";
import MobileDailyDeals from "./pages/App/DailyDeals";
import MobileFlashSale from "./pages/App/FlashSale";
import MobileTrackOrder from "./pages/App/TrackOrder";
import MobileOrderConfirmation from "./pages/App/OrderConfirmation";

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
      <Route path="/order-confirmation/:orderId" element={<RouteWrapper><OrderConfirmation /></RouteWrapper>} />
      <Route path="/orders/:orderId" element={<RouteWrapper><OrderDetailPage /></RouteWrapper>} />
      <Route path="/track-order/:orderId" element={<RouteWrapper><TrackOrder /></RouteWrapper>} />
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
        {/* Mobile App Routes */}
        <Route path="/app" element={<RouteWrapper><MobileHome /></RouteWrapper>} />
        <Route path="/app/product/:id" element={<RouteWrapper><MobileProductDetail /></RouteWrapper>} />
        <Route path="/app/category/:id" element={<RouteWrapper><MobileCategory /></RouteWrapper>} />
        <Route path="/app/categories" element={<RouteWrapper><MobileCategories /></RouteWrapper>} />
        <Route path="/app/checkout" element={<RouteWrapper><MobileCheckout /></RouteWrapper>} />
        <Route path="/app/search" element={<RouteWrapper><MobileSearch /></RouteWrapper>} />
        <Route path="/app/login" element={<RouteWrapper><MobileLogin /></RouteWrapper>} />
        <Route path="/app/register" element={<RouteWrapper><MobileRegister /></RouteWrapper>} />
        <Route path="/app/wishlist" element={<RouteWrapper><MobileWishlist /></RouteWrapper>} />
        <Route path="/app/compare" element={<RouteWrapper><MobileCompare /></RouteWrapper>} />
        <Route path="/app/offers" element={<RouteWrapper><MobileOffers /></RouteWrapper>} />
        <Route path="/app/daily-deals" element={<RouteWrapper><MobileDailyDeals /></RouteWrapper>} />
        <Route path="/app/flash-sale" element={<RouteWrapper><MobileFlashSale /></RouteWrapper>} />
        <Route path="/app/order-confirmation/:orderId" element={<RouteWrapper><MobileOrderConfirmation /></RouteWrapper>} />
        <Route path="/app/orders/:orderId" element={<RouteWrapper><MobileOrderDetail /></RouteWrapper>} />
        <Route path="/app/track-order/:orderId" element={<RouteWrapper><MobileTrackOrder /></RouteWrapper>} />
        <Route
          path="/app/profile"
          element={
            <RouteWrapper>
              <ProtectedRoute>
                <MobileProfile />
              </ProtectedRoute>
            </RouteWrapper>
          }
        />
        <Route
          path="/app/orders"
          element={
            <RouteWrapper>
              <ProtectedRoute>
                <MobileOrders />
              </ProtectedRoute>
            </RouteWrapper>
          }
        />
        <Route
          path="/app/addresses"
          element={
            <RouteWrapper>
              <ProtectedRoute>
                <MobileAddresses />
              </ProtectedRoute>
            </RouteWrapper>
          }
        />
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
            background: "#212121",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#388E3C",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#FF6161",
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
