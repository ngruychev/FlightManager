import NavLogin from "./NavLogin.js";
import Login from "../screens/Login.js";
import { css, html } from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";
import NavLink from "./NavLink.js";

export default function Nav() {
  return html`
    <div>
      <nav class="nav" tabindex="-1" onclick=${(e) => e.target.focus()}>
        <div class="container">
          <a href="" class="pagename current">FlightManager</a>
          <${NavLink} href="/flights">Flights<//>
          <${NavLink} href="/reservations">Reservations<//>
          <hr class=${css`@media(min-width: 500px) { & { display: none; } }`}/>
          <${NavLogin}/>
        </div>
      </nav>
      <button class="btn-close btn btn-sm">×</button>
    </div>
  `;
}
