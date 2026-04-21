import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { HERO_SLIDES } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 p-12 lg:p-24 flex flex-col justify-center border-r border-gray-100 bg-white"
        >
          <div className="space-y-4 mb-8">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] font-bold tracking-[0.4em] text-primary uppercase"
            >
              {HERO_SLIDES[activeSlide].subtitle}
            </motion.span>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl leading-[0.95] font-light font-serif text-secondary"
            >
              {HERO_SLIDES[activeSlide].title.split(' ').slice(0, -1).join(' ')} <br/>
              <span className="italic font-normal text-primary">
                {HERO_SLIDES[activeSlide].title.split(' ').slice(-1)}
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-md text-sm text-gray-500 leading-relaxed mb-12"
          >
            Explore our curated collections featuring ethically sourced materials and timeless architectural silhouettes designed for the modern individual.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-8"
          >
            <Link
              to="/shop"
              className="px-10 py-5 bg-primary text-white text-[11px] font-bold tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              {HERO_SLIDES[activeSlide].cta}
            </Link>
            <button 
              onClick={() => {
                const target = document.getElementById('discover-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
            >
              <span className="text-[11px] font-bold tracking-widest uppercase border-b border-gray-300 pb-1 group-hover:border-primary transition-colors">Watch Lookbook</span>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                <ChevronRight size={14} className="text-primary ml-0.5" />
              </div>
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-24 flex gap-12"
          >
            {[
              { val: '100%', label: 'Organic Materials' },
              { val: '+15', label: 'Global Boutiques' },
              { val: 'Zero', label: 'Carbon Impact' }
            ].map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col">
                  <span className="text-xl font-medium mb-1">{stat.val}</span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400">{stat.label}</span>
                </div>
                {i < 2 && <div className="w-[1px] h-10 bg-gray-100" />}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="lg:col-span-5 bg-[#f5f5f5] relative flex items-center justify-center p-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[400px] shadow-2xl bg-white group cursor-pointer relative z-10"
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img 
                src={HERO_SLIDES[activeSlide].image} 
                alt="Featured Product"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-[9px] px-2 py-1 tracking-widest uppercase">
                Featured
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold uppercase tracking-widest">{HERO_SLIDES[activeSlide].subtitle}</h3>
                <span className="text-xs font-semibold text-primary">New Collection</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Available Now</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Typography */}
        <div className="absolute -bottom-16 -right-16 opacity-[0.03] pointer-events-none select-none">
          <span className="text-[20rem] font-bold leading-none font-sans uppercase">VESTRA</span>
        </div>

        {/* slider indicator */}
        <div className="absolute bottom-8 right-8 z-30 flex items-center space-x-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={cn(
                "h-1 transition-all duration-300 rounded-full",
                activeSlide === index ? "w-12 bg-primary" : "w-3 bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
