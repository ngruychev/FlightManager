import { html, redirectPage, useStore } from "../../vendor/js/bundle.js";
import { login } from "../stores/login.js";
import { UserRole } from "../api/user.js";
import { router } from "../stores/router.js";

export default function IfAdmin({ children, orRedirectToLogin }) {
  const l = useStore(login);
  if (l === false || l.role !== UserRole.Admin) {
    if (orRedirectToLogin) redirectPage(router, "login");
    return html``;
  } else {
    return children;
  }
}
