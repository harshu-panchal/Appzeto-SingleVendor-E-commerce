import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiCreditCard, FiTruck, FiCheck, FiX, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useStore';
import { useAuthStore } from '../../store/authStore';
import { useAddressStore } from '../../store/addressStore';
import { useOrderStore } from '../../store/orderStore';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import MobileLayout from '../../components/Layout/Mobile/MobileLayout';
import MobileCheckoutSteps from '../../components/Mobile/MobileCheckoutSteps';
import PageTransition from '../../components/PageTransition';

const MobileCheckout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addresses, getDefaultAddress, addAddress } = useAddressStore();
  const { createOrder } = useOrderStore();
  
  const [step, setStep] = useState(1);
  const [isGuest, setIsGuest] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [shippingOption, setShippingOption] = useState('standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    country: '',
    paymentMethod: 'card',
  });

  useEffect(() => {
    if (isAuthenticated && user && !isGuest) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
      
      const defaultAddress = getDefaultAddress();
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setFormData((prev) => ({
          ...prev,
          name: defaultAddress.fullName || user.name || '',
          email: user.email || '',
          phone: defaultAddress.phone || user.phone || '',
          address: defaultAddress.address || '',
          city: defaultAddress.city || '',
          zipCode: defaultAddress.zipCode || '',
          state: defaultAddress.state || '',
          country: defaultAddress.country || '',
        }));
      }
    }
  }, [isAuthenticated, user, isGuest, getDefaultAddress]);

  const calculateShipping = () => {
    const total = getTotal();
    if (appliedCoupon?.type === 'freeship') {
      return 0;
    }
    if (total >= 100) {
      return 0;
    }
    if (shippingOption === 'express') {
      return 100;
    }
    return 50;
  };

  const total = getTotal();
  const shipping = calculateShipping();
  const tax = total * 0.1;
  const discount = appliedCoupon ? (appliedCoupon.type === 'percentage' 
    ? total * (appliedCoupon.value / 100) 
    : appliedCoupon.value) : 0;
  const finalTotal = Math.max(0, total + shipping + tax - discount);

  const validateCoupon = (code) => {
    const coupons = {
      'SAVE10': { type: 'percentage', value: 10, name: '10% Off' },
      'FREESHIP': { type: 'freeship', value: 0, name: 'Free Shipping' },
      'WELCOME20': { type: 'percentage', value: 20, name: '20% Off' },
      'SAVE50': { type: 'fixed', value: 50, name: '$50 Off' },
    };
    return coupons[code.toUpperCase()] || null;
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    const coupon = validateCoupon(couponCode);
    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success(`Coupon "${coupon.name}" applied!`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    setFormData({
      ...formData,
      name: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      zipCode: address.zipCode,
      state: address.state,
      country: address.country,
    });
  };

  const handleNewAddress = (addressData) => {
    const newAddress = addAddress(addressData);
    handleSelectAddress(newAddress);
    setShowAddressForm(false);
    toast.success('Address added and selected!');
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <MobileLayout showBottomNav={false} showCartBar={false}>
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <button
                onClick={() => navigate('/app')}
                className="gradient-green text-white px-6 py-3 rounded-xl font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </MobileLayout>
      </PageTransition>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      const order = createOrder({
        userId: isAuthenticated ? user?.id : null,
        items: items,
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          state: formData.state,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        subtotal: total,
        shipping: shipping,
        tax: tax,
        discount: discount,
        total: finalTotal,
        couponCode: appliedCoupon ? couponCode : null,
      });
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/app/order-confirmation/${order.id}`);
    }
  };

  return (
    <PageTransition>
      <MobileLayout showBottomNav={false} showCartBar={false}>
        <div className="w-full pb-24">
          {/* Header */}
          <div className="px-3 py-2 bg-white border-b border-gray-200 sticky top-1 z-30">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiArrowLeft className="text-xl text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
            </div>
            <MobileCheckoutSteps currentStep={step} totalSteps={3} />
          </div>

          {/* Guest Checkout Option */}
          {!isAuthenticated && !isGuest && (
            <div className="px-3 py-3 bg-white border-b border-gray-200">
              <div className="glass-card rounded-xl p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1.5 sm:mb-2">Have an account?</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Sign in for faster checkout</p>
                <div className="flex gap-2 sm:gap-3">
                  <Link
                    to="/app/login"
                    className="flex-1 py-2 sm:py-2.5 gradient-green text-white rounded-xl font-semibold text-sm sm:text-base text-center transition-all"
                  >
                    Sign In
                  </Link>
                  <button
                    onClick={() => setIsGuest(true)}
                    className="flex-1 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-3"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiTruck className="text-primary-600 text-lg" />
                  Shipping Information
                </h2>

                {/* Saved Addresses */}
                {isAuthenticated && addresses.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Saved Addresses</h3>
                    <div className="space-y-2 mb-2">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          onClick={() => handleSelectAddress(address)}
                          className={`p-2.5 sm:p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddressId === address.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2 flex-1">
                              <FiMapPin className="text-primary-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-sm">{address.name}</h4>
                                <p className="text-xs text-gray-600">{address.fullName}</p>
                                <p className="text-xs text-gray-600">{address.address}</p>
                                <p className="text-xs text-gray-600">
                                  {address.city}, {address.state} {address.zipCode}
                                </p>
                              </div>
                            </div>
                            {selectedAddressId === address.id && (
                              <FiCheck className="text-primary-600 text-xl flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                      <FiPlus />
                      Add New Address
                    </button>
                  </div>
                )}

                {/* Address Form */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-3"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiCreditCard className="text-primary-600 text-lg" />
                  Payment Method
                </h2>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {['card', 'cash', 'bank'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === method
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500"
                      />
                      <span className="font-semibold text-gray-800 capitalize text-sm sm:text-base">
                        {method === 'card' ? 'Credit/Debit Card' : method === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Shipping Options */}
                {total < 100 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Shipping Options</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <label
                        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          shippingOption === 'standard'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <input
                            type="radio"
                            name="shippingOption"
                            value="standard"
                            checked={shippingOption === 'standard'}
                            onChange={(e) => setShippingOption(e.target.value)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-800 text-sm sm:text-base block">Standard Shipping</span>
                            <p className="text-xs text-gray-600">5-7 business days</p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{formatPrice(50)}</span>
                      </label>
                      <label
                        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          shippingOption === 'express'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <input
                            type="radio"
                            name="shippingOption"
                            value="express"
                            checked={shippingOption === 'express'}
                            onChange={(e) => setShippingOption(e.target.value)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500"
                          />
                          <div>
                            <span className="font-semibold text-gray-800 text-sm sm:text-base block">Express Shipping</span>
                            <p className="text-xs text-gray-600">2-3 business days</p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{formatPrice(100)}</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Coupon Code */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Coupon Code</h3>
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3 py-2.5 sm:px-4 sm:py-3 gradient-green text-white rounded-xl font-semibold text-sm sm:text-base transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-green-50 rounded-xl">
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-green-800">{appliedCoupon.name} Applied</p>
                        <p className="text-xs text-green-600">Code: {couponCode}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode('');
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiX className="text-base sm:text-lg" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="glass-card rounded-xl p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3">Order Summary</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-3"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">Order Review</h2>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                    <FiMapPin className="text-primary-600 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm">{formData.address}</p>
                      <p className="text-xs text-gray-600">
                        {formData.city}, {formData.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                    <FiPhone className="text-primary-600 text-lg sm:text-xl" />
                    <p className="font-semibold text-gray-800 text-xs sm:text-sm">{formData.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                    <FiMail className="text-primary-600 text-lg sm:text-xl" />
                    <p className="font-semibold text-gray-800 text-xs sm:text-sm">{formData.email}</p>
                  </div>
                </div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Order Items</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-800 text-xs sm:text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 z-40 safe-area-bottom">
              <div className="flex gap-2 sm:gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 gradient-green text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
                >
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Address Form Modal */}
        <AnimatePresence>
          {showAddressForm && (
            <AddressFormModal
              onSubmit={handleNewAddress}
              onCancel={() => setShowAddressForm(false)}
            />
          )}
        </AnimatePresence>
      </MobileLayout>
    </PageTransition>
  );
};

// Address Form Modal Component
const AddressFormModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl p-4 sm:p-6 w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Add New Address</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX className="text-lg sm:text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Address Label</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              placeholder="Home, Work, etc."
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
          </div>
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="submit"
              className="flex-1 gradient-green text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all"
            >
              Add Address
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MobileCheckout;

