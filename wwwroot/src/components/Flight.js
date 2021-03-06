import { css, html, redirectPage } from "../../vendor/js/bundle.js";
import DescriptionList from "./styled/DescriptionList.js";
import Reservations from "../screens/Reservations.js";
import If from "./If.js";
import IfAdmin from "./IfAdmin.js";
import { router } from "../stores/router.js";
import { deleteFlight } from "../stores/flights.js";

const style = css`
& {
  padding: 1em;
}
`;

export default function Flight({ flight, detailed = false }) {
  const departureTime = new Date(flight.departureTime);
  const arrivalTime = new Date(flight.arrivalTime);
  const durationTotalSeconds = Math.floor(
    Math.abs(arrivalTime - departureTime) / 1000,
  );
  const durationHours = Math.floor(durationTotalSeconds / 3600);
  const durationMinutes = Math.floor(
    (durationTotalSeconds - (durationHours * 3600)) / 60,
  );
  const durationString = [
    ...(durationHours > 0
      ? [`${durationHours} hour${durationHours === 1 ? "" : "s"}`]
      : []),
    ...(durationMinutes > 1
      ? [`${durationMinutes} minute${durationMinutes === 1 ? "" : "s"}`]
      : []),
  ].join(", ");

  function delFlight() {
    if (
      confirm(
        `Are you sure you want to delete '${flight.locationFrom} - ${flight.locationTo} (${flight.id})'?`,
      )
    ) {
      deleteFlight(flight);
      redirectPage(router, "flights");
    }
  }

  return html`
    <article class=${style}>
      <header>
        <b>${flight.locationFrom}</b> - <b>${flight.locationTo}</b>
      </header>
      <hr/>
      <div>
        <${DescriptionList}>
          <dt>Departs at</dt>
          <dd>${departureTime.toLocaleString()}</dd>
          <dt>Duration</dt>
          <dd>${durationString}</dd>
          <dt>Economy</dt>
          <dd>${flight.economySeatsTaken}/${flight.economySeatsCapacity} (${flight.economySeatsLeft} left)</dd>
          <dt>Business</dt>
          <dd>${flight.businessSeatsTaken}/${flight.businessSeatsCapacity} (${flight.businessSeatsLeft} left)</dd>
          <${If} cond=${detailed}>
            <dt>Plane type</dt>
            <dd>${flight.planeType}</dd>
            <dt>Pilot name</dt>
            <dd>${flight.pilotName}</dd>
          <//>
        <//>
        <${If} cond=${detailed}>
          <details>
            <summary>Reservations:</summary>
            <${Reservations} forFlightId=${flight.id}/>
          </details>
        <//>
        <${If} cond=${detailed}>
          <hr/>
          <footer>
            <a href="/make-reservation/${flight.id}"><button class="btn btn-b btn-sm smooth">Make reservation</button></a>
            ${" "}
            <${IfAdmin}>
              <button class="btn btn-sm btn-c smooth" onclick=${delFlight}>Delete</button>
            <//>
          </footer>
        <//>
      </div>
    </article>
  `;
}
