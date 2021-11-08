import { css, html, useStore } from "../../vendor/js/bundle.js";
import { TicketType } from "../api/reservation.js";
import DescriptionList from "./styled/DescriptionList.js";
import BasePerson from "./BasePerson.js";
import { flights } from "../stores/flights.js";

const style = css`
& {
  padding: 1em;
}
`;

function Passenger({ passenger }) {
  return html`
    <article key=${passenger.id}>
      <${DescriptionList}>
      <${BasePerson} person=${passenger}/>
        <dt>Nationality</dt>
        <dd>${passenger.nationality}</dd>
        <dt>Ticket type</dt>
        <dd>${TicketType[passenger.ticketType]}</dd>
      <//>
    </article>
  `;
}

export default function Reservation({ reservation, detailed }) {
  const fs = useStore(flights);
  const f = fs.find((f) => f.id === reservation.flightId);
  const fromToString = `${f?.locationFrom} - ${f?.locationTo}`;
  return html`
    <article class=${style}>
      <header>
        <b>
          Reservation <code>#${reservation.id}</code> for flight <a href="/flight/${reservation.flightId}">
          ${f ? fromToString : reservation.id}
        </a>
        </b>
      </header>
      <div>
        <hr/>
        <${DescriptionList}>
          <dt>Email</dt>
          <dd>${reservation.email}</dd>
        <//>
      ${
    detailed
      ? html`
        <b>Passengers:</b>
        <div class=${style}>
          ${
        reservation.passengers.map((p) =>
          html`<div key=${p.id} class=${css
            `border: 1px solid lightgray; border-radius: 0.5em; margin: 0.5em;`}><${Passenger} passenger=${p}/></div>`
        )
      }
      </div>
      `
      : html``
  }
      </div>
    </article>
  `;
}
