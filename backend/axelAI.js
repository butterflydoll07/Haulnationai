// Axel = Operations (route, traffic, weather, rest/fuel)
export class AxelAI {
  reply(text) {
    const t = (text || "").toLowerCase();
    if (/\b(route|detour|traffic|weather|mileage|eta)\b/.test(t))
      return "Axel: Share current location & destination (coords or city/state) and I’ll compute distance & ETA.";
    if (/\b(rest stop|fuel|shower|sleep)\b/.test(t))
      return "Axel: I’ll look for nearby rest areas & fuel. Share a location (coords or city/state).";
    return "Axel: How can I assist with operations?";
  }
}
