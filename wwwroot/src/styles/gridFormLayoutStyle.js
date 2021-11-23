import { css } from "../../vendor/js/bundle.js";

export default css`
& > div.inputs {
  display: grid;
}
@media (min-width: 500px) {
  & > div.inputs {
    grid-template-columns: repeat(2, auto);
  }
}
& > div.inputs label {
  display: flex;
  align-items: center;
  margin: 5px;
}
& > .buttons {
  display: grid;
  justify-content: center;
  align-content: center;
  grid-auto-flow: column;
  grid-gap: 0.5em;
}
`;
