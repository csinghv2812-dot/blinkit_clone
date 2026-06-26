import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Package,
  Calendar,
} from 'lucide-react'
import { apiRequest } from '../lib/api'

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [liveOrders, setLiveOrders] = useState([])
  const [error, setError] = useState('')

  const formatCurrency = (value) => `Rs. ${Number(value || 0).toLocaleString('en-IN')}`

  const formatOrder = (order) => {
    const product = order.Product || {}
    const customer = order.Customer || {}
    const payment = order.Payment || {}
    const createdAt = order.createdAt ? new Date(order.createdAt) : null
    const quantity = Number(order.quantity || 0)
    const amount = Number(payment.amount || product.price * quantity || 0)

    return {
      id: order.id,
      orderNumber: `ORD-${String(order.id).padStart(3, '0')}`,
      customer: customer.name || 'Unknown customer',
      email: customer.email || 'No email',
      items: quantity,
      amount: formatCurrency(amount),
      status: payment.paymentStatus === 'success' ? 'delivered' : 'pending',
      payment: payment.paymentStatus || 'pending',
      date: createdAt ? createdAt.toISOString().slice(0, 10) : '-',
      time: createdAt ? createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiRequest('/orders')
        setLiveOrders(data.map(formatOrder))
        setError('')
      } catch (err) {
        setError(err.message)
      }
    }

    fetchOrders()
  }, [])

  const orders = [
    {
      id: 'ORD-001',
      customer: 'Rahul Sharma',
      email: 'rahul@email.com',
      items: 5,
      amount: '₹1,250',
      status: 'delivered',
      payment: 'paid',
      date: '2024-01-15',
      time: '10:30 AM',
      address: '123, Sector 15, Gurgaon',
    },
    {
      id: 'ORD-002',
      customer: 'Priya Singh',
      email: 'priya@email.com',
      items: 3,
      amount: '₹890',
      status: 'processing',
      payment: 'paid',
      date: '2024-01-15',
      time: '09:45 AM',
      address: '45, DLF Phase 3, Gurgaon',
    },
    {
      id: 'ORD-003',
      customer: 'Amit Kumar',
      email: 'amit@email.com',
      items: 8,
      amount: '₹2,340',
      status: 'shipped',
      payment: 'paid',
      date: '2024-01-14',
      time: '06:20 PM',
      address: '78, Sohna Road, Gurgaon',
    },
    {
      id: 'ORD-004',
      customer: 'Neha Gupta',
      email: 'neha@email.com',
      items: 2,
      amount: '₹567',
      status: 'pending',
      payment: 'pending',
      date: '2024-01-14',
      time: '03:15 PM',
      address: '90, Golf Course Road, Gurgaon',
    },
    {
      id: 'ORD-005',
      customer: 'Vikram Patel',
      email: 'vikram@email.com',
      items: 6,
      amount: '₹1,890',
      status: 'delivered',
      payment: 'paid',
      date: '2024-01-13',
      time: '11:50 AM',
      address: '12, MG Road, Gurgaon',
    },
    {
      id: 'ORD-006',
      customer: 'Sneha Reddy',
      email: 'sneha@email.com',
      items: 4,
      amount: '₹1,120',
      status: 'cancelled',
      payment: 'refunded',
      date: '2024-01-13',
      time: '02:30 PM',
      address: '34, Cyber Hub, Gurgaon',
    },
    {
      id: 'ORD-007',
      customer: 'Arjun Nair',
      email: 'arjun@email.com',
      items: 7,
      amount: '₹3,450',
      status: 'shipped',
      payment: 'paid',
      date: '2024-01-12',
      time: '04:10 PM',
      address: '56, Udyog Vihar, Gurgaon',
    },
    {
      id: 'ORD-008',
      customer: 'Pooja Mehta',
      email: 'pooja@email.com',
      items: 1,
      amount: '₹299',
      status: 'processing',
      payment: 'paid',
      date: '2024-01-12',
      time: '09:00 AM',
      address: '78, Palam Vihar, Gurgaon',
    },
  ]

  const displayedOrders = liveOrders.length > 0 ? liveOrders : orders

  const getStatusBadge = (status) => {
    const statusMap = {
      delivered: { class: 'success', label: 'Delivered' },
      processing: { class: 'info', label: 'Processing' },
      shipped: { class: 'warning', label: 'Shipped' },
      pending: { class: 'error', label: 'Pending' },
      cancelled: { class: 'error', label: 'Cancelled' },
    }
    return statusMap[status] || { class: 'info', label: status }
  }

  const getStatusIcon = (status) => {
    const iconMap = {
      delivered: CheckCircle,
      processing: Clock,
      shipped: Truck,
      pending: Clock,
      cancelled: XCircle,
    }
    return iconMap[status] || Package
  }

  const filteredOrders = displayedOrders.filter((order) => {
    const matchesSearch =
      String(order.orderNumber || order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    { label: 'Total Orders', value: displayedOrders.length, icon: Package, color: 'var(--primary)' },
    { label: 'Pending', value: displayedOrders.filter((o) => o.status === 'pending').length, icon: Clock, color: 'var(--error)' },
    { label: 'Processing', value: displayedOrders.filter((o) => o.status === 'processing').length, icon: Clock, color: 'var(--primary)' },
    { label: 'Shipped', value: displayedOrders.filter((o) => o.status === 'shipped').length, icon: Truck, color: 'var(--warning)' },
  ]

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">Orders</h1>
            <p className="page-subtitle">Manage and track all customer orders</p>
            {error && <p style={{ color: 'var(--error)', marginTop: '8px' }}>{error}</p>}
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export Orders
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '8px' }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'var(--bg-secondary)',
              padding: '16px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '160px',
              border: '1px solid var(--border)',
            }}
          >
            <stat.icon size={24} style={{ color: stat.color }} />
            <div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px' }}>
            <Search />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '10px 32px 10px 16px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="date"
              className="form-input"
              style={{ width: 'auto', padding: '10px 16px' }}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <button className="btn btn-outline">
            <Filter size={18} />
            More Filters
          </button>
        </div>

        {/* Orders Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status)
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <tr key={order.id}>
                    <td style={{ fontWeight: '600' }}>{order.orderNumber || order.id}</td>
                    <td>
                      <div>
                        <div style={{ fontWeight: '500' }}>{order.customer}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {order.email}
                        </div>
                      </div>
                    </td>
                    <td>{order.items} items</td>
                    <td style={{ fontWeight: '600' }}>{order.amount}</td>
                    <td>
                      <span className={`status-badge ${statusInfo.class}`}>
                        <StatusIcon size={14} style={{ marginRight: '4px' }} />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${order.payment === 'paid' ? 'success' : order.payment === 'pending' ? 'warning' : 'info'}`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px' }}>
                        <div>{order.date}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '12px' }}>{order.time}</div>
                      </div>
                    </td>
                    <td>
                      <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline">
                        <Eye size={14} />
                        View
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Showing {filteredOrders.length} of {displayedOrders.length} orders
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-sm btn-outline" disabled>
              Previous
            </button>
            <button
              className="btn btn-sm btn-primary"
              style={{ padding: '6px 12px', minWidth: '32px' }}
            >
              1
            </button>
            <button className="btn btn-sm btn-outline" style={{ padding: '6px 12px', minWidth: '32px' }}>
              2
            </button>
            <button className="btn btn-sm btn-outline">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
