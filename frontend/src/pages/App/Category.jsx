import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiFilter, FiArrowLeft, FiGrid, FiList } from "react-icons/fi";
import { motion } from "framer-motion";
import MobileLayout from "../../components/Layout/Mobile/MobileLayout";
import ProductCard from "../../components/ProductCard";
import ProductListItem from "../../components/Mobile/ProductListItem";
import MobileFilterPanel from "../../components/Mobile/MobileFilterPanel";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import PageTransition from "../../components/PageTransition";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import LazyImage from "../../components/LazyImage";

const MobileCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryId = parseInt(id);
  const category = categories.find((cat) => cat.id === categoryId);

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
  });

  const categoryMap = {
    1: [
      "t-shirt",
      "shirt",
      "jeans",
      "dress",
      "gown",
      "skirt",
      "blazer",
      "jacket",
      "cardigan",
      "sweater",
      "flannel",
      "maxi",
    ],
    2: ["sneakers", "pumps", "boots", "heels", "shoes"],
    3: ["bag", "crossbody", "handbag"],
    4: ["necklace", "watch", "wristwatch"],
    5: ["sunglasses", "belt", "scarf"],
    6: ["athletic", "running", "track", "sporty"],
  };

  const categoryProducts = useMemo(() => {
    if (!category) return [];

    const keywords = categoryMap[categoryId] || [];
    let result = products.filter((product) => {
      const productName = product.name.toLowerCase();
      return keywords.some((keyword) => productName.includes(keyword));
    });

    if (filters.minPrice) {
      result = result.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      result = result.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }
    if (filters.minRating) {
      result = result.filter(
        (product) => product.rating >= parseFloat(filters.minRating)
      );
    }

    return result;
  }, [categoryId, category, filters]);

  const { displayedItems, hasMore, isLoading, loadMore, loadMoreRef } =
    useInfiniteScroll(categoryProducts, 10, 10);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
    });
  };

  if (!category) {
    return (
      <PageTransition>
        <MobileLayout showBottomNav={false} showCartBar={false}>
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Category Not Found
              </h2>
              <button
                onClick={() => navigate("/app")}
                className="gradient-green text-white px-6 py-3 rounded-xl font-semibold">
                Go Back Home
              </button>
            </div>
          </div>
        </MobileLayout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <MobileLayout showBottomNav={true} showCartBar={true}>
        <div className="w-full pb-24">
          {/* Header */}
          <div className="px-4 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiArrowLeft className="text-xl text-gray-700" />
              </button>
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <LazyImage
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/48x48?text=Category";
                  }}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {categoryProducts.length} product
                  {categoryProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* View Toggle Buttons */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-primary-600 shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    <FiList className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-primary-600 shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    <FiGrid className="text-lg" />
                  </button>
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="p-2.5 glass-card rounded-xl hover:bg-white/80 transition-colors">
                <FiFilter className="text-gray-600 text-lg" />
              </button>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="px-4 py-4">
            {categoryProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl text-gray-300 mx-auto mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  There are no products available in this category at the
                  moment.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {displayedItems.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="mt-6 flex flex-col items-center gap-4">
                    {isLoading && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">
                          Loading more products...
                        </span>
                      </div>
                    )}
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-6 py-3 gradient-green text-white rounded-xl font-semibold hover:shadow-glow-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="space-y-3">
                  {displayedItems.map((product, index) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="mt-6 flex flex-col items-center gap-4">
                    {isLoading && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">
                          Loading more products...
                        </span>
                      </div>
                    )}
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-6 py-3 gradient-green text-white rounded-xl font-semibold hover:shadow-glow-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        <MobileFilterPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      </MobileLayout>
    </PageTransition>
  );
};

export default MobileCategory;
