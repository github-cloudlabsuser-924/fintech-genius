import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';


function Homepage() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {

    console.log('Create Account button clicked');
    navigate('/create-account');

    // Add your logic for creating an account here
  };

  const handleLogin = () => {
    console.log('Login button clicked');
    navigate('/login');

    // Add your logic for logging in here
  };

  return (
    <div className='home'>
      <nav>
        <h1>Welcome</h1>
        <button className='button' onClick={handleCreateAccount}>Create Account</button>
        <button className='button' onClick={handleLogin}>Login</button>
      </nav>
    </div>
  );
}

export default Homepage;