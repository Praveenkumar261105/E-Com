import React from 'react';
import { Package, Truck, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Orders = () => {
  const mockOrders = [
    {
      id: 'ORD-9921-X3',
      date: 'Oct 21, 2024',
      status: 'In Transit',
      total: 319.99,
      items: [
        { name: 'Silk Evening Gown', variant: 'Emerald Green', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=200' }
      ]
    },
    {
      id: 'ORD-8812-Y2',
      date: 'Sep 15, 2024',
      status: 'Delivered',
      total: 89.99,
      items: [
        { name: 'Classic Linen Shirt', variant: 'Cloud White', image: 'https://images.unsplash.com/photo-1594932224010-70f90e541494?auto=format&fit=crop&q=80&w=200' }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <Link to="/profile" className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mb-4">
           My Profile <ChevronRight size={12} />
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Order History</h1>
      </div>

      <div className="space-y-8">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white border border-muted overflow-hidden">
            <div className="bg-muted/30 px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-muted">
               <div className="flex gap-8">
                  <div>
                    <span className="text-muted-foreground block mb-1">Order Placed</span>
                    <span>{order.date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Ship to</span>
                    <span>Jane Doe</span>
                  </div>
               </div>
               <div className="text-right">
                  <span className="text-muted-foreground block mb-1">Order #</span>
                  <span className="font-mono">{order.id}</span>
               </div>
            </div>

            <div className="p-8">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                  <div className="flex items-center gap-4">
                     <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-primary animate-pulse'}`} />
                     <p className="text-lg font-bold">{order.status}</p>
                  </div>
                  <div className="flex gap-4">
                     <Link to="/track-order" className="px-6 py-3 border border-muted text-[10px] font-bold uppercase tracking-widest hover:border-primary transition-colors">Track Package</Link>
                     <Link to="/returns" className="px-6 py-3 border border-muted text-[10px] font-bold uppercase tracking-widest hover:border-primary transition-colors">Return Item</Link>
                  </div>
               </div>

               <div className="space-y-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-6">
                       <div className="w-24 h-32 bg-muted overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                       </div>
                       <div className="flex flex-col justify-center">
                          <p className="text-lg font-bold mb-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground mb-4">{item.variant}</p>
                          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:underline">
                             Buy it again <ExternalLink size={12} />
                          </Link>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
