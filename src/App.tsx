import { lazy, Suspense } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  ScrollRestoration,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ErrorPage from "./pages/ErrorPage";

import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
const SingleProduct = lazy(() => import("./pages/SingleProduct"));

//protected routes
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Cart } from "./components/cart/Cart";

const WhishlistPage = lazy(() => import("./pages/WhishlistPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));

//Clerk authentication
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env");
}

const queryClient = new QueryClient();

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
      <Cart/>
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
      { path: "categories/:category", element: <CategoriesPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <SingleProduct /> },
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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
