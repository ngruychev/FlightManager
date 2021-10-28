import { css, html } from "../../vendor/js/bundle.js";

const style = css`
width: 100%;
height: 100%;
display: grid;
justify-content: center;
align-content: center;
`;

export default function Center(props) {
  const classes = props.class?.split(" ") ?? [];
  classes.push(style);
  return html`
    <div class=${classes.join(" ")}>${props.children}</div>
  `;
}
