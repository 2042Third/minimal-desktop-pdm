import { d as delegate, p as push, t as template, f as first_child, b as sibling, g as get, e as template_effect, a as append, h as pop, c as child, i as derived, r as reset, n as next, j as set_text, k as state, l as set, m as proxy } from "../chunks/CRVcQe8l.js";
import { _ as __vitePreload } from "../chunks/CQrtv1eE.js";
let greetService = {
  Greet: async () => ""
  // Default implementation for SSR
};
function initService() {
  {
    return __vitePreload(() => import("../chunks/CnJtkJ88.js"), true ? [] : void 0, import.meta.url).then((module) => {
      greetService = module;
      return module;
    });
  }
}
initService();
const GreetService = (...args) => greetService.Greet(...args);
var root = template(`<h1></h1> <div class="about"><h1>Wails 3 Tests</h1> <p>Enter your name:</p> <input id="name" type="text"> <button>Greet</button> <p id="result"> </p>    <div id="test"><p class="region" style="--custom-contextmenu: test; --custom-contextmenu-data: item-123">Right click me to see the custom menu!</p> <div style="--default-contextmenu: hide">No context menu here</div> <div style="--default-contextmenu: auto"><p style="user-select: text">Select this text to see the default menu</p> <input type="text" placeholder="Type here to see the default menu"></div></div></div>`, 1);
function _page($$anchor, $$props) {
  push($$props, true);
  const prerender = false;
  console.log("Mounted");
  let resultElement = state("");
  let name = "Wails";
  const doGreet = () => {
    let name2 = document.getElementById("name").value;
    if (!name2) {
      name2 = "anonymous";
    }
    GreetService.Greet(name2).then((result) => {
      console.log(result);
      set(resultElement, proxy(result));
    }).catch((err) => {
      console.log(err);
      set(resultElement, "Error: " + err);
    });
  };
  var fragment = root();
  var h1 = first_child(fragment);
  h1.textContent = `Hello ${name}!`;
  var div = sibling(h1, 2);
  var button = sibling(child(div), 6);
  var event_handler = derived(doGreet);
  button.__click = function(...$$args) {
    var _a;
    (_a = get(event_handler)) == null ? void 0 : _a.apply(this, $$args);
  };
  var p = sibling(button, 2);
  var text = child(p);
  reset(p);
  next(2);
  reset(div);
  template_effect(() => set_text(text, `The output is: ${{ resultElement: get(resultElement) }}`));
  append($$anchor, fragment);
  return pop({ prerender });
}
delegate(["click"]);
export {
  _page as component
};
