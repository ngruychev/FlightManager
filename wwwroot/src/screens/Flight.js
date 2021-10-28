import { html, redirectPage, useStore } from "../../vendor/js/bundle.js";
import FlightCard from "../components/Flight.js";
import { flights } from "../stores/flights.js";
import { router } from "../stores/router.js";

export default function Flight({ id }) {
  const fs = useStore(flights);
  const f = fs.find((f) => f.id === id);
  if (!f) {
    redirectPage(router, "404");
    return;
  }
  return html`<${FlightCard} flight=${f} detailed/>`;
}
