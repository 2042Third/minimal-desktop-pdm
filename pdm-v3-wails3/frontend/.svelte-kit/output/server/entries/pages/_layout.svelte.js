import { W as stringify, X as slot, V as pop, S as push } from "../../chunks/index.js";
import { p as page } from "../../chunks/index3.js";
import { a as attr } from "../../chunks/attributes.js";
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<div class="app-layout svelte-1a1k8xn"><header class="svelte-1a1k8xn"><h1 class="svelte-1a1k8xn">PDM Notes</h1> <nav class="svelte-1a1k8xn"><a href="/wails-tests"${attr("class", `svelte-1a1k8xn ${stringify([
    page.url.pathname === "/wails-tests" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Wails 3</a> <a href="/database"${attr("class", `svelte-1a1k8xn ${stringify([
    page.url.pathname === "/database" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Database</a></nav></header> <main class="content svelte-1a1k8xn"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main></div>`;
  pop();
}
export {
  _layout as default
};
