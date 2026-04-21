import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ChevronRight, ChevronLeft, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { cn } from '../lib/utils';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  
  const product = PRODUCTS.find(p => p.id === id);
  const isWishlisted = wishlist.includes(product?.id || '');

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [error, setError] = useState<string | null>(null);

  const variant = product?.variants[activeVariantIndex];
  const relatedProducts = useMemo(() => 
    PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4)
  , [product]);

  if (!product || !variant) return <div className="pt-40 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      setTimeout(() => setError(null), 3000);
      return;
    }
    addToCart(product, variant.id, selectedSize, quantity);
    setError(null);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-12">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={10} />
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary capitalize">{product.category}</Link>
        <ChevronRight size={10} />
        <span className="text-secondary font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Image Gallery */}
        <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-2 order-2 md:order-1 flex md:flex-col gap-4">
            {variant.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={cn(
                  "aspect-[3/4] border-2 transition-all overflow-hidden",
                  activeImageIndex === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
          <div className="md:col-span-10 order-1 md:order-2 aspect-[3/4] overflow-hidden bg-muted relative group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={`${variant.id}-${activeImageIndex}`}
                src={variant.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setActiveImageIndex(prev => (prev - 1 + variant.images.length) % variant.images.length)}
                className="p-3 bg-white/80 hover:bg-white rounded-full shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setActiveImageIndex(prev => (prev + 1) % variant.images.length)}
                className="p-3 bg-white/80 hover:bg-white rounded-full shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewsCount} REVIEWS)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                 <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Color Variants */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Color: <span className="text-muted-foreground font-normal">{variant.colorName}</span></h4>
            <div className="flex gap-4">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setActiveVariantIndex(idx);
                    setActiveImageIndex(0);
                  }}
                  style={{ backgroundColor: v.color }}
                  className={cn(
                    "w-10 h-10 rounded-full border border-black/10 transition-all ring-offset-2",
                    activeVariantIndex === idx ? "ring-2 ring-primary scale-110" : "hover:scale-110"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest">Select Size</h4>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-primary">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "py-4 border text-xs font-bold uppercase tracking-widest transition-all",
                    selectedSize === size ? "bg-primary text-white border-primary" : "bg-white border-muted hover:border-primary"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and CTA */}
          <div className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs font-bold uppercase tracking-widest"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-muted bg-white shrink-0">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-4 hover:bg-muted transition-colors">
                    <ChevronLeft size={16} />
                 </button>
                 <span className="w-12 text-center font-bold">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-4 hover:bg-muted transition-colors">
                    <ChevronRight size={16} />
                 </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow py-5 bg-primary text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "p-5 border transition-all",
                  isWishlisted ? "bg-pink-50 border-pink-100 text-pink-500" : "bg-white border-muted hover:border-primary"
                )}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Product Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-muted">
            <div className="flex flex-col items-center text-center gap-3">
              <ShieldCheck size={24} className="text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Premium Quality</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Truck size={24} className="text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <RefreshCw size={24} className="text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest">30 Day Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Description */}
      <section className="mt-32">
        <div className="flex border-b border-muted">
          {['Details', 'Specifications', 'Sustainability', 'Reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative",
                activeTab === tab.toLowerCase() ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>
        <div className="py-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-muted-foreground leading-relaxed space-y-4"
            >
              {activeTab === 'details' && (
                <>
                  <p>Elevate your wardrobe with the {product.name}. This piece embodies the essence of Vestra's minimalist design philosophy, combining luxurious materials with expert craftsmanship.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>100% sustainably sourced fabric</li>
                    <li>Tailored for a sophisticated fit</li>
                    <li>Reinforced stitching for durability</li>
                    <li>Breathable and lightweight feel</li>
                  </ul>
                </>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-bold text-secondary mb-1">Material</h5>
                    <p>Premium Silk Blend</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary mb-1">Weight</h5>
                    <p>250g (Approx.)</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary mb-1">Model</h5>
                    <p>Height 180cm, Size M</p>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-12 bg-white rounded-lg border border-muted">
                  <p className="italic">No reviews yet for this product. Be the first to share your thoughts!</p>
                  <button className="mt-6 px-10 py-4 bg-secondary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">Write a Review</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <h2 className="text-3xl font-bold mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
