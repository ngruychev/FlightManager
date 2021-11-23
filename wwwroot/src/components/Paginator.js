import { css, html } from "../../vendor/js/bundle.js";

const pageListStyle = css`
& {
  margin: auto 2em;
}
& button {
  margin: 0.1em;
}
`;

function PageList({ page, numPages, onPageChange }) {
  function onPageClick(p) {
    if (p !== page) onPageChange(p);
  }
  return html`
    <div class=${pageListStyle}>
      Page:${" "}
      ${
    Array.from({ length: (numPages === 0 ? 1 : numPages) }, (_, i) =>
      html`
        <button class="btn btn-sm${i === page ? " btn-a " : " "}smooth"
          onclick=${() => onPageClick(i)}>${i + 1}</button>
      `)
  }
    </div>
  `;
}

export default function Paginator(
  {
    children,
    pagesOnTop = false,
    itemsPerPage = 10,
    page = 0,
    onPageChange = () => {},
  },
) {
  children = [].concat(children);
  const numPages = Math.ceil(children.length / itemsPerPage);
  const slicedChildren = children.slice(
    itemsPerPage * page,
    itemsPerPage * page + itemsPerPage,
  );
  if (pagesOnTop) {
    return html`
      <${PageList} ...${{ page, numPages, onPageChange }}/>
      ${slicedChildren}
      `;
  } else {
    return html`
      ${slicedChildren}
      <${PageList} ...${{ page, numPages, onPageChange }}/>
    `;
  }
}
