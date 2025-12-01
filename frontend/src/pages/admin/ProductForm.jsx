import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiX, FiUpload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { products as initialProducts } from '../../data/products';
import toast from 'react-hot-toast';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id && id !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    price: '',
    originalPrice: '',
    image: '',
    stock: 'in_stock',
    stockQuantity: '',
    flashSale: false,
  });

  useEffect(() => {
    if (isEdit) {
      const savedProducts = localStorage.getItem('admin-products');
      const products = savedProducts ? JSON.parse(savedProducts) : initialProducts;
      const product = products.find((p) => p.id === parseInt(id));
      
      if (product) {
        setFormData({
          name: product.name || '',
          unit: product.unit || '',
          price: product.price || '',
          originalPrice: product.originalPrice || product.price || '',
          image: product.image || '',
          stock: product.stock || 'in_stock',
          stockQuantity: product.stockQuantity || '',
          flashSale: product.flashSale || false,
        });
      } else {
        toast.error('Product not found');
        navigate('/admin/products');
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.price || !formData.stockQuantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    const savedProducts = localStorage.getItem('admin-products');
    const products = savedProducts ? JSON.parse(savedProducts) : initialProducts;

    if (isEdit) {
      // Update existing product
      const updatedProducts = products.map((p) =>
        p.id === parseInt(id)
          ? {
              ...p,
              ...formData,
              id: parseInt(id),
              price: parseFloat(formData.price),
              originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
              stockQuantity: parseInt(formData.stockQuantity),
            }
          : p
      );
      localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
      toast.success('Product updated successfully');
    } else {
      // Create new product
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      const newProduct = {
        id: newId,
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stockQuantity: parseInt(formData.stockQuantity),
        rating: 0,
        reviewCount: 0,
      };
      const updatedProducts = [...products, newProduct];
      localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
      toast.success('Product created successfully');
    }

    navigate('/admin/products');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isEdit ? 'Edit Product' : 'Create Product'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update product information' : 'Add a new product to your catalog'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiX className="text-xl text-gray-600" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="e.g., Piece, Kilogram, Gram"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Price (for discount)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Image</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/products/product-image.png"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>

        {/* Inventory */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Status
              </label>
              <select
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Options */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Options</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="flashSale"
              checked={formData.flashSale}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-semibold text-gray-700">Flash Sale</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 gradient-green text-white rounded-lg hover:shadow-glow-green transition-all font-semibold"
          >
            <FiSave />
            {isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;

