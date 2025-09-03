// frontend/src/axelClient.js
// Axel client code with backend API already set to your Render deployment

const API = "https://haulnationai.onrender.com";  // ✅ Your live backend

// Get routing info (distance + ETA)
export async function getRoute(origin, destination) {
  try {
    const res = await fetch(`${API}/api/axel/route`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination }),
    });

    if (!res.ok) {
      throw new Error(`Axel API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: "⚠️ Unable to get route right now." };
  }
}

// Get weather at location
export async function getWeather(lat, lon) {
  try {
    const res = await fetch(`${API}/api/axel/weather?lat=${lat}&lon=${lon}`);
    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: "⚠️ Unable to fetch weather." };
  }
}

// Get nearby rest stops
export async function getRestStops(lat, lon) {
  try {
    const res = await fetch(`${API}/api/axel/reststops?lat=${lat}&lon=${lon}`);
    if (!res.ok) {
      throw new Error(`Rest Stop API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: "⚠️ Unable to fetch rest stops." };
  }
}
