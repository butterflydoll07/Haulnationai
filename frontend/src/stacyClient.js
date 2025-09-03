// frontend/src/stacyClient.js
// Stacy client code with backend API already set to your Render deployment

const API = "https://haulnationai.onrender.com";  // ✅ Your live backend

export async function sendStacyMessage(message) {
  try {
    const res = await fetch(`${API}/api/stacy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`Stacy API error: ${res.status}`);
    }

    const data = await res.json();
    return data.response || "Sorry, I didn’t understand that.";
  } catch (err) {
    console.error(err);
    return "⚠️ Unable to reach Stacy right now. Please try again later.";
  }
}
