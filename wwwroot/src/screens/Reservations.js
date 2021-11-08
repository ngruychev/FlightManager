import { css, html, useStore } from "../../vendor/js/bundle.js";
import Reservation from "../components/Reservation.js";
import { reservations } from "../stores/reservations.js";
import PlainLink from "../components/styled/PlainLink.js";

export default function Reservations() {
  const rs = useStore(reservations);
  return html`
    <div class=${css`margin: 0.5em;`}>
      ${
    rs.map((r) =>
      html`
        <div key=${r.id} class=${css
        `border: 1px solid lightgray; border-radius: 0.5em; margin: 0.5em;`}>
          <${PlainLink} href="/reservation/${r.id}">
            <${Reservation} reservation=${r}/>
          <//>
        </div>
      `
    )
  }
    </div>
  `;
}
