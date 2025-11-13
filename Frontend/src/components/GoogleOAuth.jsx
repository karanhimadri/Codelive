import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react'
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { authContext } from '../context/AuthContextProvider';

const GoogleOAuth = () => {
  const { setSignupState, setLoginState, saveUser } = useContext(authContext);

  const login = (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      toast.error("Login failed. Invalid credentials.");
      return;
    }

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      saveUser({username: decoded.name, email: decoded.email, password: ""})
      setLoginState(false)
      setSignupState(false)
    } catch (error) {
      toast.error("Error decoding token.",error.message);
    }
  };

  const loginError = () => {
    toast.error("Login failed.");
  };

  return (
    <div>
      <GoogleLogin onSuccess={login} onError={loginError} />
      <div className='flex flex-col items-center justify-center'>
        <p className='my-3 font-medium text-gray-500'>OR</p>
      </div>
    </div>
  );
}

export default GoogleOAuth