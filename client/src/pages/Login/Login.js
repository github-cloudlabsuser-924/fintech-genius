import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const apiUrl = "https://fintech-cards.azurewebsites.net";
  console.log('API URL:', apiUrl);

  const navigate = useNavigate ();


  const handleSubmit = async (event) => {
    console.log('API URL:',  apiUrl);
    event.preventDefault();
    setIsSubmitted(true);

    if (!username || !password) {
      return;
    }

    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log('Username: ', username);
    console.log('Password: ', password);

    if (data.success) {
      console.log('Login successful');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('Id', data.id);
      navigate('/dashboard');
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };


  return (
    <div className="login-container">
    <form className='login-form' onSubmit={handleSubmit}>
        <input className={`login-input ${isSubmitted && !username ? 'invalid' : ''}`}  placeholder='User Name*' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input  className={`login-input ${isSubmitted && !password ? 'invalid' : ''}`}   placeholder='Password*'  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <button type="button" onClick={handleCreateAccount}>Create Account</button>
    </form>
    </div>
  );
}

export default Login;