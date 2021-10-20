import { css, html, redirectPage, useStore } from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";
import Flights from "../screens/Flights.js";
import Reservations from "../screens/Reservations.js";
import Login from "../screens/Login.js";

const style = css`
width: 100%;
height: 100%;
`;

export default function Router() {
  const page = useStore(router);
  return html`
    <div class=${style}>
      ${
    (() => {
      switch (page.route) {
        case "home":
          redirectPage(router, "flights");
          // SWITCH CASE FALLTHROUGH, WATCH OUT!
        /*
         * ┗┓                OUCH!
         *   ┗┓　     ヾ○ｼ .../
         *     ┗┓   ヘ/
         *       ┗┓ ノ
         *    　 　 ┗┓
         */
        case "flights":
          return html`<${Flights}/>`;
        case "login":
          return html`<${Login}/>`;
        case "reservations":
          return html`<${Reservations}/>`;
        default:
          return html`404 not found`;
      }
    })()
  }
    </div>
  `;
}
