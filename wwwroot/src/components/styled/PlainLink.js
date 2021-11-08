import { css, html } from "../../../vendor/js/bundle.js";

const style = css`
&, &:link, &:visited, &:active, &:hover {
  color: black;
  text-decoration: none;
}
`;

export default function PlainLink(props) {
  const classes = props.class?.split(" ") ?? [];
  classes.push(style);
  return html`
    <a href=${props.href} class=${classes.join(" ")}>${props.children}</a>
  `;
}
