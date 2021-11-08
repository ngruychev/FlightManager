import { html } from "../../vendor/js/bundle.js";
import { useComponentId } from "../hooks/useComponentId.js";

export default function BasePersonInputs({ person, onChange }) {
  const firstNameId = useComponentId();
  const middleNameId = useComponentId();
  const lastNameId = useComponentId();
  const egnId = useComponentId();
  const phoneNumberId = useComponentId();
  // this returns a fragment :^)
  return html`
    <label for=${firstNameId}>First name:</label>
    <input required id=${firstNameId} minlength="1" onchange=${(e) =>
    onChange({ ...person, firstName: e.target.value })}/>
    <label for=${middleNameId}>Middle name:</label>
    <input required id=${middleNameId} minlength="1" onchange=${(e) =>
    onChange({ ...person, middleName: e.target.value })}/>
    <label for=${lastNameId}>Last Name:</label>
    <input required id=${lastNameId} minlength="1" onchange=${(e) =>
    onChange({ ...person, lastName: e.target.value })}/>
    <label for=${egnId}>EGN:</label>
    <input required id=${egnId} pattern="^\\d{10}$" onchange=${(e) =>
    onChange({ ...person, egn: e.target.value })}/>
    <label for=${phoneNumberId}>Phone number:</label>
    <input required id=${phoneNumberId} type="tel" onchange=${(e) =>
    onChange({ ...person, phoneNumber: e.target.value })}/>
  `;
}
