import { Outlet } from 'react-router'
import { Checkout } from './components/Checkout'
import { CheckoutProvider } from './context/checkout-context'

function App() {
  return (
    <CheckoutProvider>
      <div className="min-h-dvh flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>

        <Checkout />
      </div>
    </CheckoutProvider>
  )
}

export default App
