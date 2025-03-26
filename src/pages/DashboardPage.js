import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import UsersTable from '../components/Dashboard/Tabels/UsersTable';
import ProductsTable from '../components/Dashboard/Tabels/ProductsTable';
import OrdersTable from '../components/Dashboard/Tabels/OrdersTable';
import AnalyticsTable from '../components/Dashboard/Tabels/AnalyticsTable';

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-3">
          <Routes>
            <Route path="users" element={<UsersTable />} />
            <Route path="products" element={<ProductsTable />} />
            <Route path="orders" element={<OrdersTable />} />
            <Route path="analytics" element={<AnalyticsTable />} />
            <Route path="*" element={<UsersTable />} /> {/* Default table */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;