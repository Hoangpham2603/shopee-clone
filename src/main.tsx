import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <App />
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
