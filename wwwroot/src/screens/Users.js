import { css, html, useState, useStore } from "../../vendor/js/bundle.js";
import IfAdmin from "../components/IfAdmin.js";
import Paginator from "../components/Paginator.js";
import PlainLink from "../components/styled/PlainLink.js";
import User from "../components/User.js";
import { users } from "../stores/users.js";

export default function Users() {
  const us = useStore(users);

  const [page, setPage] = useState(0);

  return html`
    <${IfAdmin} orRedirectToLogin>
      <div class=${css`margin: 0.5em;`}>
        <a href="/create-user"><button class="btn btn-sm btn-b smooth">Create user</button></a>
        <${Paginator} page=${page} onPageChange=${setPage} pagesOnTop>
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
        <//>
      </div>
    <//>
  `;
}
