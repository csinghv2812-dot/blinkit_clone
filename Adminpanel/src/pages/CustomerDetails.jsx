import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Eye,
  Edit,
  MessageSquare,
  Star,
} from 'lucide-react'
import { apiRequest } from '../lib/api'

const CustomerDetails = () => {
  const { id } = useParams()
  const [liveCustomer, setLiveCustomer] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const data = await apiRequest(`/customers/${id}`)
        setLiveCustomer({
          id: `CUST-${String(data.id).padStart(3, '0')}`,
          name: data.name,
          email: data.email,
          phone: data.phone || 'No phone',
          avatar: (data.name || 'C').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
          status: 'active',
          joined: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-',
          lastOrder: 'Not available',
          totalOrders: 0,
          totalSpent: 'Rs. 0',
          avgOrderValue: 'Rs. 0',
          loyaltyPoints: 0,
          address: {
            street: data.address || 'No address saved',
            city: '',
            state: '',
            pincode: '',
          },
          recentOrders: [],
          favoriteProducts: [],
          notes: [],
        })
        setError('')
      } catch (err) {
        setError(err.message)
      }
    }

    fetchCustomer()
  }, [id])

  const fallbackCustomer = {
    id: id || 'CUST-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: 'RS',
    status: 'active',
    joined: 'January 15, 2023',
    lastOrder: 'January 10, 2024',
    totalOrders: 15,
    totalSpent: '₹12,450',
    avgOrderValue: '₹830',
    loyaltyPoints: 1245,
    address: {
      street: '123, Tower A, Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
    },
    recentOrders: [
      { id: 'ORD-001', items: 5, amount: '₹1,250', status: 'delivered', date: 'Jan 10, 2024' },
      { id: 'ORD-045', items: 3, amount: '₹890', status: 'delivered', date: 'Jan 5, 2024' },
      { id: 'ORD-089', items: 8, amount: '₹2,340', status: 'delivered', date: 'Dec 28, 2023' },
      { id: 'ORD-102', items: 2, amount: '₹567', status: 'delivered', date: 'Dec 20, 2023' },
    ],
    favoriteProducts: [
      { name: 'Organic Milk (1L)', orders: 12, lastOrdered: 'Jan 10, 2024' },
      { name: 'Fresh Bread', orders: 10, lastOrdered: 'Jan 5, 2024' },
      { name: 'Banana (1kg)', orders: 8, lastOrdered: 'Dec 28, 2023' },
    ],
    notes: [
      { date: 'Jan 12, 2024', text: 'Prefers morning delivery between 8-10 AM', author: 'Admin' },
      { date: 'Dec 15, 2023', text: 'Requested eco-friendly packaging', author: 'Support Team' },
    ],
  }

  const customer = liveCustomer || fallbackCustomer

  const stats = [
    { label: 'Total Orders', value: customer.totalOrders, icon: ShoppingBag, color: 'var(--primary)' },
    { label: 'Total Spent', value: customer.totalSpent, icon: DollarSign, color: 'var(--success)' },
    { label: 'Avg Order Value', value: customer.avgOrderValue, icon: DollarSign, color: 'var(--secondary)' },
    { label: 'Loyalty Points', value: customer.loyaltyPoints, icon: Star, color: 'var(--warning)' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          to="/customers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          <ArrowLeft size={16} />
          Back to Customers
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="avatar avatar-lg">{customer.avatar}</div>
            <div>
              <h1 className="page-title" style={{ marginBottom: '4px' }}>{customer.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`status-badge ${customer.status === 'active' ? 'success' : 'warning'}`}>
                  {customer.status}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Customer since {customer.joined}
                </span>
              </div>
              {error && <p style={{ color: 'var(--error)', marginTop: '8px' }}>{error}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-outline">
              <MessageSquare size={18} />
              Send Message
            </button>
            <button className="btn btn-primary">
              <Edit size={18} />
              Edit Details
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon primary" style={{ color: stat.color, background: `${stat.color}15` }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Left Column */}
        <div>
          {/* Contact Information */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Email</div>
                  <div style={{ fontWeight: '500' }}>{customer.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Phone</div>
                  <div style={{ fontWeight: '500' }}>{customer.phone}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={20} style={{ color: 'var(--primary)', marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Delivery Address</div>
                  <div style={{ fontWeight: '500' }}>
                    {customer.address.street}<br />
                    {customer.address.city}, {customer.address.state} - {customer.address.pincode}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Last Order</div>
                  <div style={{ fontWeight: '500' }}>{customer.lastOrder}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Products */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Favorite Products</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {customer.favoriteProducts.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No favorite products recorded.</p>
              )}
              {customer.favoriteProducts.map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Star size={18} style={{ color: 'var(--warning)' }} />
                    <div>
                      <div style={{ fontWeight: '500' }}>{product.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Ordered {product.orders} times
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Last: {product.lastOrdered}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Recent Orders */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Recent Orders</h3>
              <Link to="/orders" className="btn btn-sm btn-outline">
                View All
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {customer.recentOrders.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No recent orders found.</p>
              )}
              {customer.recentOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{order.id}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {order.items} items - {order.date}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{order.amount}</div>
                      <span className={`status-badge success`} style={{ fontSize: '11px', marginTop: '4px' }}>
                        {order.status}
                      </span>
                    </div>
                    <Link to={`/orders/${order.id}`} className="btn btn-icon btn-sm btn-outline">
                      <Eye size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Customer Notes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {customer.notes.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No notes added.</p>
              )}
              {customer.notes.map((note, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--primary)',
                  }}
                >
                  <p style={{ marginBottom: '12px', fontSize: '14px' }}>{note.text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span>{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              ))}
              <button className="btn btn-outline" style={{ width: '100%' }}>
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails
