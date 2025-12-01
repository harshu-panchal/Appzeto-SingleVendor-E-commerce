import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import StatsCards from '../../components/Admin/Analytics/StatsCards';
import RevenueChart from '../../components/Admin/Analytics/RevenueChart';
import SalesChart from '../../components/Admin/Analytics/SalesChart';
import TopProducts from '../../components/Admin/Analytics/TopProducts';
import RecentOrders from '../../components/Admin/Analytics/RecentOrders';
import TimePeriodFilter from '../../components/Admin/Analytics/TimePeriodFilter';
import ExportButton from '../../components/Admin/ExportButton';
import { generateRevenueData, mockOrders, topProducts, getAnalyticsSummary } from '../../data/adminMockData';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('month');
  
  const revenueData = useMemo(() => generateRevenueData(30), []);
  const analyticsSummary = useMemo(() => getAnalyticsSummary(), []);

  const handleExport = () => {
    const headers = [
      { label: 'Date', accessor: (row) => row.date },
      { label: 'Revenue', accessor: (row) => `$${row.revenue.toFixed(2)}` },
      { label: 'Orders', accessor: (row) => row.orders },
    ];
    // Export functionality will be handled by ExportButton component
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <TimePeriodFilter selectedPeriod={period} onPeriodChange={setPeriod} />
          <ExportButton
            data={revenueData}
            headers={[
              { label: 'Date', accessor: (row) => row.date },
              { label: 'Revenue', accessor: (row) => `$${row.revenue.toFixed(2)}` },
              { label: 'Orders', accessor: (row) => row.orders },
            ]}
            filename="revenue_report"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={analyticsSummary} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} period={period} />
        <SalesChart data={revenueData} period={period} />
      </div>

      {/* Products and Orders Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts products={topProducts} />
        <RecentOrders
          orders={mockOrders}
          onViewOrder={(order) => navigate(`/admin/orders/${order.id}`)}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
