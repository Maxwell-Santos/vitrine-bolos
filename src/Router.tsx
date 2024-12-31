import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App'
import { Vitrine } from './pages/Vitrine'
import { Bolo } from './pages/Bolo'
import { Entrega } from './pages/Entrega'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Vitrine />} />
          <Route path="bolo/:id" element={<Bolo />} />
        </Route>
        <Route path="entrega" element={<Entrega />} />
      </Routes>
    </BrowserRouter>
  )
}
