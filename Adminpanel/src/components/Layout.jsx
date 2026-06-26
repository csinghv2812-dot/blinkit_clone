import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  ShoppingCart,
  Users,
  User,
  LogOut,
  Search,
  Bell,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully')
    }
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">B</div>
          <h1 className="sidebar-title">Blinkit</h1>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>

            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard />
              Dashboard
            </NavLink>

            <NavLink
              to="/add-product"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <PackagePlus />
              Add Product
            </NavLink>

            <NavLink
              to="/all-products"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Package />
              All Products
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <ShoppingCart />
              Orders
            </NavLink>

            <NavLink
              to="/customers"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Users />
              Customers
            </NavLink>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>

            <NavLink
              to="/profile"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <User />
              Profile
            </NavLink>

            <button className="nav-link logout-link" onClick={handleLogout}>
              <LogOut />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="search-box">
              <Search />
              <input
                type="text"
                placeholder="Search orders, products, customers..."
              />
            </div>
          </div>

          <div className="header-right">
            <button className="header-icon-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            <button className="header-icon-btn">
              <Settings size={20} />
            </button>

            <div
              className="user-profile"
              onClick={() => navigate('/profile')}
            >
              <div className="user-avatar">A</div>

              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout