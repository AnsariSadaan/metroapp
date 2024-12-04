import React, { useState } from 'react';
import { startJourney } from '../api'; // API function to start the journey

const StartJourney = () => {
    const [ticketToken, setTicketToken] = useState('');
    const [source, setSource] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleStartJourney = async () => {
        try {
            const response = await startJourney({ ticketToken, source });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
            setMessage('');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Start Journey</h2>
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
                <label className="block text-gray-700">Source Station:</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
            </div>
            <button
                onClick={handleStartJourney}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Start Journey
            </button>

            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default StartJourney;
