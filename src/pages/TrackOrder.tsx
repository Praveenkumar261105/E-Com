import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        id: orderId.toUpperCase(),
        status: 'In Transit',
        estimatedDelivery: 'Oct 28, 2024',
        steps: [
          { status: 'Order Placed', time: 'Oct 21, 09:12 AM', completed: true },
          { status: 'Processed', time: 'Oct 21, 14:30 PM', completed: true },
          { status: 'In Transit', time: 'Oct 22, 08:00 AM', completed: true, current: true },
          { status: 'Out for Delivery', time: 'Pending', completed: false },
          { status: 'Delivered', time: 'Pending', completed: false },
        ]
      });
      setIsTracking(false);
    }, 1500);
  };

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[80vh]">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-bold tracking-[0.5em] text-primary uppercase block mb-4"
        >
          Order Logistics
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif text-secondary"
        >
          Track Your Order
        </motion.h1>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleTrack}
        className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 mb-24"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="ORDER ID (e.g. VSTR-4829)"
            className="w-full bg-white border border-gray-200 px-6 py-5 outline-none focus:border-primary transition-colors text-xs font-bold uppercase tracking-widest"
          />
        </div>
        <button
          type="submit"
          disabled={isTracking}
          className="px-12 py-5 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-3 shrink-0"
        >
          {isTracking ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Search size={16} />
            </motion.div>
          ) : 'Locate Order'}
        </button>
      </motion.form>

      <AnimatePresence mode="wait">
        {trackingData && (
          <motion.div
            key="tracking-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center p-12 bg-white border border-gray-100 rounded-sm gap-8 shadow-sm">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Current Status</p>
                <h3 className="text-3xl font-serif italic text-primary">{trackingData.status}</h3>
              </div>
              <div className="w-[1px] h-12 bg-gray-100 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Tracking ID</p>
                <h3 className="text-xl font-bold uppercase tracking-widest text-secondary">{trackingData.id}</h3>
              </div>
              <div className="w-[1px] h-12 bg-gray-100 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Expected Arrival</p>
                <h3 className="text-xl font-bold uppercase tracking-widest text-secondary">{trackingData.estimatedDelivery}</h3>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-12 text-center">Journey Timeline</h4>
              <div className="space-y-0">
                {trackingData.steps.map((step: any, i: number) => (
                  <div key={i} className="relative flex gap-8 pb-12 last:pb-0 group">
                    {i < trackingData.steps.length - 1 && (
                      <div className={cn(
                        "absolute left-[11px] top-6 w-[2px] h-full transition-colors duration-500",
                        step.completed && trackingData.steps[i+1].completed ? "bg-primary" : "bg-gray-100"
                      )} />
                    )}
                    <div className="relative z-10">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                        step.completed ? "bg-primary border-primary text-white" : "bg-white border-gray-200 text-gray-300"
                      )}>
                        {step.completed ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                      </div>
                    </div>
                    <div className="flex flex-col pb-2">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-widest transition-colors duration-500",
                        step.completed ? "text-secondary" : "text-gray-300",
                        step.current && "text-primary"
                      )}>
                        {step.status}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <MapPin size={24} className="mx-auto mb-4 text-primary" />
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Real-time Location</p>
          <p className="text-[11px] text-gray-400">Track and find your parcel anywhere in the world.</p>
        </div>
        <div>
          <Clock size={24} className="mx-auto mb-4 text-primary" />
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Instant Updates</p>
          <p className="text-[11px] text-gray-400">Receive SMS alerts at every significant milestone.</p>
        </div>
        <div>
          <Package size={24} className="mx-auto mb-4 text-primary" />
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Secure Handling</p>
          <p className="text-[11px] text-gray-400">Our signature double-packaging protects your pieces.</p>
        </div>
      </div>
    </div>
  );
};
