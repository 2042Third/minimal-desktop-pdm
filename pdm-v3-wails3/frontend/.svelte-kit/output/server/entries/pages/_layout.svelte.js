import { W as stringify, X as slot, V as pop, S as push } from "../../chunks/index.js";
import { p as page } from "../../chunks/index3.js";
import { a as attr } from "../../chunks/attributes.js";
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<div class="app-layout no-select svelte-1d7jzz4"><header class="can-drag svelte-1d7jzz4"><h1 class="svelte-1d7jzz4">PDM Notes</h1> <nav class="svelte-1d7jzz4"><a href="/wails-tests"${attr("class", `svelte-1d7jzz4 ${stringify([
    page.url.pathname === "/wails-tests" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Wails 3</a> <a href="/database"${attr("class", `svelte-1d7jzz4 ${stringify([
    page.url.pathname === "/database" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Database</a></nav></header> <main class="content svelte-1d7jzz4"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main></div>`;
  pop();
}
export {
  _layout as default
};
