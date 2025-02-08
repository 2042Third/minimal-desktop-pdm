import { S as STATE_SYMBOL, z as object_prototype, A as array_prototype, B as source, C as state_prototype_fixed, D as get, U as UNINITIALIZED, F as set, G as get_descriptor, I as active_effect, J as state_descriptors_fixed, K as get_prototype_of, L as is_array, M as noop, N as mutable_source, O as teardown, P as define_property } from "./TdN3I5eQ.js";
import { s as subscribe_to_store, g as get$1 } from "./En2E40Cu.js";
function proxy(value, parent = null, prev) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = source(0);
  if (is_proxied_array) {
    sources.set("length", source(
      /** @type {any[]} */
      value.length
    ));
  }
  var metadata;
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop);
        if (s === void 0) {
          s = source(descriptor.value);
          sources.set(prop, s);
        } else {
          set(s, proxy(descriptor.value, metadata));
        }
        return true;
      },
      deleteProperty(target, prop) {
        var s = sources.get(prop);
        if (s === void 0) {
          if (prop in target) {
            sources.set(prop, source(UNINITIALIZED));
          }
        } else {
          if (is_proxied_array && typeof prop === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop);
            if (Number.isInteger(n) && n < ls.v) {
              set(ls, n);
            }
          }
          set(s, UNINITIALIZED);
          update_version(version);
        }
        return true;
      },
      get(target, prop, receiver) {
        var _a;
        if (prop === STATE_SYMBOL) {
          return value;
        }
        var s = sources.get(prop);
        var exists = prop in target;
        if (s === void 0 && (!exists || ((_a = get_descriptor(target, prop)) == null ? void 0 : _a.writable))) {
          s = source(proxy(exists ? target[prop] : UNINITIALIZED, metadata));
          sources.set(prop, s);
        }
        if (s !== void 0) {
          var v = get(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop, receiver);
      },
      getOwnPropertyDescriptor(target, prop) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop);
          if (s) descriptor.value = get(s);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop);
          var value2 = source2 == null ? void 0 : source2.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop) {
        var _a;
        if (prop === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
        if (s !== void 0 || active_effect !== null && (!has || ((_a = get_descriptor(target, prop)) == null ? void 0 : _a.writable))) {
          if (s === void 0) {
            s = source(has ? proxy(target[prop], metadata) : UNINITIALIZED);
            sources.set(prop, s);
          }
          var value2 = get(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop, value2, receiver) {
        var _a;
        var s = sources.get(prop);
        var has = prop in target;
        if (is_proxied_array && prop === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = source(UNINITIALIZED);
              sources.set(i + "", other_s);
            }
          }
        }
        if (s === void 0) {
          if (!has || ((_a = get_descriptor(target, prop)) == null ? void 0 : _a.writable)) {
            s = source(void 0);
            set(s, proxy(value2, metadata));
            sources.set(prop, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          set(s, proxy(value2, metadata));
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        if (descriptor == null ? void 0 : descriptor.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          update_version(version);
        }
        return true;
      },
      ownKeys(target) {
        get(version);
        var own_keys = Reflect.ownKeys(target).filter((key2) => {
          var source3 = sources.get(key2);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key in target)) {
            own_keys.push(key);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function update_version(signal, d = 1) {
  set(signal, signal.v + d);
}
let is_store_binding = false;
let IS_UNMOUNTED = Symbol();
function store_get(store, store_name, stores) {
  const entry = stores[store_name] ?? (stores[store_name] = {
    store: null,
    source: mutable_source(void 0),
    unsubscribe: noop
  });
  if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
    entry.unsubscribe();
    entry.store = store ?? null;
    if (store == null) {
      entry.source.v = void 0;
      entry.unsubscribe = noop;
    } else {
      var is_synchronous_callback = true;
      entry.unsubscribe = subscribe_to_store(store, (v) => {
        if (is_synchronous_callback) {
          entry.source.v = v;
        } else {
          set(entry.source, v);
        }
      });
      is_synchronous_callback = false;
    }
  }
  if (store && IS_UNMOUNTED in stores) {
    return get$1(store);
  }
  return get(entry.source);
}
function store_set(store, value) {
  store.set(value);
  return value;
}
function setup_stores() {
  const stores = {};
  function cleanup() {
    teardown(() => {
      for (var store_name in stores) {
        const ref = stores[store_name];
        ref.unsubscribe();
      }
      define_property(stores, IS_UNMOUNTED, {
        enumerable: false,
        value: true
      });
    });
  }
  return [stores, cleanup];
}
function store_mutate(store, expression, new_value) {
  store.set(new_value);
  return expression;
}
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}
export {
  setup_stores as a,
  store_set as b,
  store_mutate as c,
  capture_store_binding as d,
  proxy as p,
  store_get as s
};
