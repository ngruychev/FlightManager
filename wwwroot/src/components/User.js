import { css, html, redirectPage } from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";
import { deleteUser } from "../stores/users.js";
import BasePerson from "./BasePerson.js";
import If from "./If.js";
import IfAdmin from "./IfAdmin.js";
import DescriptionList from "./styled/DescriptionList.js";

const style = css`
& {
  padding: 1em;
}
`;

export default function User({ user, detailed = false }) {
  function delUser() {
    if (confirm(`Are you sure you want to delete user '${user.username}'?`)) {
      deleteUser(user);
      redirectPage(router, "users");
    }
  }

  return html`
    <${IfAdmin} orRedirectToLogin>
      <article class=${style}>
        <header>
          <b>${user.username}</b>
        </header>
        <hr/>
        <div>
          <${DescriptionList}>
            <${BasePerson} person=${user}/>
            <dt>Email</dt>
            <dd>${user.email}</dd>
            <dt>Address</dt>
            <dd>${user.address}</dd>
          <//>
        </div>
        <${If} cond=${detailed}>
          <hr/>
          <footer>
            <button class="btn btn-sm btn-c smooth" onclick=${delUser}>Delete user</button>
          </footer>
        <//>
      </article>
    <//>
  `;
}
