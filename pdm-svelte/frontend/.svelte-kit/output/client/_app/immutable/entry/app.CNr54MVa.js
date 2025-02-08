const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.CjEyEd10.js","../chunks/CRVcQe8l.js","../assets/0.ImIExgMV.css","../nodes/1.hG_o33DK.js","../nodes/2.DsI0U-xR.js","../chunks/CQrtv1eE.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "../chunks/CQrtv1eE.js";
import { p as push, o as prop, u as user_pre_effect, q as user_effect, v as onMount, g as get, k as state, l as set, w as tick, m as proxy, t as template, f as first_child, x as if_block, b as sibling, a as append, h as pop, y as comment, z as component, c as child, r as reset, A as bind_this, i as derived, B as text, e as template_effect, j as set_text, C as asClassComponent } from "../chunks/CRVcQe8l.js";
const matchers = {};
var root_4 = template(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root$1 = template(`<!> <!>`, 1);
function Root($$anchor, $$props) {
  push($$props, true);
  let components = prop($$props, "components", 23, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null);
  {
    user_pre_effect(() => $$props.stores.page.set($$props.page));
  }
  user_effect(() => {
    $$props.stores;
    $$props.page;
    $$props.constructors;
    components();
    $$props.form;
    data_0();
    data_1();
    $$props.stores.page.notify();
  });
  let mounted = state(false);
  let navigated = state(false);
  let title = state(null);
  onMount(() => {
    const unsubscribe = $$props.stores.page.subscribe(() => {
      if (get(mounted)) {
        set(navigated, true);
        tick().then(() => {
          set(title, proxy(document.title || "untitled page"));
        });
      }
    });
    set(mounted, true);
    return unsubscribe;
  });
  const Pyramid_1 = derived(() => $$props.constructors[1]);
  var fragment = root$1();
  var node = first_child(fragment);
  {
    var consequent = ($$anchor2) => {
      var fragment_1 = comment();
      const Pyramid_0 = derived(() => $$props.constructors[0]);
      var node_1 = first_child(fragment_1);
      component(node_1, () => get(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            },
            children: ($$anchor4, $$slotProps) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              component(node_2, () => get(Pyramid_1), ($$anchor5, $$component2) => {
                bind_this(
                  $$component2($$anchor5, {
                    get data() {
                      return data_1();
                    },
                    get form() {
                      return $$props.form;
                    }
                  }),
                  ($$value) => components()[1] = $$value,
                  () => {
                    var _a;
                    return (_a = components()) == null ? void 0 : _a[1];
                  }
                );
              });
              append($$anchor4, fragment_2);
            },
            $$slots: { default: true }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_1);
    };
    var alternate = ($$anchor2) => {
      var fragment_3 = comment();
      const Pyramid_0 = derived(() => $$props.constructors[0]);
      var node_3 = first_child(fragment_3);
      component(node_3, () => get(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_3);
    };
    if_block(node, ($$render) => {
      if ($$props.constructors[1]) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  var node_4 = sibling(node, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var div = root_4();
      var node_5 = child(div);
      {
        var consequent_1 = ($$anchor3) => {
          var text$1 = text();
          template_effect(() => set_text(text$1, get(title)));
          append($$anchor3, text$1);
        };
        if_block(node_5, ($$render) => {
          if (get(navigated)) $$render(consequent_1);
        });
      }
      reset(div);
      append($$anchor2, div);
    };
    if_block(node_4, ($$render) => {
      if (get(mounted)) $$render(consequent_2);
    });
  }
  append($$anchor, fragment);
  pop();
}
const root = asClassComponent(Root);
const nodes = [
  () => __vitePreload(() => import("../nodes/0.CjEyEd10.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/1.hG_o33DK.js"), true ? __vite__mapDeps([3,1]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/2.DsI0U-xR.js"), true ? __vite__mapDeps([4,1,5]) : void 0, import.meta.url)
];
const server_loads = [];
const dictionary = {
  "/": [2]
};
const hooks = {
  handleError: ({ error }) => {
    console.error(error);
  },
  reroute: () => {
  },
  transport: {}
};
const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
const hash = false;
const decode = (type, value) => decoders[type](value);
export {
  decode,
  decoders,
  dictionary,
  hash,
  hooks,
  matchers,
  nodes,
  root,
  server_loads
};
