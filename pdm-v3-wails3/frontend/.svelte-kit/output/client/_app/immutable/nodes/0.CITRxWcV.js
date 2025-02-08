import { t as template, a as append } from "../chunks/BGQeMav5.js";
import "../chunks/DSlFIRKF.js";
import { h as hydrating, d as hydrate_next, p as push, t as template_effect, a as pop, c as child, s as sibling, r as reset } from "../chunks/TdN3I5eQ.js";
import { i as init, p as page } from "../chunks/E-FVgfZD.js";
function slot(anchor, $$props, name, slot_props, fallback_fn) {
  var _a;
  if (hydrating) {
    hydrate_next();
  }
  var slot_fn = (_a = $$props.$$slots) == null ? void 0 : _a[name];
  var is_interop = false;
  if (slot_fn === true) {
    slot_fn = $$props["children"];
    is_interop = true;
  }
  if (slot_fn === void 0) ;
  else {
    slot_fn(anchor, is_interop ? () => slot_props : slot_props);
  }
}
function toggle_class(dom, class_name, value) {
  if (value) {
    if (dom.classList.contains(class_name)) return;
    dom.classList.add(class_name);
  } else {
    if (!dom.classList.contains(class_name)) return;
    dom.classList.remove(class_name);
  }
}
const prerender = true;
const ssr = false;
const _layout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prerender,
  ssr
}, Symbol.toStringTag, { value: "Module" }));
var root = template(`<div class="app-layout no-select svelte-1d7jzz4"><header class="can-drag svelte-1d7jzz4"><h1 class="svelte-1d7jzz4">PDM Notes</h1> <nav class="svelte-1d7jzz4"><a href="/wails-tests" class="svelte-1d7jzz4">Wails 3</a> <a href="/database" class="svelte-1d7jzz4">Database</a></nav></header> <main class="content svelte-1d7jzz4"><!></main></div>`);
function _layout($$anchor, $$props) {
  push($$props, false);
  init();
  var div = root();
  var header = child(div);
  var nav = sibling(child(header), 2);
  var a = child(nav);
  var a_1 = sibling(a, 2);
  reset(nav);
  reset(header);
  var main = sibling(header, 2);
  var node = child(main);
  slot(node, $$props, "default", {});
  reset(main);
  reset(div);
  template_effect(() => {
    toggle_class(a, "active", page.url.pathname === "/wails-tests");
    toggle_class(a_1, "active", page.url.pathname === "/database");
  });
  append($$anchor, div);
  pop();
}
export {
  _layout as component,
  _layout$1 as universal
};
