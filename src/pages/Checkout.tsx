import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Checkout = () => {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal > 200 ? 0 : 20.00);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finalize order
      clearCart();
      navigate('/order-success');
    }
  };

  if (cart.length === 0) {
    return <div className="pt-40 text-center">Your bag is empty. <Link to="/shop" className="text-primary underline">Shop now</Link></div>;
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          {/* Steps */}
          <div className="flex items-center gap-8 mb-16 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { id: 1, name: 'Shipping', icon: <Truck size={18} /> },
              { id: 2, name: 'Billing', icon: <CheckCircle2 size={18} /> },
              { id: 3, name: 'Payment', icon: <CreditCard size={18} /> }
            ].map((s) => (
              <div key={s.id} className="flex items-center shrink-0">
                <div className={`flex items-center gap-3 ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${step >= s.id ? 'border-primary bg-primary text-white' : 'border-muted'}`}>
                    {s.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{s.name}</span>
                </div>
                {s.id < 3 && <div className="w-12 h-[1px] bg-muted mx-4" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Email Address</label>
                    <input required type="email" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">First Name</label>
                    <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Last Name</label>
                    <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Street Address</label>
                    <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">City</label>
                    <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Postal Code / ZIP</label>
                    <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Billing Option</h2>
                <div className="p-6 border-2 border-primary bg-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="text-primary" />
                    <div>
                      <p className="font-bold text-sm">Same as Shipping</p>
                      <p className="text-xs text-muted-foreground">Use my shipping address for billing.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-muted bg-white flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border border-muted" />
                    <div>
                      <p className="font-bold text-sm text-muted-foreground">Different Address</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Payment Method</h2>
                <div className="space-y-4">
                    <div className="p-6 border-2 border-primary bg-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="text-primary" />
                        <p className="font-bold text-sm">Credit / Debit Card</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-5" alt="Visa" referrerPolicy="no-referrer" />
                         <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-5" alt="Mastercard" referrerPolicy="no-referrer" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-6 pt-6">
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Card Number</label>
                        <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent font-mono" placeholder="XXXX XXXX XXXX XXXX" />
                        <div className="absolute right-0 top-10 flex gap-2">
                           <CreditCard size={18} className="text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Expiry (MM/YY)</label>
                          <input required type="text" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent font-mono" placeholder="MM / YY" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">CVC / CVV</label>
                          <input required type="password" className="w-full border-b border-muted py-4 outline-none focus:border-primary transition-colors bg-transparent font-mono" placeholder="***" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-12 border-t border-muted">
               <button 
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors ${step === 1 ? 'invisible' : ''}`}
               >
                 Back
               </button>
               <button 
                type="submit"
                className="px-12 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
               >
                 {step === 3 ? 'Complete Purchase' : 'Next Step'}
               </button>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 border border-muted sticky top-32">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-8 pb-4 border-b border-muted">Order Review</h3>
            <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
               {cart.map(item => (
                 <div key={`${item.selectedVariantId}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-muted shrink-0">
                       <img src={item.variants.find(v => v.id === item.selectedVariantId)?.images[0]} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                       <p className="text-xs font-bold line-clamp-1">{item.name}</p>
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                       <p className="text-xs font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-muted">
               <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground uppercase tracking-widest">Shipping</span>
                  <span className="font-bold">{subtotal > 200 ? 'FREE' : '$20.00'}</span>
               </div>
               <div className="flex justify-between text-sm pt-4 font-bold border-t border-muted">
                  <span className="uppercase tracking-widest">Total to Pay</span>
                  <span>${total.toFixed(2)}</span>
               </div>
            </div>

            <div className="mt-8 flex items-center gap-2 p-4 bg-muted text-[10px] uppercase font-bold tracking-widest rounded">
               <ShieldCheck size={16} className="text-primary" />
               Secure Checkout Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1v7z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
