import {
  css,
  html,
  redirectPage,
  useEffect,
  useState,
  useStore,
} from "../../vendor/js/bundle.js";
import BasePersonInputs from "../components/BasePersonInputs.js";
import { flights } from "../stores/flights.js";
import { TicketType } from "../api/reservation.js";
import useComponentId from "../hooks/useComponentId.js";
import ErrorMessage from "../components/styled/ErrorMessage.js";
import { loadReservations, makeReservation } from "../stores/reservations.js";
import { router } from "../stores/router.js";

const style = css`
& {
  margin: 1em;
}

& fieldset {
  padding: 1em;
}

& div.passengers {
  display: inline-block;
}

& div.passengers fieldset {
  margin: 1em;
}

& div.passengers fieldset * {
  margin: 5px;
}
`;

const passengerFieldsetStyle = css`
&{
  display: grid;
}
@media (min-width: 500px) {
  & {
    grid-template-columns: repeat(2, auto);
  }
}
`;

function replaceArrayItem(arr, idx, newVal) {
  return arr.map((v, i) => (i === idx ? newVal : v));
}

function removeArrayItem(arr, idx) {
  return arr.filter((_, i) => i !== idx);
}

function Passenger({ passenger, index, onChange, onDelete }) {
  const nationalityId = useComponentId();
  const economyClassId = useComponentId();
  const businessClassId = useComponentId();

  return html`
    <fieldset class=${passengerFieldsetStyle}>
      <legend>
        Passenger #${index + 1}
      </legend>
      <${BasePersonInputs} person=${passenger} onChange=${(p) =>
    onChange({ ...passenger, ...p })}/>
      <label for=${nationalityId}>Nationality:</label>
      <input required id=${nationalityId} onchange=${(e) =>
    onChange({ ...passenger, nationality: e.target.value })} />
      <label for=${economyClassId}>
        <input required name="ticketType" id=${economyClassId} type="radio" checked=${
    passenger.ticketType === TicketType.Economy
  } value=${TicketType.Economy}
        onchange=${(e) =>
    onChange({ ...passenger, ticketType: +e.target.value })}/> Economy
      </label>
      <label for=${businessClassId}>
        <input required name="ticketType" id=${businessClassId} type="radio" checked=${
    passenger.ticketType === TicketType.Business
  } value=${TicketType.Business}
          onchange=${(e) =>
    onChange({ ...passenger, ticketType: +e.target.value })}/> Business
      </label>
      <input type="button" class="btn btn-sm btn-c smooth" value="Remove passenger" onclick=${onDelete}/>
    </fieldset>
  `;
}

export default function MakeReservation({ flightId }) {
  const fs = useStore(flights);
  const flight = fs.find((f) => f.id === flightId);
  if (!flight) {
    redirectPage(router, "404");
    return;
  }

  const [email, setEmail] = useState("");
  const [passengers, setPassengers] = useState([]);

  const [error, setError] = useState("");

  async function onSubmit(evt) {
    evt.preventDefault();
    if (passengers.length === 0) {
      setError("Must add at least one passenger");
      return;
    }
    try {
      const r = await makeReservation({ flightId, email, passengers });
      await loadReservations();
      redirectPage(router, "reservation", { id: r.id });
    } catch (e) {
      setError(Object.values(e?.errors).join("; "));
    }
  }

  useEffect(() => {
    setError("");
  }, [email, passengers]);

  function addPassenger() {
    setPassengers([...passengers, {
      firstName: "",
      middleName: "",
      lastName: "",
      egn: "",
      phoneNumber: "",
      nationality: "",
      ticketType: TicketType.Economy,
    }]);
  }

  return html`
    <div class=${style}>
      <form onSubmit=${onSubmit}>
        <fieldset>
          <legend>Make reservation for <a href="/flight/${flightId}">${flight.locationFrom} - ${flight.locationTo}</a></legend>
          <label>
            Feedback email: <input required type="email" onchange=${(e) =>
    setEmail(e.target.value)}/>
          </label>
          <br/>
          <p>Passengers:</p>
          <div class="passengers">
            ${
    passengers.map((p, i) =>
      html`
        <${Passenger} index=${i} passenger=${p}
          onChange=${(p) => setPassengers(replaceArrayItem(passengers, i, p))}
          onDelete=${() => setPassengers(removeArrayItem(passengers, i))}/>
        `
    )
  }
            <input type="button" class="btn btn-a btn-sm smooth" onclick=${addPassenger} value="Add passenger"/>
          </div>
          <br/>
          <input type="submit" class="btn btn-sm btn-b smooth" value="Make reservation"/>
          <${ErrorMessage} message=${error} displayNone/>
        </fieldset>
      </form>
    </div>
  `;
}
