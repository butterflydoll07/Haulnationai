export class StacyAI {
  reply(text) {
    const t = text.toLowerCase();
    if (/quote|load|driver|dispatch/.test(t))
      return "Stacy: I can help with dispatch. Share pickup, dropoff, and load details.";
    if (/dispute|problem|complaint/.test(t))
      return "Stacy: Logging this issue. Escalating if needed.";
    return "Stacy: How can I help with dispatch today?";
  }
}
