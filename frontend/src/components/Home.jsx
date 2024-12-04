import React, { useState } from 'react';
import Dashboard from './Dashboard';
import MyTickets from './MyTickets';
import StartJourney from './StartJurney';
import CompleteJourney from './completeJourney';
import Logout from './Logout';

const Home = () => {
  const [currentView, setCurrentView] = useState('bookTicket'); // States: 'bookTicket', 'viewTickets', 'startJourney', 'completeJourney'

  const handleViewChange = (view) => setCurrentView(view);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Metro Dashboard</h1>

      <div className="mb-4 flex justify-around">
        <button
          className={`py-2 px-4 rounded ${currentView === 'bookTicket' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          onClick={() => handleViewChange('bookTicket')}
        >
          Book Ticket
        </button>
        <button
          className={`py-2 px-4 rounded ${currentView === 'viewTickets' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          onClick={() => handleViewChange('viewTickets')}
        >
          View Tickets
        </button>
        <button
          className={`py-2 px-4 rounded ${currentView === 'startJourney' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          onClick={() => handleViewChange('startJourney')}
        >
          Start Journey
        </button>
        <button
          className={`py-2 px-4 rounded ${currentView === 'completeJourney' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          onClick={() => handleViewChange('completeJourney')}
        >
          Complete Journey
        </button>
      </div>

      <div className="mb-6">
        {currentView === 'bookTicket' && <Dashboard />}
        {currentView === 'viewTickets' && <MyTickets />}
        {currentView === 'startJourney' && <StartJourney />}
        {currentView === 'completeJourney' && <CompleteJourney />}
      </div>

      <div className="flex justify-center">
        <Logout />
      </div>
    </div>
  );
};

export default Home;
