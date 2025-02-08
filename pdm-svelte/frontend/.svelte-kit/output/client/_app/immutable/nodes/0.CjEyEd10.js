import { t as template, s as slot, a as append, c as child, r as reset } from "../chunks/CRVcQe8l.js";
var root = template(`<div class="min-h-screen"><!></div>`);
function _layout($$anchor, $$props) {
  var div = root();
  var node = child(div);
  slot(node, $$props, "default", {});
  reset(div);
  append($$anchor, div);
}
export {
  _layout as component
};
