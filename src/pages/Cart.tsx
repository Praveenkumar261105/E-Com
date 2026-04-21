import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 20.00;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 px-6 text-center max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
            <ShoppingBag size={40} className="text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Your bag is empty</h1>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover our latest collections and find something perfect.</p>
          <Link to="/shop" className="px-12 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Shopping Bag ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => {
              const variant = item.variants.find(v => v.id === item.selectedVariantId);
              return (
                <motion.div
                  key={`${item.selectedVariantId}-${item.selectedSize}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  className="flex gap-6 pb-8 border-b border-muted group"
                >
                  <Link to={`/product/${item.id}`} className="shrink-0 w-32 md:w-48 aspect-[3/4] overflow-hidden bg-muted">
                    <img 
                      src={variant?.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/product/${item.id}`} className="text-lg font-bold hover:text-primary transition-colors">{item.name}</Link>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="space-y-1 text-xs uppercase tracking-widest text-muted-foreground">
                        <p>Color: {variant?.colorName}</p>
                        <p>Size: {item.selectedSize}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-muted bg-white">
                        <button 
                          onClick={() => updateQuantity(item.selectedVariantId, item.selectedSize, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.selectedVariantId, item.selectedSize, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.selectedVariantId, item.selectedSize)}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          <div className="py-8 space-y-4">
            <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
              <Truck size={20} className="text-primary shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1">Standard Delivery</p>
                <p className="text-xs text-muted-foreground">Free shipping on orders over $200. Estimated delivery in 3-5 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
              <Gift size={20} className="text-primary shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1">Gift Options</p>
                <p className="text-xs text-muted-foreground">Complimentary gift wrapping and personal messages are available at checkout.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 border border-muted sticky top-32">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping (Standard)</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="pt-4 border-t border-muted flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-5 bg-secondary text-white font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-primary transition-colors"
            >
              Checkout <ArrowRight size={16} />
            </button>

            <div className="mt-8">
               <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Accepted Payments</p>
               <div className="flex gap-4 opacity-50 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
