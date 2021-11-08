import { css, html } from "../../vendor/js/bundle.js";
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
        <//>
      </article>
    <//>
  `;
}
