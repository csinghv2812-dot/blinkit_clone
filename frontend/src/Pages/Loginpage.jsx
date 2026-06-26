import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { apiRequest } from '../lib/api';

export default function Loginpage( { setIsLoggedIn } ) {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.from?.pathname || '/';
    const [authMode, setAuthMode] = useState('login');
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const data = await apiRequest('/customers/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          });
          localStorage.setItem('blinkit_customer', JSON.stringify(data.customer));
          setIsLoggedIn(true);
          toast.success("Login successful!");
          navigate(redirectPath, { replace: true });
        } catch (error) {
          toast.error(error.message || 'Login failed');
        }
      }

    const handleRegister = async (e) => {
      e.preventDefault();

      try {
        const payload = {
          name: registerForm.name.trim(),
          email: registerForm.email.trim(),
          password: registerForm.password,
          phone: registerForm.phone ? Number(registerForm.phone) : null,
          address: registerForm.address.trim() || null,
        };

        const customer = await apiRequest('/customers/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        localStorage.setItem('blinkit_customer', JSON.stringify(customer));
        setIsLoggedIn(true);
        toast.success('Account created successfully!');
        navigate(redirectPath, { replace: true });
      } catch (error) {
        toast.error(error.message || 'Registration failed');
      }
    }

    const updateRegisterForm = (field, value) => {
      setRegisterForm((prev) => ({ ...prev, [field]: value }));
    }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 grid grid-cols-2 rounded-md border border-gray-200 bg-gray-50 p-1">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              authMode === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              authMode === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Register
          </button>
        </div>

        {authMode === 'login' ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />

            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Login
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              New customer?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="font-semibold text-green-700 hover:text-green-800"
              >
                Create an account
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full name"
              value={registerForm.name}
              onChange={(event) => updateRegisterForm('name', event.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(event) => updateRegisterForm('email', event.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(event) => updateRegisterForm('password', event.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
              minLength={4}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={registerForm.phone}
              onChange={(event) => updateRegisterForm('phone', event.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <textarea
              placeholder="Address"
              value={registerForm.address}
              onChange={(event) => updateRegisterForm('address', event.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              rows="3"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Register
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-semibold text-green-700 hover:text-green-800"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
