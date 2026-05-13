/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthCallback, NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Onboarding from "./pages/Onboarding"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"
import Account from "./pages/Account"
import Navbar from "./components/layout/Navbar"
import { authClient } from "./lib/auth"
import AuthProvider from './context/AuthContext';


function App() {


  return (
    <NeonAuthUIProvider authClient={authClient as any} defaultTheme='dark' social={{ providers: ['google', 'github'] }}>
      <AuthProvider>
        <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
              <Routes>
                <Route index element={<Home/>}/>
                <Route path="/onboarding" element={<Onboarding />}/>
                <Route path="/Profile" element={<Profile />}/>
                <Route path="/auth/:pathname" element={<Auth />}/>
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/account/:pathname" element={<Account />}/>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
  )
}

export default App
