import { css, html, redirectPage, useState } from "../../vendor/js/bundle.js";
import IfAdmin from "../components/IfAdmin.js";
import Center from "../components/styled/Center.js";
import ErrorMessage from "../components/styled/ErrorMessage.js";
import useComponentId from "../hooks/useComponentId.js";
import { createFlight } from "../stores/flights.js";
import { router } from "../stores/router.js";

const fieldsetStyle = css`
& > div.inputs {
  display: grid;
}
@media (min-width: 500px) {
  & > div.inputs {
    grid-template-columns: repeat(2, auto);
  }
}
& > span.submitspan {
  display: grid;
  justify-content: center;
  align-content: center;
}
`;

function datetimeLocalValueHelper(value) {
  return new Date(
    new Date(value).getTime() - new Date(value).getTimezoneOffset() * 60_000,
  ).toISOString().slice(0, -8);
}

export default function CreateFlight() {
  const [error, setError] = useState("");

  const [flight, setFlight] = useState({
    locationFrom: "",
    locationTo: "",
    departureTime: new Date().toISOString(),
    arrivalTime: new Date().toISOString(),
    planeType: "",
    pilotName: "",
    economySeatsCapacity: 0,
    businessSeatsCapacity: 0,
  });

  const [
    locationFromId,
    locationToId,
    departureTimeId,
    arrivalTimeId,
    planeTypeId,
    pilotNameId,
    economySeatsCapacityId,
    businessSeatsCapacityId,
  ] = Array.from({ length: 8 }, useComponentId);

  async function onSubmit(evt) {
    evt.preventDefault();
    try {
      const f = await createFlight(flight);
      redirectPage(router, "flight", { id: f.id });
    } catch (e) {
      setError(Object.values(e?.errors).join("; "));
    }
  }

  return html`
    <${IfAdmin} orRedirectToLogin>
      <${Center}>
        <form onsubmit=${onSubmit}>
          <fieldset class=${fieldsetStyle}>
            <legend>
              Create flight
            </legend>
            <div class="inputs">
              <label for=${locationFromId}>Location from:</label>
              <input required id=${locationFromId} minlength="1" value=${flight.locationFrom}
                onchange=${(e) =>
    setFlight({ ...flight, locationFrom: e.target.value })}/>
              <label for=${locationToId}>Location to:</label>
              <input required id=${locationToId} minlength="1" value=${flight.locationTo}
                onchange=${(e) =>
    setFlight({ ...flight, locationTo: e.target.value })}/>
              <label for=${departureTimeId}>Departure time:</label>
              <input type="datetime-local" required id=${departureTimeId}
                defaultValue=${datetimeLocalValueHelper(flight.departureTime)}
                value=${datetimeLocalValueHelper(flight.departureTime)}
                onchange=${(e) =>
    setFlight({ ...flight, departureTime: new Date(e.target.value) })}/>
              <label for=${arrivalTimeId}>Arrival time:</label>
              <input type="datetime-local" required id=${arrivalTimeId}
                defaultValue=${datetimeLocalValueHelper(flight.arrivalTime)}
                value=${datetimeLocalValueHelper(flight.arrivalTime)}
                onchange=${(e) =>
    setFlight({ ...flight, arrivalTime: new Date(e.target.value) })}/>
              <label for=${planeTypeId}>Plane type:</label>
              <input required id=${planeTypeId} minlength="1" value=${flight.planeType}
                onchange=${(e) =>
    setFlight({ ...flight, planeType: e.target.value })}/>
              <label for=${pilotNameId}>Pilot name:</label>
              <input required id=${pilotNameId} minlength="1" value=${flight.pilotName}
                onchange=${(e) =>
    setFlight({ ...flight, pilotName: e.target.value })}/>
              <label for=${economySeatsCapacityId}>Economy seats:</label>
              <input type="number" required id=${economySeatsCapacityId} minlength="1" value=${flight.economySeatsCapacity}
                onchange=${(e) =>
    setFlight({ ...flight, economySeatsCapacity: +e.target.value })}/>
              <label for=${businessSeatsCapacityId}>Business seats:</label>
              <input type="number" required id=${businessSeatsCapacityId} minlength="1" value=${flight.businessSeatsCapacity}
                onchange=${(e) =>
    setFlight({ ...flight, businessSeatsCapacity: +e.target.value })}/>
            </div>
            <span class="submitspan">
              <input type="submit" class="btn btn-sm btn-b smooth" value="Create"/>
            </span>
            <${ErrorMessage} message=${error} displayNone/>
          </fieldset>
        </form>
      <//>
    <//>
  `;
}
