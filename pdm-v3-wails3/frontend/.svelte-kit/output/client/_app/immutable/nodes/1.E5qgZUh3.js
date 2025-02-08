import { t as template, a as append } from "../chunks/BGQeMav5.js";
import "../chunks/DSlFIRKF.js";
import { p as push, f as first_child, t as template_effect, a as pop, c as child, r as reset, s as sibling } from "../chunks/TdN3I5eQ.js";
import { s as set_text } from "../chunks/Cv_58GG0.js";
import { i as init, p as page } from "../chunks/BKaRVucg.js";
var root = template(`<h1> </h1> <p> </p>`, 1);
function Error($$anchor, $$props) {
  push($$props, false);
  init();
  var fragment = root();
  var h1 = first_child(fragment);
  var text = child(h1, true);
  reset(h1);
  var p = sibling(h1, 2);
  var text_1 = child(p, true);
  reset(p);
  template_effect(() => {
    var _a;
    set_text(text, page.status);
    set_text(text_1, (_a = page.error) == null ? void 0 : _a.message);
  });
  append($$anchor, fragment);
  pop();
}
export {
  Error as component
};
