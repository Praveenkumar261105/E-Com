import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white text-secondary pt-24 pb-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold font-serif tracking-tighter text-primary">VESTRA.</Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Curating high-end fashion with a minimal soul. Designed for the bold, the elegant, and the modern.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-primary transition-colors text-[10px] font-bold tracking-[0.2em]">IG</button>
              <button className="text-gray-400 hover:text-primary transition-colors text-[10px] font-bold tracking-[0.2em]">FB</button>
              <button className="text-gray-400 hover:text-primary transition-colors text-[10px] font-bold tracking-[0.2em]">TW</button>
              <button className="text-gray-400 hover:text-primary transition-colors text-[10px] font-bold tracking-[0.2em]">YT</button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-400">Collections</h4>
            <ul className="space-y-4">
              <li><Link to="/category/men" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Men's Fashion</Link></li>
              <li><Link to="/category/women" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Women's Lookbook</Link></li>
              <li><Link to="/category/kids" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Kidswear</Link></li>
              <li><Link to="/shop" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-400">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/care" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Product Care</Link></li>
              <li><Link to="/track-order" className="text-[11px] text-gray-500 hover:text-primary uppercase tracking-widest transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-gray-400">Stay in the Loop</h4>
            <p className="text-gray-400 text-xs leading-relaxed">Join our newsletter for early access to collections and exclusive invites.</p>
            <form 
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Welcome to Vestra! You have successfully subscribed.');
              }}
            >
              <input 
                type="email" 
                required
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-gray-200 py-3 text-[10px] outline-none focus:border-primary transition-colors tracking-widest"
              />
              <button type="submit" className="absolute right-0 bottom-3 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          <p>© 2024 VESTRA FASHION LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 items-center">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
