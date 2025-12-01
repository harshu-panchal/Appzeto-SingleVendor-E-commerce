const Badge = ({ children, variant = 'flash', className = '' }) => {
  const variants = {
    flash: 'bg-blue-700 text-white',
    discount: 'bg-yellow-400 text-black',
    sale: 'bg-white text-black',
    warning: 'bg-orange-500 text-white',
    error: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    pending: 'bg-yellow-500 text-white',
    processing: 'bg-blue-500 text-white',
    shipped: 'bg-purple-500 text-white',
    delivered: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
  };

  return (
    <div
      className={`px-3 py-1 rounded-md text-xs font-bold ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;

