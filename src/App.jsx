import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'

import CityList from './components/CityList/CityList'
import City from './components/City/City'
import CountryList from './components/CountryList/CountryList'
import Form from './components/Form/Form'
import PageNotFound from './pages/PageNotFound'
import { CitiesProvider } from './contexts/CitiesContext'

function App() {
  return (
    <CitiesProvider>
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CitiesProvider>
  )
}

export default App