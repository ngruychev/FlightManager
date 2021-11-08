import { css, html, useStore } from "../../vendor/js/bundle.js";
import Flight from "../components/Flight.js";
import { flights } from "../stores/flights.js";

const linkStyle = css`
&, &:link, &:visited, &:active, &:hover {
  color: black;
  text-decoration: none;
}
`;

export default function Flights() {
  const fs = useStore(flights);
  return html`
    <div class=${css`margin: 0.5em;`}>
      ${
    fs.map((f) =>
      html`
        <div key=${f.id} class=${css
        `border: 1px solid lightgray; border-radius: 0.5em; margin: 0.5em;`}>
          <a href="/flight/${f.id}" class=${linkStyle}>
            <${Flight} flight=${f}/>
          </a>
        </div>
      `
    )
  }
    </div>
  `;
}
