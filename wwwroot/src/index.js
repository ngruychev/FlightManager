import { allTasks, css, html, render } from "../vendor/js/bundle.js";
import Nav from "./components/Nav.js";
import Router from "./components/Router.js";
import { flights } from "./stores/flights.js";
import { reservations } from "./stores/reservations.js";
import { login } from "./stores/login.js";
import { users } from "./stores/users.js";

css`
&{}
body, textarera, input, select {
  font-family: Helvetica, Calibri, Tahoma, Arial, sans-serif;
}
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}
input[type="password"] {
  width: 13em;
}
`;

function App() {
  return html`
    <${Nav}/>
    <${Router}/>
  `;
}

// force-load stores
flights.listen(() => {});
reservations.listen(() => {});
login.listen(() => {});
users.listen(() => {});
await allTasks();

render(html`<${App}/>`, document.body);
