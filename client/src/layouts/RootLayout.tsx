import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';


export default function RootLayout() {
  return (
    <Box>
        <Navbar />
        <Outlet />
        <Footer />
    </Box>
  )
}
