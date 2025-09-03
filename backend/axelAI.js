export class AxelAI {
  reply(text) {
    const t = text.toLowerCase();
    if (/route|detour|traffic|weather/.test(t))
      return "Axel: Let’s find a safer route. Please share current location and destination.";
    if (/rest|fuel|shower/.test(t))
      return "Axel: Nearest rest/fuel stop is being calculated...";
    return "Axel: How can I help with operations?";
  }
}
