import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppForecast from "./pages/AppForecast";
import PredictionHistory from "./pages/PredictionHistory";

function App() {
  return (
    <Router>
      <nav style={{ padding: 15, background: "#f2f2f2" }}>
        <Link to="/" style={{ marginRight: 20 }}>
          Forecast
        </Link>
        <Link to="/history">
          Prediction History
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<AppForecast />} />
        <Route path="/history" element={<PredictionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
