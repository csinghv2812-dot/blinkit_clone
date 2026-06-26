import { Zap } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      {/* Top band */}
      <div className="bg-[#0c831f] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white font-medium">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-[#f8d000] text-[#f8d000]" />
            10 Minute Delivery
          </span>
          <span>|</span>
          <span>Best Prices Guaranteed</span>
          <span>|</span>
          <span>Wide Assortment</span>
          <span>|</span>
          <span>No Minimum Order</span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-1.5 mb-4">
            <div className="bg-[#0c831f] rounded-lg p-1.5">
              <Zap className="w-5 h-5 text-[#f8d000] fill-[#f8d000]" />
            </div>
            <span className="text-xl font-extrabold text-white">blinkit</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Grocery delivery in 10 minutes. Fresh produce, daily essentials and more delivered to your door.
          </p>
          <div className="flex gap-3">
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0c831f] transition-colors"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Careers", "Blog", "Press", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#f8d000] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Fruits & Vegetables",
              "Dairy & Breakfast",
              "Snacks & Munchies",
              "Cold Drinks",
              "Instant Food",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#f8d000] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* App Download */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
            Download App
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Get the blinkit app for a seamless shopping experience.
          </p>
          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors"
            >
              <span className="text-2xl">🍎</span>
              <div>
                <p className="text-xs text-gray-400">Download on the</p>
                <p className="text-sm font-semibold text-white">App Store</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors"
            >
              <span className="text-2xl">▶️</span>
              <div>
                <p className="text-xs text-gray-400">Get it on</p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© 2024 Blinkit (Grofers India Pvt Ltd). All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
