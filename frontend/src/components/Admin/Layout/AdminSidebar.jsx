import { NavLink } from 'react-router-dom';
import { 
  FiLayout, 
  FiPackage, 
  FiShoppingBag, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout, admin } = useAdminAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiLayout },
    { path: '/admin/products', label: 'Products', icon: FiPackage },
    { path: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-green rounded-lg flex items-center justify-center">
                  <FiLayout className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                  <p className="text-gray-400 text-xs">E-commerce</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <Icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-700">
            {admin && (
              <div className="mb-4 p-3 bg-gray-700/50 rounded-xl">
                <p className="text-white font-semibold text-sm">{admin.name}</p>
                <p className="text-gray-400 text-xs">{admin.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <FiLogOut className="text-xl" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

