import { t as template, a as append } from "../chunks/BGQeMav5.js";
import { p as push, s as sibling, ad as state, t as template_effect, D as get, a as pop, F as set, c as child, r as reset, ag as next } from "../chunks/TdN3I5eQ.js";
import { d as delegate, s as set_text } from "../chunks/Cv_58GG0.js";
import { e as ee, N, b as bind_value, r as remove_input_defaults } from "../chunks/Bi1rSa6r.js";
import { a as setup_stores, p as proxy, s as store_get } from "../chunks/BFcj0Dfg.js";
import { w as writable } from "../chunks/En2E40Cu.js";
function GetHelloString(a) {
  let $resultPromise = (
    /** @type {any} */
    ee.ByID(1810706486, a)
  );
  return $resultPromise;
}
function Hello() {
  let $resultPromise = (
    /** @type {any} */
    ee.ByID(2264649841)
  );
  return $resultPromise;
}
function Greet(name) {
  let $resultPromise = (
    /** @type {any} */
    ee.ByID(1411160069, name)
  );
  return $resultPromise;
}
const time = writable("");
N.On("time", (t) => {
  time.set(t.data[0]);
});
const doCHello = (_, cHelloOut) => {
  try {
    Hello();
  } catch (err) {
    console.log(err);
    set(cHelloOut, "Error: " + err);
  }
};
const doGetString = (__1, getString, cStringOut) => {
  GetHelloString(get(getString)).then((result) => {
    console.log("C String Output: " + result);
    set(cStringOut, proxy(result));
  }).catch((err) => {
    console.log(err);
    set(cStringOut, "Error: " + err);
  });
};
var on_keyup = (e, doGreet) => e.key === "Enter" && doGreet();
var root = template(`<div class="about svelte-wyv860"><h1> </h1> <p>Enter your name:</p> <input type="text" class="svelte-wyv860"> <button class="svelte-wyv860">Greet</button> <p id="result"> </p> <button class="svelte-wyv860">Call C Hello</button> <p id="result"> </p> <input type="text" class="svelte-wyv860"> <button class="svelte-wyv860">Call C String With Input</button> <p id="result"> </p> <p> </p> <div id="test"><p class="region" style="--custom-contextmenu: test; --custom-contextmenu-data: item-123">Right click me to see the custom menu!</p> <div style="--default-contextmenu: hide">No context menu here</div> <div style="--default-contextmenu: auto"><p style="user-select: text">Select this text to see the default menu</p> <input type="text" placeholder="Type here to see the default menu" class="svelte-wyv860"></div></div></div>`);
function _page($$anchor, $$props) {
  push($$props, true);
  const [$$stores, $$cleanup] = setup_stores();
  const $time = () => store_get(time, "$time", $$stores);
  console.log("Mounted");
  let resultElement = state("");
  let name = state("Wails");
  let cHelloOut = state("");
  let cStringOut = state("");
  let getString = state("");
  const doGreet = () => {
    Greet(get(name)).then((result) => {
      console.log(result);
      set(resultElement, proxy(result));
    }).catch((err) => {
      console.log(err);
      set(resultElement, "Error: " + err);
    });
  };
  var div = root();
  var h1 = child(div);
  var text = child(h1);
  reset(h1);
  var input = sibling(h1, 4);
  remove_input_defaults(input);
  input.__keyup = [on_keyup, doGreet];
  var button = sibling(input, 2);
  button.__click = doGreet;
  var p = sibling(button, 2);
  var text_1 = child(p);
  reset(p);
  var button_1 = sibling(p, 2);
  button_1.__click = [doCHello, cHelloOut];
  var p_1 = sibling(button_1, 2);
  var text_2 = child(p_1);
  reset(p_1);
  var input_1 = sibling(p_1, 2);
  remove_input_defaults(input_1);
  var button_2 = sibling(input_1, 2);
  button_2.__click = [doGetString, getString, cStringOut];
  var p_2 = sibling(button_2, 2);
  var text_3 = child(p_2);
  reset(p_2);
  var p_3 = sibling(p_2, 2);
  var text_4 = child(p_3);
  reset(p_3);
  next(2);
  reset(div);
  template_effect(() => {
    set_text(text, `Hello ${get(name) ?? ""}!`);
    set_text(text_1, `The output is: ${get(resultElement) ?? ""}`);
    set_text(text_2, `The output is: ${get(cHelloOut) ?? ""}`);
    set_text(text_3, `The output is: ${get(cStringOut) ?? ""}`);
    set_text(text_4, `Time: ${$time() ?? ""}`);
  });
  bind_value(input, () => get(name), ($$value) => set(name, $$value));
  bind_value(input_1, () => get(getString), ($$value) => set(getString, $$value));
  append($$anchor, div);
  pop();
  $$cleanup();
}
delegate(["keyup", "click"]);
export {
  _page as component
};
