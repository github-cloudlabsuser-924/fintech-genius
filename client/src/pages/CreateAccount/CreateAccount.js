import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateAccount.css';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const navigate = useNavigate();
  const apiUrl = "https://fintech-cards.azurewebsites.net";


  const handleSubmit = async (event) => {
    
    event.preventDefault();

    const response = await fetch(`${apiUrl}/create_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
   

        first_name: firstName,
        last_name: last_name,
        login:{
            username,
            password,
            email
        }
      }),
    });

    const data = await response.json();

    if (data.success) {

      alert('Account created successfully');
      navigate('/login');

    } else {
      alert('Error: ' + data.message);
    }
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit} class="form">
      <label>
        Username:
        <input type="text" class="input" placeholder='User Name*' value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" class="input" placeholder='Password*' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email"  class="input" placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        First Name:
        <input type="text" class="input" placeholder='First Name*'  value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" class="input" placeholder='Last Name*' value={last_name} onChange={(e) => setLastName(e.target.value)} required />
      </label>
      <button type="submit">Create Account</button>
      <button className="button" onClick={handleLogin}>Login</button>

    </form>
    </div>
  );
}

export default CreateAccount;