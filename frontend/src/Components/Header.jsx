import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/blinkit1.png";
import useCart from "../hooks/useCart";
import {
  MapPin,
  ChevronDown,
  Search,
  ShoppingCart,
  User,
  Zap,
} from "lucide-react";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("My Location");

  const cartCount = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = Object.values(cart).reduce(
    (total, item) => total + item.amount * item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("blinkit_customer");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
      const getLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state_district ||
          data.address.state;

        setLocation(city || "Unknown Location");
      } catch (err) {
        console.log(err);
        setLocation("Location not found");
      }
    },
    () => {
      alert("Please allow location access.");
    }
  );
};

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={logo}
            alt="Blinkit"
            className="h-12 w-auto"
          />
        </Link>

        {/* Delivery Time */}
        <div className="hidden md:flex items-center gap-1 bg-[#f8d000]/20 border border-[#f8d000] rounded-lg px-3 py-1.5 shrink-0">
          <Zap className="w-4 h-4 text-[#0c831f] fill-[#0c831f]" />
          <div>
            <p className="text-xs font-bold text-[#0c831f] leading-none">
              Delivery in
            </p>
            <p className="text-sm font-extrabold text-gray-900 leading-none">
              10 minutes
            </p>
          </div>
        </div>

        {/* Location */}
        <button
          onClick={getLocation}
          className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors shrink-0 min-w-[150px]"
        >
          <MapPin className="w-4 h-4 text-[#0c831f]" />

          <div className="text-left min-w-0">
            <p className="text-xs text-gray-500 leading-none">
              Delivering to
            </p>

            <div className="flex items-center gap-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {location}
              </p>
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 w-full min-w-[220px] sm:max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search "vegetables"'
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c831f] focus:bg-white transition-all"
            />
          </div>
        </form>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shrink-0 whitespace-nowrap"
          >
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              Logout
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shrink-0 whitespace-nowrap"
          >
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              Login
            </span>
          </Link>
        )}

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-[#0c831f] hover:bg-[#0a6b18] text-white px-4 py-2 rounded-xl transition-colors shrink-0 relative"
        >
          <ShoppingCart className="w-4 h-4" />

          <span className="text-sm font-semibold hidden sm:block">
            {cartCount === 0
              ? "My Cart"
              : `${cartCount} item${cartCount > 1 ? "s" : ""}`}
          </span>

          {cartCount > 0 && (
            <>
              <span className="hidden sm:block text-xs text-green-200">
                |
              </span>

              <span className="hidden sm:block text-sm font-bold">
                ₹{cartTotal}
              </span>
            </>
          )}

          {cartCount > 0 && (
            <span className="sm:hidden absolute -top-1.5 -right-1.5 bg-[#f8d000] text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}