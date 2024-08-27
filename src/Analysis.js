import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProtocolCountChart from './charts/ProtocolCountChart';
import IPCountChart from './charts/IPCountChart';
import TCPFlagsChart from './charts/TCPFlagsChart';

function Analysis() {
  const [analysisData, setAnalysisData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get('http://localhost:5000/analyze');
      setAnalysisData(response.data);
      console.log("Response : ", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Analysis</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Protocol Count</h2>
          <pre>{JSON.stringify(analysisData.protocol_count, null, 2)}</pre>

          <h2>Source IP Count</h2>
          <pre>{JSON.stringify(analysisData.src_ip_count, null, 2)}</pre>

          <h2>Destination IP Count</h2>
          <pre>{JSON.stringify(analysisData.dst_ip_count, null, 2)}</pre>

          <h2>Unique IPs</h2>
          <pre>{JSON.stringify(analysisData.unique_ips, null, 2)}</pre>

          <h2>TCP Flags</h2>
          <pre>{JSON.stringify(analysisData.tcp_flags, null, 2)}</pre>

          {/* Add charts or other visualizations here */}
          <div>
          <ProtocolCountChart data={analysisData} />
          <IPCountChart data={analysisData.src_ip_count} title="Source IP Count" />
          <IPCountChart data={analysisData.dst_ip_count} title="Destination IP Count" />
          <TCPFlagsChart data={analysisData} />
        </div>
        </div>
      )}
    </div>
  );
}

export default Analysis;
