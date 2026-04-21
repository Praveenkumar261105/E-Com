import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small GSAP effect for the trending header
      gsap.from('.gsap-reveal', {
        scrollTrigger: {
          trigger: '.gsap-reveal',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const trendingProducts = PRODUCTS.filter(p => p.isTrending);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="bg-accent">
      <Hero />

      {/* Categories Grid */}
      <section id="discover-section" className="py-24 px-6 sm:px-12 bg-white">
        <div className="flex justify-between items-end mb-16 px-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.4em] text-primary mb-4 uppercase">Curated Collections</p>
            <h2 className="text-4xl md:text-5xl font-light font-serif">Discover Your Style</h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors border-b border-gray-200 pb-1">
            View All Shop <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[4/5] group overflow-hidden border border-gray-100"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-sm p-4 text-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xs font-bold mb-1 tracking-widest uppercase">{cat.name}</h3>
                <Link 
                  to={`/category/${cat.id}`}
                  className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-32 px-6 sm:px-12 bg-[#fcfcfc] border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="gsap-reveal text-[11px] font-bold tracking-[0.4em] text-primary mb-4 uppercase">On High Rotation</p>
            <h2 className="gsap-reveal text-4xl md:text-6xl font-light font-serif italic text-[#0f3d2e]">The Trending Edit</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers Banner */}
      <section className="py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-primary text-white p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
        >
          <div className="z-10 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-6xl font-bold mb-4 italic">Exclusive Debut Sale</h2>
            <p className="text-sm md:text-lg opacity-80 max-w-md">Enjoy up to 40% off on our limited autumn collection. Valid for a limited time only.</p>
          </div>
          <div className="z-10">
            <Link
              to="/shop?offer=debut"
              className="px-10 py-5 bg-white text-secondary font-bold uppercase tracking-widest text-xs hover:bg-secondary hover:text-white transition-all inline-block"
            >
              Claim Offer
            </Link>
          </div>
          {/* subtle decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 border border-white/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 border border-white/10 rounded-full" />
        </motion.div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">Best Sellers</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest">All</button>
              <button className="px-4 py-2 border border-muted-foreground/30 text-[10px] font-bold uppercase tracking-widest hover:border-primary transition-colors">Women</button>
              <button className="px-4 py-2 border border-muted-foreground/30 text-[10px] font-bold uppercase tracking-widest hover:border-primary transition-colors">Men</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Highlight */}
      <section className="py-24 px-6 bg-[#0a291f] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-60 block mb-6">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Crafting timeless elegance for the modern individual.</h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-lg">
              At Vestra, we believe that fashion is more than just clothing—it's an expression of one's identity. Our collections are meticulously curated to blend modern trends with classic sophistication, ensuring you always feel your best.
            </p>
            <Link to="/about" className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-white transition-all">
              Discover the Story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          <div className="relative aspect-square">
             <motion.img 
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
             />
             <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 backdrop-blur-xl p-8 hidden md:flex flex-col justify-end">
                <p className="text-4xl font-serif font-bold italic">2024</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Established</p>
             </div>
          </div>
        </div>
      </section>

      {/* Newsletter simple component for homepage */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
           <AnimatePresence mode="wait">
             {!subscribed ? (
               <motion.div
                 key="form"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
               >
                 <h2 className="text-3xl font-bold mb-6">Don't miss a beat</h2>
                 <p className="text-muted-foreground mb-10">Sign up for early access to our seasonal sales and exclusive collections.</p>
                 <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
                    <input 
                      type="email" 
                      required
                      placeholder="ENTER YOUR EMAIL" 
                      className="flex-grow bg-white border border-muted px-6 py-4 outline-none focus:border-primary transition-colors text-sm uppercase tracking-widest font-bold"
                    />
                    <button type="submit" className="bg-primary text-white px-10 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap hover:bg-secondary transition-colors">Join Now</button>
                 </form>
               </motion.div>
             ) : (
               <motion.div
                 key="success"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col items-center"
               >
                 <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 size={32} />
                 </div>
                 <h2 className="text-3xl font-bold mb-4 italic">You're on the list!</h2>
                 <p className="text-muted-foreground max-w-sm">Thank you for joining the VSTRA community. Check your inbox soon for your exclusive welcome gift.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
