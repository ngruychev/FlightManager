import {
  css,
  html,
  redirectPage,
  useEffect,
  useState,
  useStore,
} from "../../vendor/js/bundle.js";
import { router } from "../stores/router.js";
import Flights from "../screens/Flights.js";
import Reservations from "../screens/Reservations.js";
import Login from "../screens/Login.js";
import Flight from "../screens/Flight.js";
import StatusCode from "../screens/StatusCode.js";

const style = css`
width: 100%;
height: 100%;
`;

export default function Router() {
  const page = useStore(router);
  // a dirty hack. useStore should be doing this properly, but alas, it does not
  const [, forceRerender] = useState({});
  useEffect(() => {
    forceRerender({});
  }, [router]);
  return html`
    <div class=${style}>
      ${
    (() => {
      switch (page?.route) {
        case "home":
          redirectPage(router, "flights");
          return;
        case "flights":
          return html`<${Flights}/>`;
        case "flight":
          return html`<${Flight} id=${page?.params?.id}/>`;
        case "login":
          return html`<${Login}/>`;
        case "reservations":
          return html`<${Reservations}/>`;
        case "404":
          return html`<${StatusCode} code="404" text="Not Found"/>`;
        default:
          redirectPage(router, "404");
          return;
      }
    })()
  }
    </div>
  `;
}
