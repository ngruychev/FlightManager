import { css, html, useState, useStore } from "../../vendor/js/bundle.js";
import Reservation from "../components/Reservation.js";
import { reservations } from "../stores/reservations.js";
import PlainLink from "../components/styled/PlainLink.js";
import Paginator from "../components/Paginator.js";

export default function Reservations() {
  const rs = useStore(reservations);

  const [page, setPage] = useState(0);

  return html`
    <div class=${css`margin: 0.5em;`}>
      <${Paginator} page=${page} onPageChange=${setPage} pagesOnTop>
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
      <//>
    </div>
  `;
}
