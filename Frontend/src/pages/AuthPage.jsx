import React, { useContext } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { authContext } from '../context/AuthContextProvider'

const AuthPage = () => {
  const { signupState, loginState } = useContext(authContext)
  return (
  <section className="min-h-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {signupState && !loginState && <Signup />}
        {loginState && !signupState && <Login />}
      </div>
    </section>
  )
}

export default AuthPage