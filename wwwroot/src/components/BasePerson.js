import { html } from "../../vendor/js/bundle.js";

export default function BasePerson({ person }) {
  // this returns a fragment :^)
  return html`
    <dt>Name</dt>
    <dd>${[person.firstName, person.middleName, person.lastName].join(" ")}</dd>
    <dt>EGN</dt>
    <dd>${person.egn}</dd>
    <dt>Phone #</dt>
    <dd>${person.phoneNumber}</dd>
  `;
}
