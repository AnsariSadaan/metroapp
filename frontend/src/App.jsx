import './App.css'
// import Login from './components/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PaymentPage from './components/PaymentPgae';
import MyTickets from './components/MyTickets';
import StartJourney from './components/StartJurney';
import CompleteJourney from './components/completeJourney';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/paymentpage' element={<PaymentPage />}></Route>
        <Route path='/my-ticket' element={<MyTickets />}></Route>
        <Route path="/start-journey" element={<StartJourney />} />
        <Route path="/complete-journey" element={<CompleteJourney />} />
      </Routes>
    </Router>
  )
}

export default App
