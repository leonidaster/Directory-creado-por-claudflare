import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ListingsPage } from '@/pages/ListingsPage';
import { ListingDetailPage } from '@/pages/ListingDetailPage';
import { AppLayout } from '@/components/AppLayout';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/listings",
        element: <ListingsPage />,
      },
      {
        path: "/listings/:id",
        element: <ListingDetailPage />,
      },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)