import { css, html, useState, useStore } from "../../vendor/js/bundle.js";
import EmptyMessageFallback from "../components/EmptyMessageFallback.js";
import Flight from "../components/Flight.js";
import Paginator from "../components/Paginator.js";
import PlainLink from "../components/styled/PlainLink.js";
import IfAdmin from "../components/IfAdmin.js";
import useComponentId from "../hooks/useComponentId.js";
import { flights } from "../stores/flights.js";
import gridFormLayoutStyle from "../styles/gridFormLayoutStyle.js";

const filtersStyle = css`
& {
  margin: 1em;
}
& > form {
  display: inline-block;
  margin: 1em;
}
`;

export default function Flights() {
  const fs = useStore(flights);

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filterLocationFrom, setFilterLocationFrom] = useState("");
  const [filterLocationTo, setFilterLocationTo] = useState("");

  const filterLocationFromId = useComponentId();
  const filterLocationToId = useComponentId();
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
            <label for=${filterLocationFromId}>Location from:</label>
            <input id=${filterLocationFromId} value=${filterLocationFrom}
              onchange=${(e) => setFilterLocationFrom(e.target.value)}/>
            <label for=${filterLocationToId}>Location to:</label>
            <input id=${filterLocationToId} value=${filterLocationTo}
              onchange=${(e) => setFilterLocationTo(e.target.value)}/>
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
      <${IfAdmin}>
        <a href="/create-flight"><button class="btn btn-sm btn-b smooth">Create flight</button></a>
      <//>
      <${Paginator} ...${{ page, itemsPerPage }}
        onPageChange=${setPage} pagesOnTop>
        <${EmptyMessageFallback}>
      ${
    fs
      .filter((f) =>
        filterLocationFrom === "" ? true : f.locationFrom === filterLocationFrom
      )
      .filter((f) =>
        filterLocationTo === "" ? true : f.locationTo === filterLocationTo
      )
      .map((f) =>
        html`
        <div key=${f.id} class=${css
          `border: 1px solid lightgray; border-radius: 0.5em; margin: 0.5em;`}>
          <${PlainLink} href="/flight/${f.id}">
            <${Flight} flight=${f}/>
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
