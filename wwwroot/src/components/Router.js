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
import Reservation from "../screens/Reservation.js";
import MakeReservation from "../screens/MakeReservation.js";
import Users from "../screens/Users.js";
import User from "../screens/User.js";

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
    <main class=${style}>
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
        case "reservation":
          return html`<${Reservation} id=${page?.params?.id}/>`;
        case "404":
          return html`<${StatusCode} code="404" text="Not Found"/>`;
        case "makeReservation":
          return html`<${MakeReservation} flightId=${page?.params?.id}/>`;
        case "users":
          return html`<${Users}/>`;
        case "user":
          return html`<${User} id=${page?.params?.id}/>`;
        default:
          redirectPage(router, "404");
          return;
      }
    })()
  }
    </main>
  `;
}
