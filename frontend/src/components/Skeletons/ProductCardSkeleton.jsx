const ProductCardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-300 rounded mb-2 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
        
        {/* Unit Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 bg-gray-300 rounded w-20 relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded-xl mt-auto relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

