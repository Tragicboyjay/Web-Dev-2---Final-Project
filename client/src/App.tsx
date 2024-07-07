import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AppointmentPage from "./pages/AppointmentPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import Home from "./pages/Home";
import ProfilePage from "./pages/PofilePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<DoctorDashboard />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/make-appointment" element={<AppointmentPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
