import React, { useEffect, useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import ProtectedRoute from './components/ProtectedRoute'
import ViewPage from './pages/ViewPage'
import Footer from './components/Footer'


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if(location.pathname === "/"){
      if(userInfo){
        navigate("/SaveInfo.com");
      } else {
        navigate("/SaveInfo.com/auth/login");
      }
    }

    setLoading(false);
  }, [navigate, location]);

  if(loading) return null;

  return (
    <div className='min-h-screen flex flex-col bg-gray-800'>
      <Navbar/>
      <main className='flex-grow max-w-7xl mx-auto p-4 w-full'>
        <Routes>
          <Route path='/SaveInfo.com/auth/login' element={<LoginPage/>}/>
          <Route path='/SaveInfo.com/auth/signup' element={<RegisterPage/>}/>
          <Route path='/SaveInfo.com' element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
          <Route path='/SaveInfo.com/note/create' element={<ProtectedRoute> <CreatePage/> </ProtectedRoute>} />
          <Route path='/SaveInfo.com/note/:id' element={<ProtectedRoute><ViewPage/></ProtectedRoute>}/>
        </Routes>
      </main>

      <Footer/>
    </div>
  )
}

export default App;