
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import DoctorDashboard from "./pages/DoctorDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/dashboard' element={<DoctorDashboard />} />
    </Route>
  )
)
function App() {
 
  return (
    <RouterProvider router={router} />
  )
}

export default App
