const API = "YOUR_BACKEND_URL"; // same as above

// Axel chat
const msgsA = document.getElementById("msgs-axel");
function addA(text, me=false){
  const div = document.createElement("div");
  div.className = "msg " + (me ? "me" : "bot");
  div.textContent = text;
  msgsA.appendChild(div);
  msgsA.scrollTop = msgsA.scrollHeight;
}
document.getElementById("send-axel").onclick = async () => {
  const i = document.getElementById("text-axel");
  const val = i.value.trim();
  if (!val) return;
  addA(val, true); i.value = "";
  try {
    const res = await fetch(`${API}/api/axel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val })
    });
    const data = await res.json();
    addA(data.reply, false);
  } catch (e) {
    addA("Error: cannot reach ops right now.", false);
  }
};
document.getElementById("text-axel").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("send-axel").click();
});

// Ops widgets
document.getElementById("btn-route").onclick = async () => {
  const olat = parseFloat(document.getElementById("o-lat").value);
  const olng = parseFloat(document.getElementById("o-lng").value);
  const dlat = parseFloat(document.getElementById("d-lat").value);
  const dlng = parseFloat(document.getElementById("d-lng").value);
  const res = await fetch(`${API}/api/axel/route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin: { lat: olat, lng: olng }, destination: { lat: dlat, lng: dlng } })
  });
  const data = await res.json();
  document.getElementById("route").textContent =
    data.distance_miles ? `Distance: ${data.distance_miles.toFixed(1)} mi  •  ETA: ${data.duration_minutes.toFixed(0)} min`
                        : "No route found.";
};

document.getElementById("btn-weather").onclick = async () => {
  const olat = document.getElementById("o-lat").value;
  const olng = document.getElementById("o-lng").value;
  const res = await fetch(`${API}/api/axel/weather?lat=${olat}&lon=${olng}`);
  const w = await res.json();
  document.getElementById("weather").textContent =
    w.temp_f ? `Weather @ ${w.city}: ${w.temp_f}°F, ${w.conditions}, wind ${w.wind_mph} mph` : "Weather unavailable.";
};

document.getElementById("btn-stops").onclick = async () => {
  const olat = document.getElementById("o-lat").value;
  const olng = document.getElementById("o-lng").value;
  const res = await fetch(`${API}/api/axel/reststops?lat=${olat}&lon=${olng}`);
  const data = await res.json();
  const list = document.getElementById("stops");
  list.innerHTML = "";
  (data.stops || []).forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} (${s.amenity}) – ${s.lat.toFixed(3)}, ${s.lon.toFixed(3)}`;
    list.appendChild(li);
  });
};
