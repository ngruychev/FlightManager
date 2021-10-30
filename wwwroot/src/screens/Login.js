import {
  css,
  html,
  redirectPage,
  useState,
  useStore,
} from "../../vendor/js/bundle.js";
import Center from "../components/styled/Center.js";
import ErrorMessage from "../components/styled/ErrorMessage.js";
import { router } from "../stores/router.js";
import { logIn, user } from "../stores/user.js";

const formStyle = css`
display: grid;
justify-content: center;
align-content: center;
`;

export default function Login() {
  const u = useStore(user);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    try {
      await logIn(username, pass);
    } catch (e) {
      if (e?.status === 401) {
        setError("Invalid username/password");
      } else if (
        e?.status === 400 &&
        e?.title === "One or more validation errors occurred."
      ) {
        setError(Object.values(e?.errors).join("; "));
      } else if (e?.type.startsWith("https://tools.ietf.org/html/rfc")) {
        setError(`${e.status} ${e.title} ${JSON.stringify(e?.errors)}`);
      } else {
        setError(JSON.stringify(e));
      }
    }
  }
  if (u !== false) redirectPage(router, "home");
  return html`
    <${Center}>
      <${ErrorMessage} message=${error}/>
      <br/>
      <form onSubmit=${onSubmit} class=${formStyle}>
        <input
          type="text"
          placeholder="username"
          value=${username}
          onInput=${(e) => setUsername(e.target.value)}/>
        <input
          type="password"
          placeholder="password" value=${pass}
          onInput=${(e) => setPass(e.target.value)}/>
        <input
          type="submit"
          class="btn btn-a btn-sm smooth"
          value="Log in"/>
      </form>
    <//>
  `;
}
