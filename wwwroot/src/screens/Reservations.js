import { css, html, useState, useStore } from "../../vendor/js/bundle.js";
import Reservation from "../components/Reservation.js";
import { reservations } from "../stores/reservations.js";
import PlainLink from "../components/styled/PlainLink.js";
import Paginator from "../components/Paginator.js";
import gridFormLayoutStyle from "../styles/gridFormLayoutStyle.js";
import useComponentId from "../hooks/useComponentId.js";
import EmptyMessageFallback from "../components/EmptyMessageFallback.js";

const filtersStyle = css`
& {
  margin: 1em;
}
& > form {
  display: inline-block;
  margin: 1em;
}
`;

export default function Reservations({ forFlightId }) {
  const rs = useStore(reservations);

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filterEmail, setFilterEmail] = useState("");

  const filterEmailId = useComponentId();
  const items10Id = useComponentId();
  const items25Id = useComponentId();
  const items50Id = useComponentId();

  function onItemsPerPageChange(e) {
    setItemsPerPage(+e.target.value);
    setPage(0);
  }

  return html`
    <div class=${css`margin: 0.5em;`}>
      <details class=${filtersStyle}>
        <summary>
          Filters
        </summary>
        <form class="${gridFormLayoutStyle}"
          onsubmit=${(evt) => evt.preventDefault()}>
          <div class="inputs">
            <label for=${filterEmailId}>Email:</label>
            <input id=${filterEmailId} value=${filterEmail}
              onchange=${(e) => setFilterEmail(e.target.value)}/>
            <fieldset>
              <legend>
                Items per page
              </legend>
              <label for=${items10Id}>
                <input type="radio" id=${items10Id} name="itemsPerPage"
                  checked=${itemsPerPage === 10} value=${10}
                  onchange=${onItemsPerPageChange}/> 10
              </label>
              <label for=${items25Id}>
                <input type="radio" id=${items25Id} name="itemsPerPage"
                  checked=${itemsPerPage === 25} value=${25}
                  onchange=${onItemsPerPageChange}/> 25
              </label>
              <label for=${items50Id}>
                <input type="radio" id=${items50Id} name="itemsPerPage"
                  checked=${itemsPerPage === 50} value=${50}
                  onchange=${onItemsPerPageChange}/> 50
              </label>
            </fieldset>
          </div>
        </form>
      </details>
      <${Paginator} ...${{ page, itemsPerPage }}
        onPageChange=${setPage} pagesOnTop>
        <${EmptyMessageFallback}>
      ${
    rs
      .filter((r) => r.flightId === (forFlightId ?? r.flightId))
      .filter((r) => filterEmail === "" ? true : r.email === filterEmail)
      .map((r) =>
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
      <//>
    </div>
  `;
}
