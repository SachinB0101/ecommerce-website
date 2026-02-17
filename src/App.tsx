import { lazy, Suspense } from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  ScrollRestoration,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

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

function ErrorPage() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground">Please try again later.</p>
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
