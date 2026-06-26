import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  CreditCard,
  Printer,
  MessageSquare,
} from 'lucide-react'
import { apiRequest } from '../lib/api'

const OrderDetails = () => {
  const { id } = useParams()
  const [liveOrder, setLiveOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await apiRequest(`/orders/${id}`)
        const product = data.Product || {}
        const customer = data.Customer || {}
        const payment = data.Payment || {}
        const quantity = Number(data.quantity || 0)
        const price = Number(product.price || 0)
        const subtotal = price * quantity
        const createdAt = data.createdAt ? new Date(data.createdAt) : null

        setLiveOrder({
          id: `ORD-${String(data.id).padStart(3, '0')}`,
          customer: {
            name: customer.name || 'Unknown customer',
            email: customer.email || 'No email',
            phone: customer.phone || 'No phone',
          },
          status: payment.paymentStatus === 'success' ? 'delivered' : 'pending',
          payment: {
            method: payment.paymentMethod || 'Not recorded',
            status: payment.paymentStatus || 'pending',
            transactionId: payment.transactionId || 'N/A',
          },
          address: {
            street: customer.address || 'No address saved',
            city: '',
            state: '',
            pincode: '',
          },
          items: [
            {
              id: product.id || data.productId,
              name: product.name || 'Product',
              quantity,
              price: `Rs. ${price.toLocaleString('en-IN')}`,
              total: `Rs. ${subtotal.toLocaleString('en-IN')}`,
              image: product.image,
            },
          ],
          subtotal: `Rs. ${subtotal.toLocaleString('en-IN')}`,
          deliveryFee: 'Rs. 0',
          tax: 'Rs. 0',
          total: `Rs. ${Number(payment.amount || subtotal).toLocaleString('en-IN')}`,
          dates: {
            ordered: createdAt ? createdAt.toLocaleString() : 'Not available',
          },
          timeline: [
            { status: 'Order Placed', time: createdAt ? createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '', date: createdAt ? createdAt.toLocaleDateString() : '', completed: true },
            { status: payment.paymentStatus === 'success' ? 'Payment Completed' : 'Payment Pending', time: '', date: '', completed: payment.paymentStatus === 'success' },
          ],
        })
        setError('')
      } catch (err) {
        setError(err.message)
      }
    }

    fetchOrder()
  }, [id])

  const fallbackOrder = {
    id: id || 'ORD-001',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
    },
    status: 'delivered',
    payment: {
      method: 'Credit Card',
      status: 'Paid',
      transactionId: 'TXN987654321',
    },
    address: {
      street: '123, Tower A, Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
    },
    items: [
      { id: 1, name: 'Organic Milk (1L)', quantity: 2, price: '₹55', total: '₹110', image: null },
      { id: 2, name: 'Fresh Bread', quantity: 1, price: '₹40', total: '₹40', image: null },
      { id: 3, name: 'Banana (1kg)', quantity: 2, price: '₹45', total: '₹90', image: null },
      { id: 4, name: 'Tomatoes (500g)', quantity: 3, price: '₹30', total: '₹90', image: null },
      { id: 5, name: 'Eggs (12 pcs)', quantity: 1, price: '₹120', total: '₹120', image: null },
    ],
    subtotal: '₹450',
    deliveryFee: '₹30',
    tax: '₹45',
    total: '₹525',
    dates: {
      ordered: 'Jan 15, 2024 at 10:30 AM',
      confirmed: 'Jan 15, 2024 at 10:35 AM',
      shipped: 'Jan 15, 2024 at 02:00 PM',
      delivered: 'Jan 15, 2024 at 04:30 PM',
    },
    timeline: [
      { status: 'Order Placed', time: '10:30 AM', date: 'Jan 15', completed: true },
      { status: 'Order Confirmed', time: '10:35 AM', date: 'Jan 15', completed: true },
      { status: 'Out for Delivery', time: '04:00 PM', date: 'Jan 15', completed: true },
      { status: 'Delivered', time: '04:30 PM', date: 'Jan 15', completed: true },
    ],
  }

  const order = liveOrder || fallbackOrder

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          to="/orders"
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
          Back to Orders
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ marginBottom: '8px' }}>{order.id}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Ordered on {order.dates.ordered}
            </p>
            {error && <p style={{ color: 'var(--error)', marginTop: '8px' }}>{error}</p>}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-outline">
              <Printer size={18} />
              Print Invoice
            </button>
            <button className="btn btn-outline">
              <MessageSquare size={18} />
              Contact Customer
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Left Column */}
        <div>
          {/* Order Items */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Order Items</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--border)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-light)',
                    }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Package size={24} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Qty: {item.quantity} x {item.price}
                    </div>
                  </div>
                  <div style={{ fontWeight: '600' }}>{item.total}</div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>{order.subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery Fee</span>
                <span>{order.deliveryFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax</span>
                <span>{order.tax}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '18px',
                  fontWeight: '700',
                }}
              >
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{order.total}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Order Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {order.timeline.map((event, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: event.completed ? 'var(--success)' : 'var(--border)',
                        border: '3px solid',
                        borderColor: event.completed ? 'var(--success)' : 'var(--border)',
                      }}
                    />
                    {index < order.timeline.length - 1 && (
                      <div
                        style={{
                          width: '2px',
                          height: '40px',
                          background: event.completed ? 'var(--success)' : 'var(--border)',
                          marginTop: '4px',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ paddingTop: '0' }}>
                    <div style={{ fontWeight: '500' }}>{event.status}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {event.date} at {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Customer Info */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Customer Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="avatar avatar-lg">RS</div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>{order.customer.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Customer since Jan 2023</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                <Mail size={18} />
                <span style={{ fontSize: '14px' }}>{order.customer.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                <Phone size={18} />
                <span style={{ fontSize: '14px' }}>{order.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Shipping Address</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <MapPin size={20} style={{ color: 'var(--primary)', flexShrink: '0', marginTop: '2px' }} />
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div>{order.address.street}</div>
                <div>
                  {order.address.city}, {order.address.state}
                </div>
                <div>Pincode: {order.address.pincode}</div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Payment Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <CreditCard size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <div style={{ fontWeight: '500' }}>{order.payment.method}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Transaction ID: {order.payment.transactionId}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} style={{ color: 'var(--success)' }} />
              <span className="status-badge success">{order.payment.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
