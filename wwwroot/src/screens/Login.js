import {
  allEffects,
  css,
  html,
  redirectPage,
  useState,
  useStore,
} from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";
import { logIn, user } from "../stores/user.js";

const centerStyle = css`
width: 100%;
height: 100%;
display: grid;
justify-content: center;
align-content: center;
`;

const formStyle = css`
display: grid;
justify-content: center;
align-content: center;
`;

const errorStyle = (e) =>
  css`
background-color: #fdd;
border-color: #e44;
visibility: ${e ? "visible" : "hidden"};
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
        setError("Error: Invalid username/password");
      } else if (
        e?.status === 400 &&
        e?.title === "One or more validation errors occurred."
      ) {
        setError(
          `Error: ${Object.values(e?.errors).join("; ")}`,
        );
      } else if (e?.type.startsWith("https://tools.ietf.org/html/rfc")) {
        setError(`Error: ${e.status} ${e.title} ${JSON.stringify(e?.errors)}`);
      } else {
        setError(`Error: ${JSON.stringify(e)}`);
      }
    }
  }
  if (u !== false) redirectPage(router, "home");
  return html`
    <div class=${centerStyle}>
      <div class=${`${errorStyle(error)} msg`}>
        ${error || "\xa0" /* non-breaking space, to prevent layout shift */}
      </div>
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
    </div>
  `;
}
