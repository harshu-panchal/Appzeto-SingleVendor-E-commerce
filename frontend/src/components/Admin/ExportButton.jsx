import { FiDownload } from 'react-icons/fi';
import { generateCSV } from '../../utils/adminHelpers';

const ExportButton = ({ data, headers, filename, className = '' }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }
    generateCSV(data, headers, filename);
  };

  return (
    <button
      onClick={handleExport}
      className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold ${className}`}
    >
      <FiDownload />
      Export CSV
    </button>
  );
};

export default ExportButton;

