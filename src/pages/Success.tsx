import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Success = () => {
  const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="pt-48 pb-24 px-6 text-center max-w-2xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 text-primary"
      >
        <CheckCircle2 size={48} />
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
      >
        Order Confirmed
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-8 text-lg"
      >
        Thank you for your purchase. We've received your order and are processing it with care.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-white border border-muted p-6 mb-12 flex items-center justify-between rounded-lg"
      >
        <div className="text-left">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Order Number</p>
           <p className="font-mono font-bold">#{orderId}</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Estimated Delivery</p>
           <p className="font-bold">Oct 28 - Oct 30</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 w-full"
      >
        <Link to="/profile/orders" className="flex-grow py-5 bg-secondary text-white font-bold uppercase tracking-widest text-[11px] hover:bg-primary transition-colors flex items-center justify-center gap-3">
          Track My Order <ArrowRight size={16} />
        </Link>
        <Link to="/shop" className="flex-grow py-5 border border-muted text-secondary font-bold uppercase tracking-widest text-[11px] hover:border-primary transition-colors flex items-center justify-center gap-3">
          Continue Shopping <ShoppingBag size={16} />
        </Link>
      </motion.div>
    </div>
  );
};
