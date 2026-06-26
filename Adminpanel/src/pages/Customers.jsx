import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Download, Eye, Mail, Phone, MapPin, Users, UserCheck, UserPlus, UserX } from 'lucide-react'
import { apiRequest } from '../lib/api'

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [liveCustomers, setLiveCustomers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await apiRequest('/customers')
        setLiveCustomers(data.map((customer) => ({
          id: customer.id,
          customerNumber: `CUST-${String(customer.id).padStart(3, '0')}`,
          name: customer.name,
          email: customer.email,
          phone: customer.phone || 'No phone',
          location: customer.address || 'No address',
          orders: 0,
          spent: 'Rs. 0',
          status: 'active',
          joined: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-',
          avatar: (customer.name || 'C').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
        })))
        setError('')
      } catch (err) {
        setError(err.message)
      }
    }

    fetchCustomers()
  }, [])

  const customers = [
    {
      id: 'CUST-001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'Gurgaon, Haryana',
      orders: 15,
      spent: '₹12,450',
      status: 'active',
      joined: 'Jan 15, 2023',
      avatar: 'RS',
    },
    {
      id: 'CUST-002',
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      phone: '+91 87654 32109',
      location: 'Delhi',
      orders: 8,
      spent: '₹6,890',
      status: 'active',
      joined: 'Feb 20, 2023',
      avatar: 'PS',
    },
    {
      id: 'CUST-003',
      name: 'Amit Kumar',
      email: 'amit.kumar@email.com',
      phone: '+91 76543 21098',
      location: 'Noida, UP',
      orders: 22,
      spent: '₹18,340',
      status: 'active',
      joined: 'Dec 10, 2022',
      avatar: 'AK',
    },
    {
      id: 'CUST-004',
      name: 'Neha Gupta',
      email: 'neha.gupta@email.com',
      phone: '+91 65432 10987',
      location: 'Gurgaon, Haryana',
      orders: 3,
      spent: '₹2,100',
      status: 'inactive',
      joined: 'Mar 5, 2023',
      avatar: 'NG',
    },
    {
      id: 'CUST-005',
      name: 'Vikram Patel',
      email: 'vikram.patel@email.com',
      phone: '+91 54321 09876',
      location: 'Faridabad, Haryana',
      orders: 11,
      spent: '₹9,780',
      status: 'active',
      joined: 'Jan 28, 2023',
      avatar: 'VP',
    },
    {
      id: 'CUST-006',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 43210 98765',
      location: 'Bangalore',
      orders: 0,
      spent: '₹0',
      status: 'inactive',
      joined: 'Apr 12, 2023',
      avatar: 'SR',
    },
    {
      id: 'CUST-007',
      name: 'Arjun Nair',
      email: 'arjun.nair@email.com',
      phone: '+91 32109 87654',
      location: 'Mumbai',
      orders: 19,
      spent: '₹15,600',
      status: 'active',
      joined: 'Nov 20, 2022',
      avatar: 'AN',
    },
    {
      id: 'CUST-008',
      name: 'Pooja Mehta',
      email: 'pooja.mehta@email.com',
      phone: '+91 21098 76543',
      location: 'Ahmedabad',
      orders: 6,
      spent: '₹4,320',
      status: 'active',
      joined: 'Feb 14, 2023',
      avatar: 'PM',
    },
  ]

  const displayedCustomers = liveCustomers.length > 0 ? liveCustomers : customers

  const stats = [
    { label: 'Total Customers', value: displayedCustomers.length, icon: Users, color: 'var(--primary)' },
    { label: 'Active', value: displayedCustomers.filter((c) => c.status === 'active').length, icon: UserCheck, color: 'var(--success)' },
    { label: 'New This Month', value: liveCustomers.length, icon: UserPlus, color: 'var(--secondary)' },
    { label: 'Inactive', value: displayedCustomers.filter((c) => c.status === 'inactive').length, icon: UserX, color: 'var(--error)' },
  ]

  const filteredCustomers = displayedCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(customer.customerNumber || customer.id).toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">Customers</h1>
            <p className="page-subtitle">Manage your customer base and view their details</p>
            {error && <p style={{ color: 'var(--error)', marginTop: '8px' }}>{error}</p>}
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
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

      <div className="card">
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px' }}>
            <Search />
            <input
              type="text"
              placeholder="Search customers..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn btn-outline">
            <Filter size={18} />
            More Filters
          </button>
        </div>

        {/* Customers Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="avatar">{customer.avatar}</div>
                      <div>
                        <div style={{ fontWeight: '500' }}>{customer.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {customer.customerNumber || customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <Mail size={14} style={{ color: 'var(--text-light)' }} />
                        {customer.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <Phone size={14} style={{ color: 'var(--text-light)' }} />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <MapPin size={14} style={{ color: 'var(--text-light)' }} />
                      {customer.location}
                    </div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{customer.orders}</td>
                  <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{customer.spent}</td>
                  <td>
                    <span className={`status-badge ${customer.status === 'active' ? 'success' : 'warning'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{customer.joined}</td>
                  <td>
                    <Link to={`/customers/${customer.id}`} className="btn btn-sm btn-outline">
                      <Eye size={14} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
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
            Showing {filteredCustomers.length} of {displayedCustomers.length} customers
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
            <button className="btn btn-sm btn-outline" style={{ padding: '6px 12px', minWidth: '32px' }}>
              3
            </button>
            <button className="btn btn-sm btn-outline">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customers
