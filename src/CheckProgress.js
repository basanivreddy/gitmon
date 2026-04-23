import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import "./CheckProgress.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function CheckProgress() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [insight, setInsight] = useState("");

  const handleAnalyze = async () => {
    const userId = localStorage.getItem("userId");

    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    try {
      const res = await fetch(
        `https://gaitmon.onrender.com/progress?start=${startDate}&end=${endDate}&userId=${userId}`
      );

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        alert("No data found");
        setProgressData([]);
        setInsight("");
        return;
      }

      setProgressData(data);

      const first = data[0].gaitData?.gaitScore || 0;
      const last = data[data.length - 1].gaitData?.gaitScore || 0;

      if (first > 0) {
        const improvement = ((last - first) / first) * 100;

        if (improvement > 0) {
          setInsight(`Improved by ${improvement.toFixed(1)}% 🎉`);
        } else if (improvement < 0) {
          setInsight("Slight decline detected ⚠️");
        } else {
          setInsight("No major change detected");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const labels = progressData.map((i) => i.date);
  const latest = progressData[progressData.length - 1]?.gaitData || {};

  return (
    <div className="progress-container">
      <h2>AI Progress Dashboard 📊</h2>

      {/* DATE FILTER */}
      <div className="date-selector">
        <div className="input-group">
          <label>Start</label>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="input-group">
          <label>End</label>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze
        </button>
      </div>

      {/* METRICS */}
      {progressData.length > 0 && (
        <div className="metrics-grid">
          <div className="metric-card">
            <span>Score</span>
            <h3>{latest.gaitScore}</h3>
          </div>
          <div className="metric-card">
            <span>Cadence</span>
            <h3>{latest.cadence}</h3>
          </div>
          <div className="metric-card">
            <span>Step Length</span>
            <h3>{latest.stepLength}</h3>
          </div>
          <div className="metric-card">
            <span>Speed</span>
            <h3>{latest.speed}</h3>
          </div>
        </div>
      )}

      {/* 4 GRAPHS */}
      {progressData.length > 0 && (
        <div className="charts-grid">

          <div className="chart-card">
            <h4>Gait Score</h4>
            <Line
              data={{
                labels,
                datasets: [{
                  label: "Gait Score",
                  data: progressData.map(i => i.gaitData?.gaitScore || 0),
                  borderColor: "#667eea",
                  tension: 0.4
                }]
              }}
            />
          </div>

          <div className="chart-card">
            <h4>Cadence</h4>
            <Line
              data={{
                labels,
                datasets: [{
                  label: "Cadence",
                  data: progressData.map(i => i.gaitData?.cadence || 0),
                  borderColor: "#48bb78",
                  tension: 0.4
                }]
              }}
            />
          </div>

          <div className="chart-card">
            <h4>Step Length</h4>
            <Line
              data={{
                labels,
                datasets: [{
                  label: "Step Length",
                  data: progressData.map(i =>
                    parseFloat(i.gaitData?.stepLength || 0)
                  ),
                  borderColor: "#ed8936",
                  tension: 0.4
                }]
              }}
            />
          </div>

          <div className="chart-card">
            <h4>Speed</h4>
            <Line
              data={{
                labels,
                datasets: [{
                  label: "Speed",
                  data: progressData.map(i =>
                    parseFloat(i.gaitData?.speed || 0)
                  ),
                  borderColor: "#e53e3e",
                  tension: 0.4
                }]
              }}
            />
          </div>

        </div>
      )}

      {/* INSIGHT */}
      {insight && (
        <div className="insight-box">
          <h3>AI Insight</h3>
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
}

export default CheckProgress;