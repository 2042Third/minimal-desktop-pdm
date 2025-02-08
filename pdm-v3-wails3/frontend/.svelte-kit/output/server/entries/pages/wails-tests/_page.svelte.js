import { $ as store_get, a0 as unsubscribe_stores, V as pop, S as push } from "../../../chunks/index.js";
import { N } from "../../../chunks/database.js";
import { w as writable } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { a as attr } from "../../../chunks/attributes.js";
const time = writable("");
N.On("time", (t) => {
  time.set(t.data[0]);
});
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  console.log("Mounted");
  let resultElement = "";
  let name = "Wails";
  let cHelloOut = "";
  let cStringOut = "";
  let getString = "";
  $$payload.out += `<div class="about svelte-wyv860"><h1>Hello ${escape_html(name)}!</h1> <p>Enter your name:</p> <input${attr("value", name)} type="text" class="svelte-wyv860"> <button class="svelte-wyv860">Greet</button> <p id="result">The output is: ${escape_html(resultElement)}</p> <button class="svelte-wyv860">Call C Hello</button> <p id="result">The output is: ${escape_html(cHelloOut)}</p> <input${attr("value", getString)} type="text" class="svelte-wyv860"> <button class="svelte-wyv860">Call C String With Input</button> <p id="result">The output is: ${escape_html(cStringOut)}</p> <p>Time: ${escape_html(store_get($$store_subs ??= {}, "$time", time))}</p> <div id="test"><p class="region" style="--custom-contextmenu: test; --custom-contextmenu-data: item-123">Right click me to see the custom menu!</p> <div style="--default-contextmenu: hide">No context menu here</div> <div style="--default-contextmenu: auto"><p style="user-select: text">Select this text to see the default menu</p> <input type="text" placeholder="Type here to see the default menu" class="svelte-wyv860"></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
