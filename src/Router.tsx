import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App'
import { Vitrine } from './pages/Vitrine'
import { Bolo } from './pages/Bolo'
import { Entrega } from './pages/Entrega'
import { Confirmar } from './pages/Confirmar'
import { CheckoutProvider } from './context/checkout-context'
import { CheckoutMiddleware } from './middlewares/CheckoutMiddleware'
import { EnderecosSalvos } from './pages/EnderecosSalvos'

export function Router() {
  return (
    <CheckoutProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Vitrine />} />
            <Route path="bolo/:id" element={<Bolo />} />
          </Route>
          <Route
            path="entrega"
            element={
              <CheckoutMiddleware>
                <Entrega />
              </CheckoutMiddleware>
            }
          />
          <Route
            path="entrega/salvos"
            element={
              <CheckoutMiddleware>
                <EnderecosSalvos />
              </CheckoutMiddleware>
            }
          />
          <Route path="confirmar" element={<Confirmar />} />
        </Routes>
      </BrowserRouter>
    </CheckoutProvider>
  )
}
