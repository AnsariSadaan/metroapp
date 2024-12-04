import React, { useState, useEffect } from 'react';
import { initiatePayment } from '../api.js'; // Assuming this is where your API functions are defined
import Logout from './Logout.jsx';

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
    const token = localStorage.getItem('token');
    useEffect(() => {
        if(!token){
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
            const price = distance * 10; // e.g: ₹10 per km
            setPrice(price);
        } else {
            setPrice(0);
        }
    };

    const handlePayment = async () => {
        if (!source || !destination || price === 0) {
            alert('Please select valid source, destination, and calculate the price before proceeding.');
            return;
        }
        try {
            const paymentData = {
                source,
                destination,
                price,
            };
            const response = await initiatePayment(paymentData);
            console.log(response.data);
            alert(`Payment successful! Your ticket token: ${response.data.ticket.token}`);
        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred while processing the payment.');
        }
    };

    return (
        <div>
            <h1>Metro Ticket Booking</h1>

            <div>
                <label>Line:</label>
                <select onChange={(e) => setSelectedLine(e.target.value)} value={selectedLine}>
                    <option value="">Select Line</option>
                    {metroData.map((line) => (
                        <option key={line.line} value={line.line}>
                            {line.line}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Source:</label>
                <select onChange={(e) => setSource(e.target.value)} value={source}>
                    <option value="">Select Source</option>
                    {stations.map((station) => (
                        <option key={station.name} value={station.name}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Destination:</label>
                <select onChange={(e) => setDestination(e.target.value)} value={destination}>
                    <option value="">Select Destination</option>
                    {stations.map((station) => (
                        <option key={station.name} value={station.name}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={calculatePrice}>Calculate Price</button>

            {price > 0 && <p>Price: ₹{price}</p>}

            <button onClick={handlePayment}>Proceed to Payment</button>

            <div>
                <button> <Logout/></button>
            </div>
        </div>
    );
};

export default Dashboard;
