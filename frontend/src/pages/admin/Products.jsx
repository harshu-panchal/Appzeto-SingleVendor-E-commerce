import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiFilter, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DataTable from '../../components/Admin/DataTable';
import ExportButton from '../../components/Admin/ExportButton';
import Badge from '../../components/Badge';
import { formatCurrency } from '../../utils/adminHelpers';
import { formatPrice } from '../../utils/helpers';
import { products as initialProducts } from '../../data/products';
import toast from 'react-hot-toast';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Load products from localStorage or use initial products
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('admin-products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save products to localStorage when they change
  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('admin-products', JSON.stringify(newProducts));
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((product) => product.stock === selectedStatus);
    }

    return filtered;
  }, [products, searchQuery, selectedStatus]);

  // Table columns
  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={value}
            className="w-10 h-10 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/50x50?text=Product';
            }}
          />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value) => formatPrice(value),
    },
    {
      key: 'stockQuantity',
      label: 'Stock',
      sortable: true,
      render: (value) => value.toLocaleString(),
    },
    {
      key: 'stock',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === 'in_stock'
              ? 'success'
              : value === 'low_stock'
              ? 'warning'
              : 'error'
          }
        >
          {value.replace('_', ' ').toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/products/${row.id}`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const newProducts = products.filter((p) => p.id !== id);
      saveProducts(newProducts);
      toast.success('Product deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select products to delete');
      return;
    }
    if (window.confirm(`Delete ${selectedProducts.length} products?`)) {
      const newProducts = products.filter((p) => !selectedProducts.includes(p.id));
      saveProducts(newProducts);
      setSelectedProducts([]);
      toast.success('Products deleted successfully');
    }
  };

  const handleExport = () => {
    const headers = [
      { label: 'ID', accessor: (row) => row.id },
      { label: 'Name', accessor: (row) => row.name },
      { label: 'Price', accessor: (row) => formatCurrency(row.price) },
      { label: 'Stock', accessor: (row) => row.stockQuantity },
      { label: 'Status', accessor: (row) => row.stock },
    ];
    // Export handled by ExportButton component
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="flex items-center gap-2 px-4 py-2 gradient-green text-white rounded-lg hover:shadow-glow-green transition-all font-semibold"
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          {/* Export Button */}
          <ExportButton
            data={filteredProducts}
            headers={[
              { label: 'ID', accessor: (row) => row.id },
              { label: 'Name', accessor: (row) => row.name },
              { label: 'Price', accessor: (row) => formatCurrency(row.price) },
              { label: 'Stock', accessor: (row) => row.stockQuantity },
              { label: 'Status', accessor: (row) => row.stock },
            ]}
            filename="products"
          />
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 p-3 bg-primary-50 rounded-lg flex items-center justify-between">
            <span className="text-sm font-semibold text-primary-700">
              {selectedProducts.length} product(s) selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <DataTable
        data={filteredProducts}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        onRowClick={(row) => navigate(`/admin/products/${row.id}/edit`)}
      />
    </motion.div>
  );
};

export default Products;

