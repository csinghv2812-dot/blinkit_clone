import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: '₹12,45,890',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      type: 'primary',
    },
    {
      label: 'Total Orders',
      value: '2,456',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      type: 'secondary',
    },
    {
      label: 'Total Products',
      value: '1,234',
      change: '+3.1%',
      trend: 'up',
      icon: Package,
      type: 'accent',
    },
    {
      label: 'Total Customers',
      value: '5,678',
      change: '-2.4%',
      trend: 'down',
      icon: Users,
      type: 'success',
    },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'Rahul Sharma', amount: '₹1,250', status: 'delivered', time: '2 mins ago' },
    { id: 'ORD-002', customer: 'Priya Singh', amount: '₹890', status: 'processing', time: '15 mins ago' },
    { id: 'ORD-003', customer: 'Amit Kumar', amount: '₹2,340', status: 'shipped', time: '32 mins ago' },
    { id: 'ORD-004', customer: 'Neha Gupta', amount: '₹567', status: 'pending', time: '1 hour ago' },
    { id: 'ORD-005', customer: 'Vikram Patel', amount: '₹1,890', status: 'delivered', time: '2 hours ago' },
  ]

  const topProducts = [
    { name: 'Organic Milk', category: 'Dairy', price: '₹55', stock: 150 },
    { name: 'Fresh Bread', category: 'Bakery', price: '₹40', stock: 200 },
    { name: 'Banana (1kg)', category: 'Fruits', price: '₹45', stock: 300 },
    { name: 'Tomatoes (500g)', category: 'Vegetables', price: '₹30', stock: 250 },
    { name: 'Basmati Rice', category: 'Grocery', price: '₹120', stock: 180 },
  ]

  const getStatusBadge = (status) => {
    const statusMap = {
      delivered: 'success',
      processing: 'info',
      shipped: 'warning',
      pending: 'error',
    }
    return statusMap[status] || 'info'
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.type}`}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: '32px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Sales Overview</h3>
            <select className="form-select" style={{ width: 'auto', padding: '8px 12px' }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="chart-placeholder">
            Sales Chart Visualization
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Order Status</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--success)' }}><CheckCircle size={24} /></div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>156</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Delivered</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--warning)' }}><Truck size={24} /></div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>43</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Shipped</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--primary)' }}><Clock size={24} /></div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>28</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Processing</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <div style={{ color: 'var(--error)' }}><XCircle size={24} /></div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>12</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Cancelled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Orders</h3>
            <Link to="/orders" className="btn btn-sm btn-outline">
              View All
            </Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: '500' }}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top Products</h3>
            <Link to="/add-product" className="btn btn-sm btn-outline">
              Add Product
            </Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: '500' }}>{product.name}</td>
                    <td>{product.category}</td>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{product.price}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
