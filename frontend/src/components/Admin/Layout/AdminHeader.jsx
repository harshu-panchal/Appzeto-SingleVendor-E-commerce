import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { useAdminAuthStore } from '../../../store/adminAuthStore';

const AdminHeader = ({ onMenuClick }) => {
  const { admin } = useAdminAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left: Menu Button & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu className="text-2xl text-gray-700" />
          </button>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications & User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell className="text-xl text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          {admin && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-green rounded-full flex items-center justify-center text-white font-semibold">
                {admin.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

