import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { cn } from '../../lib/utils';

const CATEGORIES = [
  { name: 'Men', path: '/category/men' },
  { name: 'Women', path: '/category/women' },
  { name: 'Kids', path: '/category/kids' },
  { name: 'Footwear', path: '/category/footwear' },
  { name: 'Accessories', path: '/category/accessories' },
  { name: 'Shop All', path: '/shop' }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, wishlist } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
      setIsSearchOpen(false);
      setSearchValue('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "sticky top-0 left-0 w-full z-50 h-20 px-6 sm:px-12 flex items-center justify-between border-b border-gray-100 bg-white"
    )}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-secondary"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary flex items-center font-serif">
            VESTRA.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.name}
                to={cat.path} 
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors pb-1",
                  location.pathname === cat.path ? "text-primary border-b border-primary" : "text-gray-500 hover:text-primary"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button 
            className="hidden sm:flex items-center gap-2 border-b border-gray-200 pb-1 px-1 group"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={14} className="text-gray-400" />
            <span className="text-[10px] tracking-widest text-gray-400 group-hover:text-primary transition-colors">SEARCH</span>
          </button>

          <div className="flex items-center gap-5">
            <Link to="/wishlist" className="relative group">
              <Heart size={20} className="text-gray-700 stroke-[1.5px] group-hover:text-primary transition-colors" fill={wishlist.length > 0 ? "currentColor" : "none"} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingBag size={20} className="text-gray-700 stroke-[1.5px] group-hover:text-primary transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            <Link to="/profile" className="group">
              <User size={20} className="text-gray-700 stroke-[1.5px] group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-[70] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold font-serif">VESTRA</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col space-y-6">
                {CATEGORIES.map((cat) => (
                  <Link 
                    key={cat.name} 
                    to={cat.path} 
                    className="text-lg font-medium hover:text-primary transition-colors border-b border-muted pb-2"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link to="/profile" className="text-lg font-medium pt-4">My Account</Link>
                <Link to="/offers" className="text-lg font-medium text-primary">Special Offers</Link>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Support & More</p>
                <div className="flex flex-col space-y-2">
                  <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary">Shipping Info</Link>
                  <Link to="/returns" className="text-sm text-muted-foreground hover:text-primary">Returns & Exchanges</Link>
                  <Link to="/care" className="text-sm text-muted-foreground hover:text-primary">Product Care</Link>
                  <Link to="/track-order" className="text-sm text-muted-foreground hover:text-primary">Track Your Order</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[100] p-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Search Vestra</span>
                <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X size={24} />
                </button>
              </div>
              <form className="relative" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full text-4xl font-serif bg-transparent border-b-2 border-primary py-4 outline-none placeholder:text-muted/50"
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-4">
                  <Search size={32} />
                </button>
              </form>
              <div className="mt-12">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Trending Searches</p>
                <div className="flex flex-wrap gap-3">
                  {['Silk Gowns', 'Linen Shirts', 'Leather Boots', 'Summer Collection'].map(term => (
                    <button key={term} className="px-4 py-2 border border-muted hover:border-primary transition-colors text-sm rounded-full">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
