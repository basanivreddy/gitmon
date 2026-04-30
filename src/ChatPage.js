import React, { useState } from "react";
import "./ChatPage.css";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    // (Temporary bot reply for now)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a sample AI reply 🤖", sender: "bot" }
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">AI Gait Assistant 🤖</div>

      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`msg-row ${msg.sender}`}>
            <div className="message">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
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