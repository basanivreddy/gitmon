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
    console.log("Analyze clicked");
    const userId = localStorage.getItem("userId"); // 👈 ADD THIS


    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/progress?start=${startDate}&end=${endDate}&userId=${userId}`
      );

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        alert("No data found in selected range");
        setProgressData([]);
        setInsight("");
        return;
      }

      setProgressData(data);

      if (data.length > 1) {
        const first = data[0].gaitScore || 0;
        const last = data[data.length - 1].gaitScore || 0;

        if (first === 0) {
          setInsight("Not enough data to calculate improvement.");
          return;
        }

        const improvement = ((last - first) / first) * 100;

        if (improvement > 0) {
          setInsight(
            `Your gait improved by ${improvement.toFixed(
              1
            )}% during this period. Keep progressing!`
          );
        } else if (improvement < 0) {
          setInsight(
            "Your gait performance declined slightly. Focus on posture correction."
          );
        } else {
          setInsight("No major change detected in this period.");
        }
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const chartData = {
    labels: progressData.map((item) => item.date),
    datasets: [
      {
        label: "Gait Score",
        data: progressData.map((item) => item.gaitScore),
        borderColor: "#667eea",
        backgroundColor: "rgba(102,126,234,0.2)",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="progress-container">
      <h2>AI Check Your Progress 📈</h2>

      <div className="date-selector">
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="analyze-btn"
          onClick={handleAnalyze}
        >
          Analyze Progress
        </button>
      </div>

      {progressData.length > 0 && (
        <div className="chart-section">
          <Line data={chartData} />
        </div>
      )}

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
