import { W as stringify, X as slot, V as pop, S as push } from "../../chunks/index.js";
import { p as page } from "../../chunks/index3.js";
import { a as attr } from "../../chunks/attributes.js";
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<div class="app-layout no-select svelte-l6obgh"><header class="can-drag svelte-l6obgh"><h1 class="svelte-l6obgh">PDM Notes</h1> <nav class="svelte-l6obgh"><a href="/wails-tests"${attr("class", `svelte-l6obgh ${stringify([
    page.url.pathname === "/wails-tests" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Wails 3</a> <a href="/database"${attr("class", `svelte-l6obgh ${stringify([
    page.url.pathname === "/database" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Database</a></nav></header> <main class="content svelte-l6obgh"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main></div>`;
  pop();
}
export {
  _layout as default
};
