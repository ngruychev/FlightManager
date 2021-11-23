import { css, html } from "../../vendor/js/bundle.js";
import Center from "./styled/Center.js";

const pStyle = css`
color: #555;
padding: 5em;
`;

export default function EmptyMessageFallback({ children, message = "Nothing here" }) {
  children = [].concat(children);
  if (children.length === 0) {
    return html`
      <${Center}>
        <p class=${pStyle}>
          ${message}
        </p>
      <//>
    `;
  }
  return children;
}