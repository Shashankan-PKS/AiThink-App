import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes,Navigate  } from 'react-router-dom';
import ChatBox from './components/ChatBox.jsx';
import Settings from './pages/Settings.jsx';
import './assets/prism.css';
import Signup from './pages/signup/Signup.jsx';
import { useAppContext } from './context/Appcontext.jsx';
import SignIn from './pages/signin/Signin.jsx';
import ForgotPassword from './pages/forgotpassword/ForgotPassword.jsx';
import VerifyOtp from './pages/forgotpassword/verifyOtp.jsx';
import ChangePassword from './pages/forgotpassword/ChangePassword.jsx';
import { ResetPassProvider } from './context/ResetPasswordContext.jsx';
import GetStarted from './pages/getstarted/GetStarted.jsx';

const App = () => {

  const {user} = useAppContext();
  return (
    <>
      <div>
        <ResetPassProvider>
          <Routes>
            <Route path='/' element={<GetStarted />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<SignIn/>} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/verify-otp' element={<VerifyOtp />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path="/*" element={
              <div className="flex h-screen w-screen">
                <Sidebar />
                <Routes>
                  <Route path="/home" element={<ChatBox />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            }
          />
          </Routes>
        </ResetPassProvider>
      </div>
    </>
  )
}

export default App
