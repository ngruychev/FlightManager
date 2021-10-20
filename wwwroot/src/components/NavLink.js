import { html, useStore } from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";

export default function NavLink(props) {
  const page = useStore(router);
  const classes = props.class?.split(" ") ?? [];
  if (props.href === page.path) classes.push("current");
  return html`
    <a ...${props} class=${classes.join(" ")}>${props.children}</a>
  `;
}
