import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "../../components/Layout/Mobile/MobileLayout";
import { categories } from "../../data/categories";
import PageTransition from "../../components/PageTransition";
import LazyImage from "../../components/LazyImage";

const MobileCategories = () => {
  return (
    <PageTransition>
      <MobileLayout showBottomNav={true} showCartBar={true}>
        <div className="w-full pb-24">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Browse Categories
            </h1>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <Link
                    to={`/app/category/${category.id}`}
                    className="block glass-card rounded-2xl p-4 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <LazyImage
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80x80?text=Category";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">View products</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </MobileLayout>
    </PageTransition>
  );
};

export default MobileCategories;
