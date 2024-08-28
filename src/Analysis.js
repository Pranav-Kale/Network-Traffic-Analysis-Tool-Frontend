import React, { useState, useEffect } from "react";
import axios from "axios";
import ProtocolCountChart from "./charts/ProtocolCountChart";
import IPCountChart from "./charts/IPCountChart";
import TCPFlagsChart from "./charts/TCPFlagsChart";

function Analysis() {
  const [analysisData, setAnalysisData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(fetchAnalysis, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchAnalysis = async () => {
    console.log("Fetching analysis data...");
    try {
      const response = await axios.get(
        "http://localhost:5000/get-analysis-data"
      );
      const data = response?.data;

      if (data?.status === "Success" && data?.analysis) {
        const analysisData = data?.analysis;
        setAnalysisData(analysisData);
        setLoading(false);
        console.log("Analysis data received: ", analysisData);
      } else {
        console.warn("Analysis data not yet available.");
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
  };

  return (
    <div className="container mx-auto px-[12.5%] py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-600">
        Network Traffic Analysis
      </h1>
      {loading ? (
        <p className="text-center text-xl text-gray-700 animate-pulse">
        Loading... Please wait, this might take 10 - 20 seconds.
      </p>
      
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mb-12">
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Source IP Count
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(analysisData?.src_ip_count, null, 2)}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Destination IP Count
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(analysisData?.dst_ip_count, null, 2)}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Protocol Count
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(analysisData?.protocol_count, null, 2)}
              </pre>
            </div>
            
            <div className=" bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                TCP Flags
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(analysisData?.tcp_flags, null, 2)}
              </pre>
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Unique IPs
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(analysisData?.unique_ips, null, 2)}
              </pre>
            </div>
          </div>

          {analysisData?.src_ip_count &&
          Object.keys(analysisData.src_ip_count).length > 0 ? (
            <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <ProtocolCountChart data={analysisData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <IPCountChart
                  data={analysisData?.src_ip_count}
                  title="Source IP Count"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <IPCountChart
                  data={analysisData?.dst_ip_count}
                  title="Destination IP Count"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <TCPFlagsChart data={analysisData} />
              </div>
            </div>
          ) : (
            <p className="text-center text-lg text-gray-600">No data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Analysis;
