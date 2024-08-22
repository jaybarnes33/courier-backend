import axios from "axios";

export const getDistance = async (start: string, end: string) => {
  const apiKey = process.env.MAPS_KEY;

  const mode = "driving"; // Travel mode: driving, walking, transit, bicycling

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start}&destinations=${end}&mode=${mode}&key=${apiKey}`;
  const cords = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=${mode}&key=${apiKey}`;
  const { data } = await axios.get(url);
  const { data: coords } = await axios.get(cords);

  try {
    if (data.status === "OK") {
      const distanceText = data.rows[0].elements[0].distance.text; // Distance in human-readable text
      const durationText = data.rows[0].elements[0].duration.text; // Duration in human-readable text
      const distanceValue = data.rows[0].elements[0].distance.value; // Distance in meters
      const durationValue = data.rows[0].elements[0].duration.value; // Duration in seconds
      const base = 7;
      const dbc = (distanceValue / 1000) * 5;
      const tbc = (durationValue / (60 * 60)) * 1.5;
      const charges = 2;
      const cost = dbc + tbc + charges;

      const routes = coords.routes;
      if (routes && routes.length) {
        const route = routes[0];
        const polylinePoints = route.overview_polyline.points;

        // You can now use the distance and duration values for further processing.
        return {
          distance: distanceText,
          duration: durationText,
          start: start,
          end: end,
          cost: cost < base ? base : cost > 100 ? 70 : cost.toFixed(2),
        };
      }
    } else {
      console.error("Error:", data.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
