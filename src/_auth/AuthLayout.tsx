import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
//<Outlet /> 允许在父组件中定义布局，这样你可以在多个子路由中共享布局，而不需要在每个子路由组件中重复定义。
const AuthLayout = () => {
  const isAuthenticated=false;
  return (
    <>
      {isAuthenticated?(
        <Navigate to ="/"/>
      ):(
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            
            <Outlet/>
          </section>

          <img
            src='/assets/images/side-img.svg'
            alt='logo'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </>
        
      )}
    </>
  )
}

export default AuthLayout