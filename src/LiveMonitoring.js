import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { useNavigate } from "react-router-dom";
import "./LiveMonitoring.css";

function LiveMonitoring() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [isStarted, setIsStarted] = useState(false);
  const [lastSpoken, setLastSpoken] = useState("");
  const [lastSpokenTime, setLastSpokenTime] = useState(0);

  // 🔊 Text to Speech
  function speak(message) {
    if (!("speechSynthesis" in window)) {
      console.log("Speech not supported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // 📐 Angle calculation
  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);

    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

  useEffect(() => {
    if (!isStarted) return;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        drawConnectors(
          canvasCtx,
          results.poseLandmarks,
          Pose.POSE_CONNECTIONS
        );
        drawLandmarks(canvasCtx, results.poseLandmarks);

        const lm = results.poseLandmarks;

        const leftShoulder = lm[11];
        const rightShoulder = lm[12];
        const leftHip = lm[23];
        const rightHip = lm[24];
        const leftKnee = lm[25];
        const rightKnee = lm[26];
        const leftAnkle = lm[27];
        const rightAnkle = lm[28];
        const nose = lm[0];

        const spineAngle = calculateAngle(
          leftShoulder,
          leftHip,
          leftKnee
        );

        const leftKneeAngle = calculateAngle(
          leftHip,
          leftKnee,
          leftAnkle
        );

        const rightKneeAngle = calculateAngle(
          rightHip,
          rightKnee,
          rightAnkle
        );

        let insights = [];

        // Spine posture
        if (spineAngle < 165) {
          insights.push("Keep your spine straight");
        }

        // Shoulder balance
        if (Math.abs(leftShoulder.y - rightShoulder.y) > 0.04) {
          insights.push("Balance your shoulders");
        }

        // Knee bending
        if (leftKneeAngle < 160 || rightKneeAngle < 160) {
          insights.push("Avoid excessive knee bending");
        }

        // Forward leaning
        if (nose.y > leftShoulder.y) {
          insights.push("Raise your chest and look forward");
        }

        // Hip alignment
        if (Math.abs(leftHip.y - rightHip.y) > 0.05) {
          insights.push("Level your hips while walking");
        }

        // Stride length
        if (Math.abs(leftAnkle.x - rightAnkle.x) > 0.3) {
          insights.push("Reduce your stride length slightly");
        }

        // Symmetry
        if (Math.abs(leftKneeAngle - rightKneeAngle) > 20) {
          insights.push("Try to walk more symmetrically");
        }

        // Head alignment
        if (Math.abs(nose.x - leftShoulder.x) > 0.1) {
          insights.push("Keep your head aligned with your body");
        }

        if (insights.length === 0) {
          insights.push(
            "Excellent posture. Keep walking confidently"
          );
        }

        const message = insights[0];
        const now = Date.now();

        if (
          message !== lastSpoken &&
          now - lastSpokenTime > 3000
        ) {
          speak(message);
          setLastSpoken(message);
          setLastSpokenTime(now);
        }
      }

      canvasCtx.restore();
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [isStarted, lastSpoken, lastSpokenTime]);

  return (
    <div className="live-container">
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>

      <h2>Live AI Gait Monitoring 🎥</h2>

      {!isStarted ? (
        <button
          className="start-btn"
          onClick={() => {
            speak("Live gait monitoring started");
            setIsStarted(true);
          }}
        >
          Start AI Monitoring
        </button>
      ) : (
        <div className="video-wrapper">
          <video ref={videoRef} className="input-video" />
          <canvas
            ref={canvasRef}
            className="output-canvas"
            width="640"
            height="480"
          />
        </div>
      )}
    </div>
  );
}

export default LiveMonitoring;
