import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, variantId: string, size: string, quantity?: number) => void;
  removeFromCart: (variantId: string, size: string) => void;
  updateQuantity: (variantId: string, size: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, variantId: string, size: string, quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.selectedVariantId === variantId && item.selectedSize === size);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { ...product, selectedVariantId: variantId, selectedSize: size, quantity }];
    });
  };

  const removeFromCart = (variantId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.selectedVariantId === variantId && item.selectedSize === size)));
  };

  const updateQuantity = (variantId: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      (item.selectedVariantId === variantId && item.selectedSize === size) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, clearCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
