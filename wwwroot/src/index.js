import { css, html, render } from "../vendor/js/bundle.js";
import Nav from "./components/Nav.js";
import Router from "./components/Router.js";

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

render(html`<${App}/>`, document.body);
