import React, { useState } from 'react';
import { completeJourney } from '../api'; // API function to complete the journey

const CompleteJourney = () => {
    const [ticketToken, setTicketToken] = useState('');
    const [exitStation, setExitStation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCompleteJourney = async () => {
        try {
            const response = await completeJourney({ ticketToken, exitStation });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
            setMessage('');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Complete Journey</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Ticket Token:</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={ticketToken}
                    onChange={(e) => setTicketToken(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Exit Station:</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={exitStation}
                    onChange={(e) => setExitStation(e.target.value)}
                />
            </div>
            <button
                onClick={handleCompleteJourney}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
                Complete Journey
            </button>

            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default CompleteJourney;
