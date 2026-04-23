import React, { useEffect, useRef, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { useNavigate } from "react-router-dom";
import "./LiveMonitoring.css";

function LiveMonitoring() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [isStarted, setIsStarted] = useState(false);

  // ✅ FIX: useRef instead of state (no re-render, no warning)
  const lastSpokenRef = useRef("");
  const lastSpokenTimeRef = useRef(0);

  // 🔊 Text to Speech
  function speak(message) {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(message);
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
    if (!isStarted || !videoRef.current || !canvasRef.current) return;

    let camera;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!canvasRef.current) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;

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
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS);
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

        const spineAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
        const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
        const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

        let insights = [];

        if (spineAngle < 165) insights.push("Keep your spine straight");

        if (Math.abs(leftShoulder.y - rightShoulder.y) > 0.04)
          insights.push("Balance your shoulders");

        if (leftKneeAngle < 160 || rightKneeAngle < 160)
          insights.push("Avoid excessive knee bending");

        if (nose.y > leftShoulder.y)
          insights.push("Raise your chest and look forward");

        if (Math.abs(leftHip.y - rightHip.y) > 0.05)
          insights.push("Level your hips");

        if (Math.abs(leftAnkle.x - rightAnkle.x) > 0.3)
          insights.push("Reduce stride length");

        if (Math.abs(leftKneeAngle - rightKneeAngle) > 20)
          insights.push("Walk more symmetrically");

        if (Math.abs(nose.x - leftShoulder.x) > 0.1)
          insights.push("Keep your head aligned");

        if (insights.length === 0)
          insights.push("Excellent posture. Keep walking");

        const message = insights[0];
        const now = Date.now();

        // ✅ FIXED: using refs instead of state
        if (
          message !== lastSpokenRef.current &&
          now - lastSpokenTimeRef.current > 3000
        ) {
          speak(message);
          lastSpokenRef.current = message;
          lastSpokenTimeRef.current = now;
        }
      }
    });

    camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      if (camera) camera.stop();
      pose.close();
    };
  }, [isStarted]);

  return (
    <div className="live-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <h2>Live AI Gait Monitoring 🎥</h2>

      {!isStarted ? (
        <button
          className="start-btn"
          onClick={() => {
            speak("Live monitoring started");
            setIsStarted(true);
          }}
        >
          Start Monitoring
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