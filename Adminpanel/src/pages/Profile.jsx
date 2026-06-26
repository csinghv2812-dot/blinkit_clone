import { useState } from 'react'
import { Camera, Save, Mail, Phone, MapPin, Calendar, Shield, Bell, Key, User } from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@blinkit.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    department: 'Operations',
    joinDate: 'January 15, 2023',
    location: 'Gurgaon, Haryana',
  })

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailReports: true,
    emailAlerts: false,
    pushOrders: true,
    pushReports: false,
    pushAlerts: true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    alert('Profile updated successfully!')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile Settings</h1>
        <p className="page-subtitle">Manage your account settings and preferences</p>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Sidebar Tabs */}
        <div style={{ width: '250px', flexShrink: '0' }}>
          <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    border: 'none',
                    background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--text-primary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                  }}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'profile' && (
            <div className="card">
              <h3 className="card-title" style={{ marginBottom: '24px' }}>Personal Information</h3>

              {/* Avatar Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ position: 'relative' }}>
                  <div className="avatar avatar-lg" style={{ width: '100px', height: '100px', fontSize: '36px' }}>
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </div>
                  <button
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      background: 'var(--primary)',
                      color: 'white',
                      border: '3px solid white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{profileData.role}</p>
                  <span className="status-badge success">Active</span>
                </div>
              </div>

              {/* Form */}
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={profileData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      value={profileData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={14} style={{ marginRight: '6px' }} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={profileData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={14} style={{ marginRight: '6px' }} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={profileData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      className="form-input"
                      value={profileData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={14} style={{ marginRight: '6px' }} />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      className="form-input"
                      value={profileData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={14} style={{ marginRight: '6px' }} />
                    Member Since
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.joinDate}
                    disabled
                    style={{ background: 'var(--bg-primary)', cursor: 'not-allowed' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h3 className="card-title" style={{ marginBottom: '24px' }}>Security Settings</h3>

              {/* Change Password */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Key size={20} style={{ color: 'var(--primary)' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Change Password</h4>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-input" placeholder="Enter current password" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-input" placeholder="Enter new password" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-input" placeholder="Confirm new password" />
                  </div>
                </div>
                <button className="btn btn-primary">Update Password</button>
              </div>

              {/* Two Factor Auth */}
              <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Shield size={20} style={{ color: 'var(--primary)' }} />
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Two-Factor Authentication</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-outline">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h3 className="card-title" style={{ marginBottom: '24px' }}>Notification Preferences</h3>

              {/* Email Notifications */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} />
                  Email Notifications
                </h4>
                {[
                  { key: 'emailOrders', label: 'New order notifications', desc: 'Receive emails for new orders' },
                  { key: 'emailReports', label: 'Daily reports', desc: 'Receive daily summary reports' },
                  { key: 'emailAlerts', label: 'Stock alerts', desc: 'Receive low stock alerts via email' },
                ].map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '500' }}>{item.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => handleNotificationChange(item.key)}
                        style={{ opacity: '0', width: '0', height: '0' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: '0',
                          left: '0',
                          right: '0',
                          bottom: '0',
                          background: notifications[item.key] ? 'var(--primary)' : 'var(--border)',
                          borderRadius: '24px',
                          transition: '0.3s',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            content: '""',
                            height: '18px',
                            width: '18px',
                            left: notifications[item.key] ? '23px' : '3px',
                            bottom: '3px',
                            background: 'white',
                            borderRadius: '50%',
                            transition: '0.3s',
                          }}
                        />
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {/* Push Notifications */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={16} />
                  Push Notifications
                </h4>
                {[
                  { key: 'pushOrders', label: 'New order alerts', desc: 'Get notified for new orders' },
                  { key: 'pushReports', label: 'Report updates', desc: 'Get notified when reports are ready' },
                  { key: 'pushAlerts', label: 'System alerts', desc: 'Get important system alerts' },
                ].map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '500' }}>{item.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => handleNotificationChange(item.key)}
                        style={{ opacity: '0', width: '0', height: '0' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: '0',
                          left: '0',
                          right: '0',
                          bottom: '0',
                          background: notifications[item.key] ? 'var(--primary)' : 'var(--border)',
                          borderRadius: '24px',
                          transition: '0.3s',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            content: '""',
                            height: '18px',
                            width: '18px',
                            left: notifications[item.key] ? '23px' : '3px',
                            bottom: '3px',
                            background: 'white',
                            borderRadius: '50%',
                            transition: '0.3s',
                          }}
                        />
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
