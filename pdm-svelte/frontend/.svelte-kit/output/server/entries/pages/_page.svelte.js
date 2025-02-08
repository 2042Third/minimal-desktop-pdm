import { e as escape_html, b as bind_props, p as pop, a as push } from "../../chunks/vendor.js";
let greetService = {
  Greet: async () => ""
  // Default implementation for SSR
};
function initService() {
  return Promise.resolve(greetService);
}
initService();
function _page($$payload, $$props) {
  push();
  const prerender = false;
  console.log("Mounted");
  let resultElement = "";
  let name = "Wails";
  $$payload.out += `<h1>Hello ${escape_html(name)}!</h1> <div class="about"><h1>Wails 3 Tests</h1> <p>Enter your name:</p> <input id="name" type="text"> <button>Greet</button> <p id="result">The output is: ${escape_html({ resultElement })}</p>    <div id="test"><p class="region" style="--custom-contextmenu: test; --custom-contextmenu-data: item-123">Right click me to see the custom menu!</p> <div style="--default-contextmenu: hide">No context menu here</div> <div style="--default-contextmenu: auto"><p style="user-select: text">Select this text to see the default menu</p> <input type="text" placeholder="Type here to see the default menu"></div></div></div>`;
  bind_props($$props, { prerender });
  pop();
}
export {
  _page as default
};
