import { css, html, useStore } from "../../vendor/js/bundle.js";
import { login, logOut } from "../stores/login.js";
import NavLink from "./NavLink.js";

const style = css`
@media(min-width: 500px) {
  a&, span& {
    float: right;
    top: 0.5em;
  }
  span& {
    position: relative;
  }
}
`;

export default function NavLogin() {
  const l = useStore(login);
  if (l === false) {
    return html`
      <${NavLink} class=${style} href="/login">Login<//>
    `;
  } else {
    return html`
      <span class=${style}>${l.username}<a href="" class=${css
      `@media(min-width: 500px) { &::before { content: " | "; } }`} onclick=${logOut}>Log out</a></span>
    `;
  }
}
