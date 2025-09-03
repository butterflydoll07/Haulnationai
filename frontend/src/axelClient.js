import React, { useState } from "react";

export default function AxelChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    const res = await fetch("/api/axel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...messages, { sender: "user", text: input }, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Axel (Ops)</h2>
      <div style={{ height: "300px", overflowY: "auto", background: "#eee", padding: "1rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "user" ? "right" : "left" }}>
            {m.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={send}>Send</button>
    </div>
  );
  }
