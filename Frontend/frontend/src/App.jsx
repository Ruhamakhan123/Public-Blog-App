import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';



const App = () => {
  return (
    <div class="bg-gradient-to-br from-white-100 to-white-200">
    <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
    <div className='max-w-md w-full space-y-8'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
      
    </div>
    </div>
  );
};

export default App;