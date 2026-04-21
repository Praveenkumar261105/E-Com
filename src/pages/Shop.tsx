import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { cn } from '../lib/utils';

export const Shop = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState(categorySlug || 'all');
  
  // Sync state with URL when categorySlug changes
  React.useEffect(() => {
    setActiveCategory(categorySlug || 'all');
  }, [categorySlug]);

  // Filters state
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    
    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    
    // Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    
    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    
    // Sorting
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [activeCategory, searchQuery, priceRange, selectedSizes, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase tracking-tight">
            {activeCategory === 'all' ? 'The Collection' : activeCategory}
          </h1>
          <p className="text-sm text-muted-foreground">{filteredProducts.length} Products Found</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-6 py-3 border border-muted hover:border-primary transition-colors text-xs font-bold uppercase tracking-widest bg-white"
          >
            <Filter size={14} /> {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <div className="relative group flex-grow md:flex-grow-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-muted px-6 py-3 pr-10 text-xs font-bold uppercase tracking-widest outline-none hover:border-primary transition-colors cursor-pointer w-full"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0, x: -20 }}
              animate={{ width: 'auto', opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -20 }}
              className="lg:w-64 space-y-10 overflow-hidden shrink-0"
            >
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Categories</h4>
                <div className="flex flex-col space-y-3">
                  {['All', 'Men', 'Women', 'Kids', 'Footwear', 'Accessories'].map(cat => (
                    <button
                      key={cat}
                      className={cn(
                        "text-sm text-left hover:text-primary transition-colors",
                        activeCategory === cat.toLowerCase() ? "text-primary font-bold" : "text-muted-foreground"
                      )}
                      onClick={() => setActiveCategory(cat.toLowerCase())}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Price Range</h4>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-1 bg-muted accent-primary appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', '40', '41', '42', '43', '44'].map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "py-2 border text-[10px] font-bold transition-all",
                        selectedSizes.includes(size) ? "bg-primary text-white border-primary" : "border-muted hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setPriceRange([0, 500]);
                  setSelectedSizes([]);
                }}
                className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                Clear All
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="text-muted-foreground italic">No products found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setPriceRange([0, 500]);
                  setSelectedSizes([]);
                }}
                className="mt-4 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-1"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
