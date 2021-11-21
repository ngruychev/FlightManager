import { css, html, useState, useStore } from "../../vendor/js/bundle.js";
import Flight from "../components/Flight.js";
import Paginator from "../components/Paginator.js";
import PlainLink from "../components/styled/PlainLink.js";
import { flights } from "../stores/flights.js";

export default function Flights() {
  const fs = useStore(flights);

  const [page, setPage] = useState(0);

  return html`
    <div class=${css`margin: 0.5em;`}>
      <a href="/create-flight"><button class="btn btn-sm btn-b smooth">Create flight</button></a>
      <${Paginator} page=${page} onPageChange=${setPage} pagesOnTop>
      ${
    fs.map((f) =>
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
    </div>
  `;
}
