import { Outlet } from 'react-router'
import { Checkout } from './components/Checkout'

function App() {
  return (
    <div className="min-h-dvh flex flex-col max-w-[1024px] mx-auto">
      <main className="flex-1">
        <Outlet />
      </main>

      <Checkout />
    </div>
  )
}

export default App
