import { html, redirectPage, useState } from "../../vendor/js/bundle.js";
import { UserRole } from "../api/user.js";
import BasePersonInputs from "../components/BasePersonInputs.js";
import IfAdmin from "../components/IfAdmin.js";
import Center from "../components/styled/Center.js";
import ErrorMessage from "../components/styled/ErrorMessage.js";
import useComponentId from "../hooks/useComponentId.js";
import { router } from "../stores/router.js";
import { createUser } from "../stores/users.js";
import gridFormLayoutStyle from "../styles/gridFormLayoutStyle.js";

export default function CreateUser() {
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    egn: "",
    phoneNumber: "",
    nationality: "",
    username: "",
    password: "",
    email: "",
    address: "",
    role: UserRole.Employee,
  });

  const usernameId = useComponentId();
  const passwordId = useComponentId();
  const emailId = useComponentId();
  const addressId = useComponentId();
  const adminId = useComponentId();
  const employeeId = useComponentId();

  const [error, setError] = useState("");

  async function onSubmit(evt) {
    evt.preventDefault();
    try {
      const u = await createUser(user);
      redirectPage(router, "user", { id: u.id });
    } catch (e) {
      setError(Object.values(e?.errors).join("; "));
    }
  }

  return html`
    <${IfAdmin} orRedirectToLogin>
      <${Center}>
        <form onsubmit=${onSubmit}>
          <fieldset class=${gridFormLayoutStyle}>
            <legend>
              Create user
            </legend>
            <div class="inputs">
              <${BasePersonInputs} person=${user} onChange=${setUser}/>
              <label for=${usernameId}>Username:</label>
              <input required pattern="^[a-zA-Z0-9_]{4,16}$" id=${usernameId} value=${user.username}
              onchange=${(e) =>
    setUser({ ...user, username: e.target.value })}/>
              <label for=${passwordId}>Password:</label>
              <input required pattern="^(?=.*\\d.*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,32}$" id=${passwordId} type="password"
              value=${user.password}
              onchange=${(e) =>
    setUser({ ...user, password: e.target.value })}/>
              <label for=${emailId}>Email:</label>
              <input required id=${emailId} type="email" value=${user.email}
              onchange=${(e) => setUser({ ...user, email: e.target.value })}/>
              <label for=${addressId}>Address:</label>
              <input required id=${addressId} value=${user.address}
                onchange=${(e) =>
    setUser({ ...user, address: e.target.value })}/>
              <label for=${employeeId}>
                <input required id=${employeeId} name="role" type="radio" value=${UserRole.Employee}
                  checked=${user.role === UserRole.Employee}
                  onchange=${(e) =>
    setUser({ ...user, role: +e.target.value })}/> Employee
              </label>
              <label for=${adminId}>
                <input required id=${adminId} name="role" type="radio" value=${UserRole.Admin}
                  checked=${user.role === UserRole.Admin}
                  onchange=${(e) =>
    setUser({ ...user, role: +e.target.value })}/> Admin
              </label>
            </div>
            <span class="buttons">
              <input type="submit" class="btn btn-sm btn-b smooth" value="Create"/>
            </span>
            <${ErrorMessage} message=${error} displayNone/>
          </fieldset>
        </form>
      <//>
    <//>
  `;
}
