import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
import { V as pop, S as push } from "../../chunks/index.js";
import { p as page } from "../../chunks/index3.js";
function Error($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}
export {
  Error as default
};
