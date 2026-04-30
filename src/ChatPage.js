import React, { useState } from "react";
import "./ChatPage.css";


function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId"); // or from login

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  message: currentInput,
  userId: userId
})
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply, sender: "bot" }
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to AI 😢", sender: "bot" }
      ]);
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-header">AI Gait Assistant 🤖</div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`msg-row ${msg.sender}`}>
            <div className="message">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask about your gait..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default ChatPage;