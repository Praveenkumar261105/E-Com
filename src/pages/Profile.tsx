import React from 'react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, CreditCard, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'My Orders', icon: <Package size={20} />, path: '/profile/orders', badge: '2' },
    { name: 'My Wishlist', icon: <Heart size={20} />, path: '/wishlist' },
    { name: 'Shipping Addresses', icon: <MapPin size={20} />, path: '/profile/address' },
    { name: 'Payment Methods', icon: <CreditCard size={20} />, path: '/profile/payment' },
    { name: 'Personal Details', icon: <User size={20} />, path: '/profile/details' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/profile/settings' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold font-serif">
              JD
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Jane Doe</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Premium Member</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="flex items-center justify-between p-4 hover:bg-white border-l-2 border-transparent hover:border-primary transition-all group"
              >
                <div className="flex items-center gap-4 text-muted-foreground group-hover:text-secondary">
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                  )}
                  <ChevronRight size={16} className="text-muted/30 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
            <button 
              className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 transition-colors mt-8"
              onClick={() => navigate('/')}
            >
              <LogOut size={20} />
              <span className="text-sm font-medium uppercase tracking-[0.2em] font-bold">Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
             <div className="bg-white p-8 border border-muted flex flex-col justify-between">
                <div>
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Total Spending</h3>
                   <p className="text-4xl font-mono font-bold">$1,245.90</p>
                </div>
                <p className="text-[10px] text-primary font-bold mt-8 flex items-center gap-2">View Financial History <ChevronRight size={12} /></p>
             </div>
             <div className="bg-primary text-white p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="z-10">
                   <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-4">Loyalty Points</h3>
                   <p className="text-4xl font-mono font-bold">4500 PX</p>
                </div>
                <p className="text-[10px] font-bold mt-8 flex items-center gap-2 z-10">Redeem Points <ChevronRight size={12} /></p>
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full" />
             </div>
          </div>

          <section>
             <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight">Recent Activity</h2>
             <div className="space-y-4">
                {[
                  { title: 'Ordered silk evening gown', date: '2 hours ago', type: 'order' },
                  { title: 'Added sage green linen shirt to wishlist', date: 'Yesterday', type: 'wishlist' },
                  { title: 'Review approved for Chelsea Boots', date: '3 days ago', type: 'review' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 border border-muted hover:border-primary transition-colors flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div>
                           <p className="text-sm font-medium">{item.title}</p>
                           <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{item.date}</p>
                        </div>
                     </div>
                     <ChevronRight size={16} className="text-muted" />
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};
