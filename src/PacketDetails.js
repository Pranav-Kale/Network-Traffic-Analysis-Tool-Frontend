import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PacketDetails() {
  const { id } = useParams();
  console.log("id : ",id)
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
        console.log("Packets:", response?.data?.packets);
    } catch (error) {
      console.error("Error fetching packet details:", error);
      setError("Error fetching packet details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Packet Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(packet, null, 2)}</pre>
      )}
    </div>
  );
}

export default PacketDetails;






