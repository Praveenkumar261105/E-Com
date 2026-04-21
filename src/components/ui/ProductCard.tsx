import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { toggleWishlist, wishlist, addToCart } = useShop();
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants[activeVariantIndex];
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first size for quick add
    addToCart(product, activeVariant.id, product.sizes[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
        {/* badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">New</span>
          )}
          {product.originalPrice && (
            <span className="bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Sale</span>
          )}
        </div>

        {/* wishlist toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300",
            isWishlisted ? "bg-primary text-white" : "bg-white/80 text-secondary hover:bg-white"
          )}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* images */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeVariant.id}
            src={activeVariant.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] py-3 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </Link>

      <div className="p-6 bg-white border border-gray-100 group-hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`} className="text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors block leading-tight">
            {product.name}
          </Link>
          <span className="text-xs font-semibold text-primary">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">{activeVariant.colorName}</p>
        
        <div className="flex gap-2 items-center">
          <button 
            onClick={handleQuickAdd}
            className="flex-1 py-3 bg-secondary text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
          >
            Add to Bag
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={cn(
              "p-3 border border-gray-100 transition-colors",
              isWishlisted ? "text-primary bg-primary/5 border-primary/20" : "text-gray-400 hover:text-primary"
            )}
          >
            <Heart size={12} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* color variants dots - integrated into info section */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
          {product.variants.map((v, i) => (
            <button
              key={v.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveVariantIndex(i);
              }}
              style={{ backgroundColor: v.color }}
              className={cn(
                "w-3 h-3 rounded-full border border-black/5 transition-all ring-offset-2",
                activeVariantIndex === i ? "ring-1 ring-primary scale-110" : "hover:scale-110"
              )}
              title={v.colorName}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
