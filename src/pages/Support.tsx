import React from 'react';
import { motion } from 'motion/react';
import { Truck, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface SupportSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const SupportSection: React.FC<SupportSectionProps> = ({ title, subtitle, icon, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-16 md:py-24 border-b border-gray-100 last:border-0"
  >
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            {icon}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">{subtitle}</p>
        </div>
        <h2 className="text-4xl font-serif italic text-secondary">{title}</h2>
      </div>
      <div className="lg:col-span-8 space-y-8 text-gray-500 leading-relaxed max-w-2xl text-sm">
        {content}
      </div>
    </div>
  </motion.div>
);

export const Support = ({ type }: { type: 'shipping' | 'returns' | 'care' }) => {
  const renderContent = () => {
    switch (type) {
      case 'shipping':
        return (
          <SupportSection
            title="Shipping & Delivery"
            subtitle="Logistics"
            icon={<Truck size={24} />}
            content={
              <>
                <p>
                  At VESTRA, we believe that the premium experience shouldn't end at the checkout. We partner with the world's leading couriers to ensure your pieces arrive in pristine condition, regardless of where you are in the world.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  <div className="p-8 border border-gray-100 bg-white">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-4">Domestic (USA)</h4>
                    <p className="mb-2">Standard: 3-5 Business Days (Free on orders $200+)</p>
                    <p>Express: 1-2 Business Days ($25.00)</p>
                  </div>
                  <div className="p-8 border border-gray-100 bg-white">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-4">International</h4>
                    <p className="mb-2">Standard: 7-10 Business Days ($40.00)</p>
                    <p>Priority: 3-5 Business Days ($65.00)</p>
                  </div>
                </div>
                <p className="pt-8">
                  Once your order is dispatched, you will receive a confirmation email with a tracking number. Please note that international orders may be subject to customs duties and taxes upon arrival.
                </p>
              </>
            }
          />
        );
      case 'returns':
        return (
          <SupportSection
            title="Returns & Exchanges"
            subtitle="Guarantee"
            icon={<RefreshCw size={24} />}
            content={
              <>
                <p>
                  We want you to be completely satisfied with your VESTRA purchase. If for any reason you are not, we offer a 30-day return policy for all unworn, unwashed items in their original packaging with tags attached.
                </p>
                <ul className="list-disc pl-5 space-y-4 pt-4 font-medium text-secondary">
                  <li>Returns must be initiated within 30 days of the delivery date.</li>
                  <li>Items marked as "Final Sale" cannot be returned or exchanged.</li>
                  <li>Hygiene-sensitive items must have the protective seal intact.</li>
                  <li>Exchanges are processed free of charge for the first occurrence.</li>
                </ul>
                <div className="mt-12 p-8 bg-muted border border-muted flex items-start gap-6">
                  <ShieldCheck size={32} className="text-primary shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-2">Secure Returns</h4>
                    <p className="text-[11px]">All returns are inspected by our quality control team to ensure they meet our high standards for resale. We reserve the right to deny returns that show signs of wear or damage.</p>
                  </div>
                </div>
              </>
            }
          />
        );
      case 'care':
        return (
          <SupportSection
            title="Product Care"
            subtitle="Longevity"
            icon={<Sparkles size={24} />}
            content={
              <>
                <p>
                  VESTRA pieces are crafted using the finest organic materials and delicate finishes. With proper care, your garments will maintain their silhouette and texture for years to come.
                </p>
                <div className="space-y-10 pt-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 border-b border-gray-100 pb-2 inline-block">Silk & Delicate Fabrics</h4>
                    <p>We recommend professional dry cleaning for all silk pieces. If hand washing, use cold water and a specialized silk detergent. Never wring silk garments; instead, lay them flat on a towel to dry away from direct sunlight.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 border-b border-gray-100 pb-2 inline-block">Organic Cotton & Linen</h4>
                    <p>Machine wash on a cold, gentle cycle with similar colors. Use a mild, eco-friendly detergent to preserve the natural fibers. Air dry when possible, or tumble dry on the lowest heat setting.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 border-b border-gray-100 pb-2 inline-block">Leather & Suede</h4>
                    <p>Avoid exposure to heavy rain and extreme heat. For small marks, use a soft, damp cloth. We recommend annual professional cleaning by a leather specialist to keep the material supple and prevent cracking.</p>
                  </div>
                </div>
              </>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16"
      >
        <span className="text-[11px] font-bold tracking-[0.5em] text-primary uppercase block mb-4">Information Center</span>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-secondary">Service & Support</h1>
      </motion.div>

      {renderContent()}

      <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Need direct assistance?</p>
          <p className="text-lg">support@vestra.fashion</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Concierge Hours</p>
          <p className="text-lg">Mon - Fri: 09:00 - 18:00 EST</p>
        </div>
      </div>
    </div>
  );
};
