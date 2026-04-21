import React from 'react';
import { Tag, ArrowRight, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Offers = () => {
  const mockOffers = [
    { title: 'New Customer Special', code: 'WELCOME20', discount: '20% Off', description: 'Available on your first order. Minimum spend of $100.', color: 'bg-primary' },
    { title: 'Season Finale', code: 'END40', discount: '40% Off', description: 'Limited time offer on all summer essentials.', color: 'bg-secondary' },
    { title: 'Elite Membership', code: 'ELITE15', discount: '15% Off', description: 'Exclusive discount for our premium members on new arrivals.', color: 'bg-amber-900' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">Exclusive Access</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Privileges & Offers</h1>
        <p className="text-muted-foreground">Unlock exceptional value on our finest collections. Premium quality, now more accessible.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockOffers.map((offer, i) => (
          <div key={i} className="bg-white border border-muted p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-500 group">
            <div>
              <div className={`w-12 h-12 ${offer.color} rounded-full flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                <Percent size={20} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">{offer.description}</p>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-muted/30 border-2 border-dashed border-muted rounded flex justify-between items-center">
                 <span className="font-mono font-bold tracking-widest">{offer.code}</span>
                 <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Copy</button>
              </div>
              <p className="text-3xl font-bold italic text-primary">{offer.discount}</p>
              <Link to="/shop" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                Shop Collection <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 p-12 bg-secondary text-white text-center">
         <Tag className="mx-auto mb-6 opacity-40" size={32} />
         <h2 className="text-3xl font-bold mb-4">Gift Cards Available</h2>
         <p className="text-gray-400 mb-8 max-w-md mx-auto">The perfect gift for someone who appreciates the finer things. Available in digital and physical formats.</p>
         <button className="px-12 py-5 bg-white text-secondary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Buy Gift Card</button>
      </div>
    </div>
  );
};
