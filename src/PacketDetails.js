import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PacketDetails() {
  const { id } = useParams();
  const [packet, setPacket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPacketDetails();
  }, [id]);

  const fetchPacketDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/get-live-packets');
      setPacket(response.data.packets[id]);
    } catch (error) {
      console.error("Error fetching packet details:", error);
      setError("Error fetching packet details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Packet Details</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-gray-700 overflow-x-auto">
          {JSON.stringify(packet, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default PacketDetails;
