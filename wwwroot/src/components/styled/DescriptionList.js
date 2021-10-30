import { css, html } from "../../../vendor/js/bundle.js";

const style = css`
& {
  padding-left: 1em;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 0.5em 2em;
}

& dt {
  font-style: italic;
}
`;

export default function DescriptionList(props) {
  const classes = props.class?.split(" ") ?? [];
  classes.push(style);
  return html`
    <dl class=${classes.join(" ")}>
      ${props.children}
    </dl>
  `;
}
