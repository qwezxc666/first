import {Routes,Route, Navigate} from 'react-router-dom'
import React from 'react'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm';
import {Home} from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import { Toaster } from "@/components/ui/toaster"
import SignupForm from './_auth/forms/SignupForm';

const App = () => {
  return (
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>  
    <main className='flex h-screen'>
        <Routes>
            {/*public routes*/}
            <Route element={<AuthLayout/>}>
                <Route path="/sign-in" element={<SigninForm/>} />
                <Route path="/sign-up" element={<SignupForm/>} />

            </Route>
         
            {/*private routes*/}
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>} />
            </Route>
        </Routes>
          {/* 默认路由 */}
        <Route path="*" element={<Navigate to="/sign-in" />} />
        <Toaster />
    </main>
    )
}

export default App