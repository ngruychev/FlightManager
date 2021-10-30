import { html, redirectPage, useStore } from "../../vendor/js/bundle.js";
import ReservationCard from "../components/Reservation.js";
import { reservations } from "../stores/reservations.js";
import { router } from "../stores/router.js";

export default function Reservation({ id }) {
  const rs = useStore(reservations);
  const r = rs.find((f) => f.id === id);
  if (!r) {
    redirectPage(router, "404");
    return;
  }
  return html`<${ReservationCard} reservation=${r} detailed/>`;
}
