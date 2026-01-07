import axios from "axios";
import { useState } from "react";

function AppForecast() {
  const [city, setCity] = useState("Colombo");
  const [parameter, setParameter] = useState("rain_sum");
  const [timeframe, setTimeframe] = useState("week");
  const [minOrMax, setMinOrMax] = useState("max");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = [
    "Athurugiriya","Badulla","Bentota","Colombo","Galle","Gampaha",
    "Hambantota","Hatton","Jaffna","Kalmunai","Kalutara","Kandy",
    "Kesbewa","Kolonnawa","Kurunegala","Mabole","Maharagama","Mannar",
    "Matale","Matara","Moratuwa","Mount Lavinia","Negombo","Oruwala",
    "Pothuhera","Puttalam","Ratnapura","Sri Jayewardenepura Kotte",
    "Trincomalee","Weligama"
  ];

  const parameterNames = {
    rain_sum: "Rainfall",
    windspeed_10m_max: "Wind Speed",
    windgusts_10m_max: "Wind Gusts"
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        city,
        parameter,
        timeframe,
        min_or_max: minOrMax
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>ClimatrixSL Weather Forecast</h1>

      {/* City */}
      <div>
        <label>City: </label>
        <select value={city} onChange={e => setCity(e.target.value)}>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Parameter */}
      <div>
        <label>Parameter: </label>
        <select value={parameter} onChange={e => setParameter(e.target.value)}>
          {Object.keys(parameterNames).map(p => (
            <option key={p} value={p}>{parameterNames[p]}</option>
          ))}
        </select>
      </div>

      {/* Timeframe */}
      <div>
        <label>Timeframe: </label>
        <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      {/* Min / Max */}
      <div>
        <label>Min / Max: </label>
        <select value={minOrMax} onChange={e => setMinOrMax(e.target.value)}>
          <option value="min">Minimum</option>
          <option value="max">Maximum</option>
        </select>
      </div>

      <br />

      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>{result.city} – {result.parameter}</h3>
          <p><strong>Forecast:</strong> {result.forecast_message}</p>
          <p><strong>Risk Level:</strong> {result.disaster_risk}</p>

          {result.forecast_plot && (
            <img
              src={`data:image/png;base64,${result.forecast_plot}`}
              alt="Forecast plot"
              style={{ maxWidth: "100%", marginTop: 10 }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AppForecast;
