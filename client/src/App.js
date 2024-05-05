import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Login from './pages/Login/Login';
import AddCard from './pages/AddCard/AddCard';



const apiUrl = "https://fintech-cards.azurewebsites.net";


function App() {
  console.log('API URL:', apiUrl);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
