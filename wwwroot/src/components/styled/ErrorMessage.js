import { css, html } from "../../../vendor/js/bundle.js";

const errorStyle = (e) =>
  css`
background-color: #fdd;
border-color: #e44;
visibility: ${e ? "visible" : "hidden"};
`;

export default function ErrorMessage({ message }) {
  return html`
    <div class=${`${errorStyle(message)} msg`}>
        <b>Error:</b> ${
    message || "\xa0" /* non-breaking space, to prevent layout shift */
  }
    </div>
  `;
}
