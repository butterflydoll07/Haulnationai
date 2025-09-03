import React, { useState } from "react";
import StacyChat from "./stacyClient";
import AxelChat from "./axelClient";

export default function App() {
  const [active, setActive] = useState("stacy");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", background: "#333" }}>
        <button onClick={() => setActive("stacy")} style={{ flex: 1, color: "#fff" }}>
          Stacy (Dispatch)
        </button>
        <button onClick={() => setActive("axel")} style={{ flex: 1, color: "#fff" }}>
          Axel (Ops)
        </button>
      </div>
      <div style={{ flex: 1 }}>
        {active === "stacy" ? <StacyChat /> : <AxelChat />}
      </div>
    </div>
  );
        }
