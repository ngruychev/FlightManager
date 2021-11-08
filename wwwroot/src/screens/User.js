import { html, redirectPage, useStore } from "../../vendor/js/bundle.js";
import UserCard from "../components/User.js";
import { users } from "../stores/users.js";
import { router } from "../stores/router.js";
import IfAdmin from "../components/IfAdmin.js";

export default function User({ id }) {
  const fs = useStore(users);
  const f = fs.find((f) => f.id === id);
  if (!f) {
    redirectPage(router, "404");
    return;
  }
  return html`
  <${IfAdmin} orRedirectToLogin>
    <${UserCard} user=${f} detailed/>
  <//>
  `;
}
