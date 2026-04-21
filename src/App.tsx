/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Offers } from './pages/Offers';
import { Support } from './pages/Support';
import { TrackOrder } from './pages/TrackOrder';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "category/:categorySlug", element: <Shop /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <Success /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/orders", element: <Orders /> },
      { path: "offers", element: <Offers /> },
      { path: "shipping", element: <Support type="shipping" /> },
      { path: "returns", element: <Support type="returns" /> },
      { path: "care", element: <Support type="care" /> },
      { path: "track-order", element: <TrackOrder /> },
      { path: "search", element: <Shop /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  );
}
