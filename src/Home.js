import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [packets, setPackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSniffing, setIsSniffing] = useState(false);

  useEffect(() => {
    fetchPackets();
  }, []);

  const fetchPackets = async () => {
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/get-live-packets"
      );
      setPackets(response?.data?.packets);
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
      await axios.post("http://localhost:5000/start-sniffing");
      fetchPackets();
      setIsSniffing(true);
    } catch (error) {
      console.error("Error starting sniffing:", error);
      setError("Error starting sniffing. Please try again later.");
    }
  };

  const startAnalyzing = async () => {
    try {
      await axios.post("http://localhost:5000/start-analysis");
      fetchPackets();
    } catch (error) {
      console.error("Error starting analyzing:", error);
      setError("Error starting analyzing. Please try again later.");
    }
  };

  const stopSniffing = async () => {
    console.log("Stop sniffing clicked");
    try {
      await axios.post("http://localhost:5000/stop-sniffing");
      setIsSniffing(false);
      fetchPackets();
    } catch (error) {
      console.error("Error stopping sniffing:", error);
      setError("Error stopping sniffing. Please try again later.");
    }
  };

  const refreshPackets = () => {
    fetchPackets(); // Refresh packets when the button is clicked
  };

  const downloadAsText = () => {
    if (!packets || packets.length === 0) {
      alert("No data available to download.");
      return;
    }
    const textContent = packets
      .map(
        (packet) =>
          `Type: ${packet?.type || "N/A"}\n` +
          `Source IP: ${packet?.source_ip || "N/A"}\n` +
          `Destination IP: ${packet?.destination_ip || "N/A"}\n` +
          `Timestamp: ${packet?.timestamp || "N/A"}\n` +
          `Flags: ${packet?.flags || "N/A"}\n` +
          `Payload: ${packet?.payload || "N/A"}\n` +
          `Additional Info: ${packet?.additional_info || "N/A"}\n` +
          `-----------------------------------\n`
      )
      .join("");
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "packets.txt";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const downloadAsCSV = () => {
    if (!packets || packets.length === 0) {
      alert("No data available to download.");
      return;
    }
    const header =
      "Type,Source IP,Destination IP,Timestamp,Flags,Payload,Additional Info\n";
    const rows = packets
      .map(
        (packet) =>
          `"${packet?.type || ""}","${packet?.source_ip || ""}","${
            packet?.destination_ip || ""
          }","${packet?.timestamp || ""}","${packet?.flags || ""}","${
            packet?.payload || ""
          }","${packet?.additional_info || ""}"`
      )
      .join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "packets.csv";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const downloadAsJSON = () => {
    if (!packets || packets.length === 0) {
      alert("No data available to download.");
      return;
    }

    const jsonContent = JSON.stringify(packets, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "packets.json";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // or use toLocaleDateString() and toLocaleTimeString() for custom formatting
  };

  return (
    <div className="container mx-auto py-4 px-[12.5%]">
      <div className="container mx-auto py-4 ">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 shadow-md">
          <h2 className="font-semibold text-xl mb-2">Instructions</h2>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              Click the{" "}
              <span className="inline-block bg-blue-500 text-white font-bold py-1 px-2 rounded">
                Start
              </span>{" "}
              button to begin packet sniffing.
            </li>
            <li>
              After starting, click the{" "}
              <span className="inline-block bg-yellow-500 text-white font-bold py-1 px-2 rounded">
                Refresh
              </span>{" "}
              button to load the packets.
            </li>
            <li>
              Once sniffing has stopped, click the{" "}
              <span className="inline-block bg-teal-500 text-white font-bold py-1 px-2 rounded">
                Analysis
              </span>{" "}
              button to view detailed analysis.
            </li>
          </ul>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Packet Details</h1>
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2  items-center">
          <button
            onClick={startSniffing}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isSniffing ? "Sniffing..." : "Start Sniffing"}
          </button>
          <button
            onClick={stopSniffing}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Stop Sniffing
          </button>
          <button
            onClick={refreshPackets}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Refresh
          </button>
        </div>
        <div>
          <Link to={isSniffing ? "#" : "/analysis"}>
            <button
              onClick={isSniffing ? null : startAnalyzing}
              className={`bg-teal-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                isSniffing
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-teal-600"
              }`}
              disabled={isSniffing} // Disable the button if sniffing is active
            >
              Analysis
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <p className="font-semibold text-lg">Download as : </p>
          <button
            onClick={downloadAsText}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Text
          </button>
          <button
            onClick={downloadAsCSV}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            CSV
          </button>
          <button
            onClick={downloadAsJSON}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            JSON
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 px-4 text-left text-gray-700">#</th>
                <th className="py-2 px-4 text-left text-gray-700">Type</th>
                <th className="py-2 px-4 text-left text-gray-700">Source IP</th>
                <th className="py-2 px-4 text-left text-gray-700">
                  Destination IP
                </th>
                <th className="py-2 px-4 text-left text-gray-700">Timestamp</th>
                <th className="py-2 px-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packets?.map((packet, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4">{index}</td>
                  <td className="py-2 px-4">{packet?.type}</td>
                  <td className="py-2 px-4">{packet?.source_ip}</td>
                  <td className="py-2 px-4">{packet?.destination_ip}</td>
                  <td className="py-2 px-4">
                    {formatTimestamp(packet?.timestamp)}
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/packet-details/${index}`}>
                      <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        More Info
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
