
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import DoctorDashboard from "./pages/DoctorDashboard";
import AppointmentPage from './pages/AppointmentPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/dashboard' element={<DoctorDashboard />} />
      <Route path='/make-appointment' element={<AppointmentPage />} />
    </Route>
  )
)
function App() {
 
  return (
    <RouterProvider router={router} />
  )
}

export default App
