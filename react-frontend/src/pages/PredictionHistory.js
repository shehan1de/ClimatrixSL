import axios from "axios";
import { useEffect, useState } from "react";

function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/predictions"
      );
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to load history", error);
      alert("Unable to load prediction history");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto" }}>
      <h1>Prediction History</h1>

      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No prediction history available</p>
      ) : (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>City</th>
              <th>Parameter</th>
              <th>Timeframe</th>
              <th>Min / Max</th>
              <th>Value</th>
              <th>Risk</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.city}</td>
                <td>{item.parameter}</td>
                <td>{item.timeframe}</td>
                <td>{item.min_or_max}</td>
                <td>{item.predicted_value}</td>
                <td>{item.disaster_risk}</td>
                <td>{item.forecast_message}</td>
                <td>
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PredictionHistory;
