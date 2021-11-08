import { css, html } from "../../../vendor/js/bundle.js";

const errorStyle = (e, displayNone) =>
  css`
background-color: #fdd;
border-color: #e44;
visibility: ${e ? "visible" : "hidden"};
${!e && displayNone ? "display: none;" : ""}
`;

export default function ErrorMessage({ message, displayNone = false }) {
  return html`
    <div class="${errorStyle(message, displayNone)} msg">
        <b>Error:</b> ${
    message || "\xa0" /* non-breaking space, to prevent layout shift */
  }
    </div>
  `;
}
