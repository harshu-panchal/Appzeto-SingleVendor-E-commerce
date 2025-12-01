const ProductCardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>

      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        
        {/* Unit Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded-xl mt-auto"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

