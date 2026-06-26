import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLockOutline, MdPayment } from 'react-icons/md';
import useCart from '../hooks/useCart';
import { apiRequest } from '../lib/api';



export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const total = Object.values(cart).reduce((sum, item) => sum + item.amount * item.quantity, 0) + 25;

  const handlePayment = async (event) => {
    event.preventDefault();
    const customer = JSON.parse(localStorage.getItem('blinkit_customer') || 'null');
    const cartItems = Object.values(cart);

    if (!customer?.id) {
      toast.error('Please login before payment');
      navigate('/login');
      return;
    }

    try {
      // 1) create orders in backend (preserve existing DB flow)
      const createdOrders = await Promise.all(
        cartItems.map(async (item) => {
          const order = await apiRequest('/orders/register', {
            method: 'POST',
            body: JSON.stringify({
              customerId: customer.id,
              productId: item.id,
              quantity: item.quantity,
            }),
          });

          return { id: order.id, amount: Number(item.amount) * item.quantity };
        })
      );

      // 2) ask backend to create a Razorpay order for the total amount
      const razorResponse = await apiRequest('/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount: total }),
      });

      const { order: razorpayOrder, key_id } = razorResponse;

      // 3) load Razorpay script
      const loadScript = (src) =>
        new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!loaded) {
        toast.error('Could not load Razorpay SDK.');
        return;
      }

      const options = {
        key: key_id,
        amount: razorpayOrder.amount, // in paise
        currency: 'INR',
        name: 'Blinkit',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // verify signature with backend
            const verify = await apiRequest('/payments/verify', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verify.success) {
              toast.error('Payment verification failed');
              return;
            }

            // Register payments in backend for each order
            await Promise.all(
              createdOrders.map(async (o) => {
                await apiRequest('/payments/register', {
                  method: 'POST',
                  body: JSON.stringify({
                    orderId: o.id,
                    amount: o.amount,
                    paymentMethod: 'razorpay',
                    paymentStatus: 'success',
                    transactionId: response.razorpay_payment_id,
                  }),
                });
              })
            );

            clearCart();
            toast.success('Payment successful!');
            navigate('/order-success', { replace: true });
          } catch (err) {
            toast.error(err.message || 'Payment post-processing failed');
          }
        },
        prefill: {
          name: customer.name || customer.email,
          email: customer.email,
        },
        theme: { color: '#16a34a' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message || 'Payment failed');
    }
  };

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <MdLockOutline className="text-xl text-green-600" />
          <h1 className="text-2xl font-bold text-gray-950">Secure Payment</h1>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handlePayment}>
          <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
            Payable amount: Rs. {total}
          </div>
          <input className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="Card number" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="MM / YY" />
            <input className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="CVV" />
          </div>
          <button className="mt-2 flex items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700" type="submit">
            <MdPayment /> Pay now
          </button>
        </form>
      </div>
    </section>
  );
}
