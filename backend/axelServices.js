import axios from "axios";

// Route summary using OpenRouteService (driving-car)
// origin/destination: { lat, lng }
export async function getRouteSummary(origin, destination) {
  const url = "https://api.openrouteservice.org/v2/directions/driving-car";
  const body = { coordinates: [[origin.lng, origin.lat], [destination.lng, destination.lat]] };

  const { data } = await axios.post(url, body, {
    headers: {
      Authorization: process.env.ORS_API_KEY,
      "Content-Type": "application/json"
    }
  });

  const feat = data.features?.[0];
  const sum = feat?.properties?.summary;
  return {
    distance_miles: sum ? (sum.distance / 1609.34) : null,
    duration_minutes: sum ? (sum.duration / 60) : null
  };
}

// Weather using OpenWeatherMap
export async function getWeather(lat, lon) {
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { lat, lon, appid: process.env.OWM_API_KEY, units: "imperial" }
  });
  return {
    city: data?.name || "unknown",
    temp_f: data?.main?.temp ?? null,
    wind_mph: data?.wind?.speed ?? null,
    conditions: data?.weather?.[0]?.description ?? "unknown"
  };
}

// Nearby rest areas & fuel via Overpass (OpenStreetMap)
export async function getNearbyStops(lat, lon) {
  const overpass = "https://overpass-api.de/api/interpreter";
  const query = `
[out:json][timeout:25];
(
  node(around:50000,${lat},${lon})[amenity=rest_area];
  node(around:50000,${lat},${lon})[amenity=fuel];
);
out center 20;`;
  const { data } = await axios.post(overpass, query, { headers: { "Content-Type": "text/plain" } });

  const items = (data?.elements || []).map(e => ({
    id: e.id,
    name: e.tags?.name || (e.tags?.amenity === "fuel" ? "Fuel station" : "Rest area"),
    amenity: e.tags?.amenity,
    lat: e.lat,
    lon: e.lon
  }));
  return items.slice(0, 20);
      }
