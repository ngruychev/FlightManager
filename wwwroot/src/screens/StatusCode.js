import { css, html } from "../../vendor/js/bundle.js";
import Center from "../components/styled/Center.js";

const style = css`
& {
  text-align: center;
  font-size: 2.5em;
}
& *:is(h1, p) {
  color: #555;
  margin: 0;
}
`;

export default function StatusCode({ code = "404", text = "Not Found" }) {
  return html`
    <${Center} class=${style}>
      <h1>${code}</h1>
      <p>${text}</p>
    <//>
  `;
}
