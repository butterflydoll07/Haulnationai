// Stacy = Dispatch (quotes, loads, driver/customer handling)
export class StacyAI {
  reply(text) {
    const t = (text || "").toLowerCase();
    if (/\b(quote|rate|price|book|load|dispatch|driver|onboard)\b/.test(t))
      return "Stacy: I can help with dispatch & quotes. Please share pickup, dropoff, date/time, weight/notes.";
    if (/\b(dispute|problem|complaint|refund|damage)\b/.test(t))
      return "Stacy: Thanks for reporting—logging this now and escalating if needed.";
    if (/\b(track|eta|shipment|invoice|receipt)\b/.test(t))
      return "Stacy: I can help with tracking & docs. Please share your load #.";
    return "Stacy: Hi! How can I help with dispatch today?";
  }
  shouldEscalate(text) {
    return /\b(connect to a human|human|escalate|urgent|non emergency serious|emergency|911)\b/i.test(text || "");
  }
}
