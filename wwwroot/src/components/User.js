import { css, html, redirectPage, useState } from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";
import { changePassword, deleteUser } from "../stores/users.js";
import BasePerson from "./BasePerson.js";
import If from "./If.js";
import IfAdmin from "./IfAdmin.js";
import DescriptionList from "./styled/DescriptionList.js";
import useComponentId from "../hooks/useComponentId.js";
import ErrorMessage from "./styled/ErrorMessage.js";

const style = css`
& {
  padding: 1em;
}
`;

function ChangePassword({ user }) {
  const [password, setPassword] = useState("");
  const passwordId = useComponentId();

  const [error, setError] = useState("");

  async function onSubmit(evt) {
    evt.preventDefault();
    try {
      if (
        !confirm(
          `Are you sure you want to change the password for '${user.username}'?`,
        )
      ) {
        return;
      }
      await changePassword(user, password);
      alert(`Password changed for '${user.username}'!`);
    } catch (e) {
      setError(Object.values(e?.errors).join("; "));
    }
  }

  return html`
    <form onsubmit=${onSubmit}>
      <fieldset>
        <legend>Change password</legend>
        <label for=${passwordId}>New password: </label>
        <input required type="password" pattern="^(?=.*\\d.*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,32}$" value=${password}
          onchange=${(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Change"/>
        <${ErrorMessage} message=${error} displayNone/>
      </fieldset>
    </form>
  `;
}

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
            <${ChangePassword} user=${user}/>
            <button class="btn btn-sm btn-c smooth" onclick=${delUser}>Delete user</button>
          </footer>
        <//>
      </article>
    <//>
  `;
}
