
import React, { useState, useEffect } from 'react';
import { initiatePayment } from '../api.js'; // API call
import Logout from './Logout.jsx';
import MyTickets from './MyTickets.jsx';

const metroData = [
    {
        line: "Line 1",
        stations: [
            { name: "Versova", distanceFromStart: 0 },
            { name: "D N Nagar", distanceFromStart: 1.5 },
            { name: "Azad Nagar", distanceFromStart: 3.0 },
            { name: "Andheri", distanceFromStart: 5.0 },
            { name: "Ghatkopar", distanceFromStart: 11.4 },
        ],
    },
    {
        line: "Line 2A",
        stations: [
            { name: "Dahisar East", distanceFromStart: 0 },
            { name: "Anand Nagar", distanceFromStart: 2.0 },
            { name: "Borivali West", distanceFromStart: 5.0 },
        ],
    },
];

const Dashboard = () => {
    const [selectedLine, setSelectedLine] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [price, setPrice] = useState(0);
    const [stations, setStations] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }
        if (selectedLine) {
            const lineData = metroData.find(line => line.line === selectedLine);
            setStations(lineData ? lineData.stations : []);
        } else {
            setStations([]);
        }
    }, [selectedLine]);

    const calculatePrice = () => {
        const sourceStation = stations.find(station => station.name === source);
        const destinationStation = stations.find(station => station.name === destination);

        if (sourceStation && destinationStation) {
            const distance = Math.abs(destinationStation.distanceFromStart - sourceStation.distanceFromStart);
            setPrice(distance * 10); // ₹10 per km
            setError('');
        } else {
            setPrice(0);
            setError('Please select valid source and destination stations.');
        }
    };

    const handlePayment = async () => {
        if (!source || !destination || price === 0) {
            setError('Complete all fields and calculate the price before proceeding.');
            return;
        }
        try {
            const paymentData = { source, destination, price };
            const response = await initiatePayment(paymentData);
            setSuccess(`Payment successful! Ticket Token: ${response.data.ticket.token}`);
            setError('');
            setSelectedLine('');
            setSource('');
            setDestination('');
            setPrice(0);
        } catch (err) {
            setError('An error occurred during payment. Please try again.');
            console.error(err);
        }
    };

    return (
        <>
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Metro Ticket Booking</h1>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Line:</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={selectedLine}
                    onChange={(e) => setSelectedLine(e.target.value)}
                >
                    <option value="">Select Line</option>
                    {metroData.map((line) => (
                        <option key={line.line} value={line.line}>
                            {line.line}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Source:</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    disabled={!stations.length}
                >
                    <option value="">Select Source</option>
                    {stations.map((station) => (
                        <option key={station.name} value={station.name}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Destination:</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    disabled={!stations.length}
                >
                    <option value="">Select Destination</option>
                    {stations.map((station) => (
                        <option key={station.name} value={station.name}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4"
                onClick={calculatePrice}
            >
                Calculate Price
            </button>

            {price > 0 && <p className="text-xl text-green-600 mb-4">Price: ₹{price}</p>}

            <button
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                onClick={handlePayment}
            >
                Proceed to Payment
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {success && <p className="mt-4 text-green-500">{success}</p>}

        </div>
            <div className="mt-6 flex justify-center">
                <MyTickets />
            </div>
        </>
    );
};

export default Dashboard;




