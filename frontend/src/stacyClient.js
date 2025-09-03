const API = "YOUR_BACKEND_URL"; // e.g. https://haulnation-backend.onrender.com

// Tabs hookup
const tabs = { stacy: "tab-stacy", axel: "tab-axel" };
const panes = { stacy: "pane-stacy", axel: "pane-axel" };
Object.keys(tabs).forEach(k => {
  document.getElementById(tabs[k]).onclick = () => {
    Object.values(tabs).forEach(id => document.getElementById(id).classList.remove("active"));
    Object.values(panes).forEach(id => document.getElementById(id).classList.remove("active"));
    document.getElementById(tabs[k]).classList.add("active");
    document.getElementById(panes[k]).classList.add("active");
  };
});

// Stacy chat
const msgsS = document.getElementById("msgs-stacy");
function addS(text, me=false){
  const div = document.createElement("div");
  div.className = "msg " + (me ? "me" : "bot");
  div.textContent = text;
  msgsS.appendChild(div);
  msgsS.scrollTop = msgsS.scrollHeight;
}
document.getElementById("send-stacy").onclick = async () => {
  const i = document.getElementById("text-stacy");
  const val = i.value.trim();
  if (!val) return;
  addS(val, true); i.value = "";
  try {
    const res = await fetch(`${API}/api/stacy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val })
    });
    const data = await res.json();
    addS(data.reply, false);
  } catch (e) {
    addS("Error: cannot reach dispatch right now.", false);
  }
};
document.getElementById("text-stacy").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("send-stacy").click();
});
