import React, { useContext } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { authContext } from '../context/AuthContextProvider'

const AuthPage = () => {
  const { signupState, loginState } = useContext(authContext)
  return (
  <section className="min-h-full">
      <div className="max-w-5xl mx-auto px-4">
        {signupState && !loginState && <Signup />}
        {loginState && !signupState && <Login />}
      </div>
    </section>
  )
}

export default AuthPage