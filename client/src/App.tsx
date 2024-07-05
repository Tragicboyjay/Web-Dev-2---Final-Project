
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import DoctorDashboard from "./pages/DoctorDashboard";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AppointmentPage from './pages/AppointmentPage';
import ProfilePage from './pages/PofilePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/dashboard' element={<DoctorDashboard />} />
      <Route path='/sign_up' element={<SignUp />} />
      <Route path='/sign_in' element={<SignIn/>} />
      <Route path='/profile' element={<ProfilePage/>} />
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
