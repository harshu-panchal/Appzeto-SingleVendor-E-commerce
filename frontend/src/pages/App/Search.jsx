import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiMic } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import MobileLayout from '../../components/Layout/Mobile/MobileLayout';
import ProductCard from '../../components/ProductCard';
import MobileFilterPanel from '../../components/Mobile/MobileFilterPanel';
import SearchSuggestions from '../../components/Mobile/SearchSuggestions';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import PageTransition from '../../components/PageTransition';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import toast from 'react-hot-toast';

const MobileSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
  });

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const deleteRecentSearch = (index) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setShowSuggestions(false);
      setIsListening(false);
      saveRecentSearch(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice recognition error');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category) {
      const categoryMap = {
        'Fresh Vegetables': ['potato', 'cauliflower', 'onion', 'okra', 'coriander'],
        'Fresh Fruits': ['tomato', 'cherry'],
        'Chicken': ['chicken'],
        'Beef': ['beef', 'steak'],
      };
      const categoryKeywords = categoryMap[filters.category] || [];
      result = result.filter((product) =>
        categoryKeywords.some((keyword) =>
          product.name.toLowerCase().includes(keyword)
        )
      );
    }

    if (filters.minPrice) {
      result = result.filter((product) => product.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((product) => product.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minRating) {
      result = result.filter(
        (product) => product.rating >= parseFloat(filters.minRating)
      );
    }

    return result;
  }, [searchQuery, filters]);

  const { displayedItems, hasMore, isLoading, loadMore, loadMoreRef } = useInfiniteScroll(
    filteredProducts,
    10,
    10
  );

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set('q', searchQuery);
      saveRecentSearch(searchQuery);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
    setShowSuggestions(false);
  };

  const handleSuggestionSelect = (query) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    saveRecentSearch(query);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', query);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    });
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <PageTransition>
      <MobileLayout showBottomNav={true} showCartBar={true}>
        <div className="w-full pb-24">
          {/* Search Header */}
          <div className="px-4 py-4 bg-white border-b border-gray-200 sticky top-1 z-30">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-20 py-3 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 placeholder:text-gray-400 text-base"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <motion.button
                    type="button"
                    onClick={handleVoiceSearch}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening 
                        ? 'bg-red-100 text-red-600' 
                        : 'hover:bg-gray-100 text-gray-400'
                    }`}
                  >
                    <motion.div
                      animate={isListening ? {
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
                    >
                      <FiMic className="text-lg" />
                    </motion.div>
                  </motion.button>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                        setShowSuggestions(false);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
                    >
                      <FiX className="text-lg" />
                    </button>
                  )}
                </div>
                <SearchSuggestions
                  query={searchQuery}
                  isOpen={showSuggestions}
                  onSelect={handleSuggestionSelect}
                  onClose={() => setShowSuggestions(false)}
                  recentSearches={recentSearches}
                  onDeleteRecent={deleteRecentSearch}
                />
              </div>
            </form>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Found {filteredProducts.length} product(s)
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover:bg-white/80 transition-colors"
              >
                <FiFilter className="text-gray-600 text-lg" />
                <span className="font-semibold text-gray-700 text-sm">Filters</span>
              </button>
            </div>
          </div>

          {/* Products List */}
          <div className="px-4 py-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <FiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="gradient-green text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {displayedItems.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div ref={loadMoreRef} className="mt-6 flex flex-col items-center gap-4">
                    {isLoading && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
                        />
                        <span className="text-sm">Loading more products...</span>
                      </div>
                    )}
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-6 py-3 gradient-green text-white rounded-xl font-semibold hover:shadow-glow-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Loading...
                        </span>
                      ) : 'Load More'}
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

export default MobileSearch;

