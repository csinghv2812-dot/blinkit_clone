import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import Customers from './pages/Customers'
import CustomerDetails from './pages/CustomerDetails'
import Profile from './pages/Profile'
import './App.css'
import AllProducts from './pages/AllProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="all-products" element={<AllProducts />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
