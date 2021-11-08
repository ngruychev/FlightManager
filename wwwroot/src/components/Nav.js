import NavLogin from "./NavLogin.js";
import { css, html } from "../../vendor/js/bundle.js";
import NavLink from "./NavLink.js";
import IfAdmin from "./IfAdmin.js";

const style = css`
@media (max-width: 500px) {
  & button.btn.btn-close {
    display: none;
  }
  & > nav.nav:focus ~ button.btn.btn-close {
    display: inherit;
  }
}
`;

export default function Nav() {
  return html`
    <div class=${style}>
      <nav class="nav" tabindex="-1" onclick=${(e) => e.target.focus()}>
        <div class="container">
          <a href="" class="pagename current">FlightManager</a>
          <${NavLink} href="/flights">Flights<//>
          <${NavLink} href="/reservations">Reservations<//>
          <${IfAdmin}>
            <${NavLink} href="/users">Users<//>
          <//>
          <hr class=${css`@media (min-width: 500px) { & { display: none; } }`}/>
          <${NavLogin}/>
        </div>
      </nav>
      <button class="btn-close btn btn-sm">×</button>
    </div>
  `;
}
