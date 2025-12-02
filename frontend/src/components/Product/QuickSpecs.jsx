import { FiPackage, FiRuler, FiBox } from 'react-icons/fi';

const QuickSpecs = ({ specs }) => {
  if (!specs || specs.length === 0) return null;

  const iconMap = {
    package: FiPackage,
    ruler: FiRuler,
    box: FiBox,
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {specs.map((spec, index) => {
        const Icon = iconMap[spec.icon] || FiPackage;
        return (
          <div
            key={index}
            className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full"
          >
            <Icon className="text-[10px]" />
            <span className="font-medium">{spec.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default QuickSpecs;

