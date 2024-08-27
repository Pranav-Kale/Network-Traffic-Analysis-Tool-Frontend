import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [packets, setPackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackets();
  }, []);

  const fetchPackets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/get-live-packets');
      setPackets(response.data.packets);
      console.log("Packets:", response?.data?.packets);
    } catch (error) {
      console.error("Error fetching packets:", error);
      setError("Error fetching packets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const startSniffing = async () => {
    try {
      await axios.post('http://localhost:5000/start-sniffing');
      fetchPackets(); // Fetch packets after starting sniffing
    } catch (error) {
      console.error("Error starting sniffing:", error);
      setError("Error starting sniffing. Please try again later.");
    }
  };

  const stopSniffing = async () => {
    try {
      await axios.post('http://localhost:5000/stop-sniffing');
      fetchPackets(); // Optionally, fetch packets after stopping sniffing
    } catch (error) {
      console.error("Error stopping sniffing:", error);
      setError("Error stopping sniffing. Please try again later.");
    }
  };

  const refreshPackets = () => {
    fetchPackets(); // Refresh packets when the button is clicked
  };

  const downloadAsText = () => {
    const textContent = packets.map(packet => 
      `Type: ${packet.type}\nSource IP: ${packet.source_ip}\nDestination IP: ${packet.destination_ip}\nTimestamp: ${packet.timestamp}\n\n`
    ).join('');
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packets.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsCSV = () => {
    const header = 'Type,Source IP,Destination IP,Timestamp\n';
    const rows = packets.map(packet => 
      `${packet.type},${packet.source_ip},${packet.destination_ip},${packet.timestamp}`
    ).join('\n');

    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packets.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsJSON = () => {
    const jsonContent = JSON.stringify(packets, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packets.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Packet Details</h1>
      <button onClick={startSniffing}>Start Sniffing</button>
      <button onClick={stopSniffing}>Stop Sniffing</button>
      <button onClick={refreshPackets}>Refresh</button>
      <button onClick={downloadAsText}>Download as Text</button>
      <button onClick={downloadAsCSV}>Download as CSV</button>
      <button onClick={downloadAsJSON}>Download as JSON</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {packets?.map((packet, index) => (
            <li key={index}>
              <p>{index}</p>
              <strong>Type:</strong> {packet.type} <br />
              <strong>Source IP:</strong> {packet.source_ip} <br />
              <strong>Destination IP:</strong> {packet.destination_ip} <br />
              <strong>Timestamp:</strong> {packet.timestamp} <br />
              <Link to={`/packet-details/${index}`}>
                <button>More Info</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
