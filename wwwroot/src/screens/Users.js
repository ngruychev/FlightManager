import { css, html, useStore } from "../../vendor/js/bundle.js";
import IfAdmin from "../components/IfAdmin.js";
import PlainLink from "../components/styled/PlainLink.js";
import User from "../components/User.js";
import { users } from "../stores/users.js";

export default function Users() {
  const us = useStore(users);
  return html`
    <${IfAdmin} orRedirectToLogin>
      <div class=${css`margin: 0.5em;`}>
        <a href="/create-user"><button class="btn btn-sm btn-b smooth">Create user</button></a>
        ${
    us.map((u) =>
      html`
          <div key=${u.id} class=${css
        `border: 1px solid lightgray; border-radius: 0.5em; margin: 0.5em;`}>
            <${PlainLink} href="/user/${u.id}">
              <${User} user=${u}/>
            <//>
          </div>
        `
    )
  }
      </div>
    <//>
  `;
}
