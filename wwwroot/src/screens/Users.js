import { css, html, useState, useStore } from "../../vendor/js/bundle.js";
import EmptyMessageFallback from "../components/EmptyMessageFallback.js";
import IfAdmin from "../components/IfAdmin.js";
import Paginator from "../components/Paginator.js";
import PlainLink from "../components/styled/PlainLink.js";
import User from "../components/User.js";
import useComponentId from "../hooks/useComponentId.js";
import { users } from "../stores/users.js";
import gridFormLayoutStyle from "../styles/gridFormLayoutStyle.js";

const filtersStyle = css`
& {
  margin: 1em;
}
& > form {
  display: inline-block;
  margin: 1em;
}
`;

export default function Users() {
  const us = useStore(users);

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filterEmail, setFilterEmail] = useState("");
  const [filterUsername, setFilterUsername] = useState("");
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");

  const filterEmailId = useComponentId();
  const filterUsernameId = useComponentId();
  const filterFirstNameId = useComponentId();
  const filterLastNameId = useComponentId();
  const items10Id = useComponentId();
  const items25Id = useComponentId();
  const items50Id = useComponentId();

  function onItemsPerPageChange(e) {
    setItemsPerPage(+e.target.value);
    setPage(0);
  }

  return html`
    <${IfAdmin} orRedirectToLogin>
      <div class=${css`margin: 0.5em;`}>
        <details class=${filtersStyle}>
          <summary>
            Filters
          </summary>
          <form class="${gridFormLayoutStyle}"
            onsubmit=${(evt) => evt.preventDefault()}>
            <div class="inputs">
              <label for=${filterEmailId}>Email:</label>
              <input id=${filterEmailId} value=${filterEmail}
                onchange=${(e) => setFilterEmail(e.target.value)}/>
              <label for=${filterUsernameId}>Username:</label>
              <input id=${filterUsernameId} value=${filterUsername}
                onchange=${(e) => setFilterUsername(e.target.value)}/>
              <label for=${filterFirstNameId}>First name:</label>
              <input id=${filterFirstNameId} value=${filterFirstName}
                onchange=${(e) => setFilterFirstName(e.target.value)}/>
              <label for=${filterLastNameId}>Last name:</label>
              <input id=${filterLastNameId} value=${filterLastName}
                onchange=${(e) => setFilterLastName(e.target.value)}/>
              <fieldset>
                <legend>
                  Items per page
                </legend>
                <label for=${items10Id}>
                  <input type="radio" id=${items10Id} name="itemsPerPage"
                    checked=${itemsPerPage === 10} value=${10}
                    onchange=${onItemsPerPageChange}/> 10
                </label>
                <label for=${items25Id}>
                  <input type="radio" id=${items25Id} name="itemsPerPage"
                    checked=${itemsPerPage === 25} value=${25}
                    onchange=${onItemsPerPageChange}/> 25
                </label>
                <label for=${items50Id}>
                  <input type="radio" id=${items50Id} name="itemsPerPage"
                    checked=${itemsPerPage === 50} value=${50}
                    onchange=${onItemsPerPageChange}/> 50
                </label>
              </fieldset>
            </div>
          </form>
        </details>
        <a href="/create-user"><button class="btn btn-sm btn-b smooth">Create user</button></a>
        <${Paginator} ...${{ page, itemsPerPage }}
          onPageChange=${setPage} pagesOnTop>
          <${EmptyMessageFallback}>
        ${
    us
      .filter((u) => filterEmail === "" ? true : u.email === filterEmail)
      .filter((u) =>
        filterUsername === "" ? true : u.username === filterUsername
      )
      .filter((u) =>
        filterFirstName === "" ? true : u.firstName === filterFirstName
      )
      .filter((u) =>
        filterLastName === "" ? true : u.lastName === filterLastName
      )
      .map((u) =>
        html`
          <div key=${u.id} class=${css
          `border: 1px solid lightgray; border-radius: 0.5em; margin: 0.5em;`}>
            <${PlainLink} href="/user/${u.id}">
              <${User} user=${u}/>
            <//>
          </div>
        `
      )
  }
          <//>
        <//>
      </div>
    <//>
  `;
}
