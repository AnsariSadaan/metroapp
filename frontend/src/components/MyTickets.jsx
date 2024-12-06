import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQrcode from "react-qr-code";
// import { initiatePayment } from '../api';
const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/my-ticket",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.tickets) {
          setTickets(response.data.tickets);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch tickets");
      }
    };

    fetchTickets();
  }, [navigate]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">My Booked Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">You have no booked tickets.</p>
      ) : (
        <div className="">
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketToken}
              className="mb-4 p-4 border-l-4 border-indigo-400 bg-gray-100 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {ticket.source} → {ticket.destination}
              </h2>
              <p className="text-gray-600">Price: ₹{ticket.price}</p>
              <p className="text-gray-500">
                Ticket Token: {ticket.ticketToken}
              </p>
              <p className="text-gray-500">Status: {ticket.status}</p>
              <p className="text-sm text-gray-400">
                Date: {new Date(ticket.issuedAt).toDateString()}
              </p>
              <div className="flex justify-center">
                <p>
                  <ReactQrcode
                    className="size-40"
                    value={JSON.stringify(ticket)}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
