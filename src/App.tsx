import { lazy, Suspense } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  ScrollRestoration,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import WhishlistPage from "./pages/WhishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container py-20">
              <div className="animate-pulse">Loading...</div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "wishlist", element: <WhishlistPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "orders", element: <OrderHistoryPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  );
}

export default App;
