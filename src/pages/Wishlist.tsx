import React from 'react';
import { ShoppingBag, ChevronRight, Heart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="pt-48 pb-24 px-6 text-center max-w-7xl mx-auto">
        <Heart size={48} className="mx-auto mb-8 text-muted-foreground/30" />
        <h1 className="text-4xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-12">Save your favorite pieces here to easily find them later.</p>
        <Link to="/shop" className="px-10 py-4 bg-secondary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Wishlist ({wishlist.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {wishlistedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group border border-muted bg-white p-4 relative"
            >
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500 rounded-full transition-colors shadow-sm"
              >
                <Trash2 size={16} />
              </button>

              <Link to={`/product/${product.id}`} className="aspect-[3/4] overflow-hidden bg-muted block mb-6">
                <img 
                  src={product.variants[0].images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </Link>
              
              <div className="space-y-2">
                <Link to={`/product/${product.id}`} className="text-sm font-bold block hover:text-primary">{product.name}</Link>
                <p className="text-lg font-mono font-bold">${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(product, product.variants[0].id, product.sizes[0])}
                  className="w-full py-3 bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
