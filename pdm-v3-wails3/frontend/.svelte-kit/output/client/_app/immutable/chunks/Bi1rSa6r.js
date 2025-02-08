import { h as hydrating, aD as queue_idle_task, aE as LOADING_ATTR_SYMBOL, K as get_prototype_of, aF as get_descriptors, aG as is_runes, u as untrack, q as render_effect } from "./TdN3I5eQ.js";
import { a as add_form_reset_listener, l as listen_to_event_and_reset_event } from "./Cv_58GG0.js";
function remove_input_defaults(input) {
  if (!hydrating) return;
  var already_removed = false;
  var remove_defaults = () => {
    if (already_removed) return;
    already_removed = true;
    if (input.hasAttribute("value")) {
      var value = input.value;
      set_attribute(input, "value", null);
      input.value = value;
    }
    if (input.hasAttribute("checked")) {
      var checked = input.checked;
      set_attribute(input, "checked", null);
      input.checked = checked;
    }
  };
  input.__on_r = remove_defaults;
  queue_idle_task(remove_defaults);
  add_form_reset_listener();
}
function set_attribute(element, attribute, value, skip_warning) {
  var attributes = element.__attributes ?? (element.__attributes = {});
  if (hydrating) {
    attributes[attribute] = element.getAttribute(attribute);
    if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === "LINK") {
      return;
    }
  }
  if (attributes[attribute] === (attributes[attribute] = value)) return;
  if (attribute === "style" && "__styles" in element) {
    element.__styles = {};
  }
  if (attribute === "loading") {
    element[LOADING_ATTR_SYMBOL] = value;
  }
  if (value == null) {
    element.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
    element[attribute] = value;
  } else {
    element.setAttribute(attribute, value);
  }
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element) {
  var setters = setters_cache.get(element.nodeName);
  if (setters) return setters;
  setters_cache.set(element.nodeName, setters = []);
  var descriptors;
  var proto = element;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key in descriptors) {
      if (descriptors[key].set) {
        setters.push(key);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function bind_value(input, get, set = get) {
  var runes = is_runes();
  listen_to_event_and_reset_event(input, "input", (is_reset) => {
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set(value);
    if (runes && value !== (value = get())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      input.value = value ?? "";
      if (end !== null) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      }
    }
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the updated value from the input instead.
    hydrating && input.defaultValue !== input.value || // If defaultValue is set, then value == defaultValue
    // TODO Svelte 6: remove input.value check and set to empty string?
    untrack(get) == null && input.value
  ) {
    set(is_numberlike_input(input) ? to_number(input.value) : input.value);
  }
  render_effect(() => {
    var value = get();
    if (is_numberlike_input(input) && value === to_number(input.value)) {
      return;
    }
    if (input.type === "date" && !value && !input.value) {
      return;
    }
    if (value !== input.value) {
      input.value = value ?? "";
    }
  });
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}
var ge = Object.defineProperty;
var w = (e2, i) => {
  for (var n in i) ge(e2, n, { get: i[n], enumerable: true });
};
var G = {};
w(G, { Application: () => $, Browser: () => I, Call: () => ee, Clipboard: () => ie, Create: () => ne, Dialogs: () => B, Events: () => N, Flags: () => Q, Screens: () => oe, System: () => X, WML: () => j, Window: () => E });
var j = {};
w(j, { Enable: () => Z, Reload: () => me });
var I = {};
w(I, { OpenURL: () => P });
var fe = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var D = (e2 = 21) => {
  let i = "", n = e2;
  for (; n--; ) i += fe[Math.random() * 64 | 0];
  return i;
};
var De = window.location.origin + "/wails/runtime", l = { Call: 0, Clipboard: 1, Application: 2, Events: 3, ContextMenu: 4, Dialog: 5, Window: 6, Screens: 7, System: 8, Browser: 9, CancelCall: 10 }, Me = D();
function d(e2, i) {
  return function(n, t = null) {
    return Ce(e2, n, i, t);
  };
}
function Ce(e2, i, n, t) {
  let r = new URL(De);
  r.searchParams.append("object", e2), r.searchParams.append("method", i);
  let s = { headers: {} };
  return n && (s.headers["x-wails-window-name"] = n), t && r.searchParams.append("args", JSON.stringify(t)), s.headers["x-wails-client-id"] = Me, new Promise((c, m) => {
    fetch(r, s).then((a) => {
      if (a.ok) return a.headers.get("Content-Type") && a.headers.get("Content-Type").indexOf("application/json") !== -1 ? a.json() : a.text();
      m(Error(a.statusText));
    }).then((a) => c(a)).catch((a) => m(a));
  });
}
var Se = d(l.Browser, ""), xe = 0;
function P(e2) {
  return Se(xe, { url: e2 });
}
var B = {};
w(B, { Error: () => Be, Info: () => Ie, OpenFile: () => ze, Question: () => T, SaveFile: () => ke, Warning: () => Te });
window._wails = window._wails || {};
window._wails.dialogErrorCallback = Pe;
window._wails.dialogResultCallback = Oe;
var Ae = 0, ve = 1, be = 2, Re = 3, Ee = 4, ye = 5, Ue = d(l.Dialog, ""), h = /* @__PURE__ */ new Map();
function Fe() {
  let e2;
  do
    e2 = D();
  while (h.has(e2));
  return e2;
}
function M(e2, i = {}) {
  let n = Fe();
  return i["dialog-id"] = n, new Promise((t, r) => {
    h.set(n, { resolve: t, reject: r }), Ue(e2, i).catch((s) => {
      r(s), h.delete(n);
    });
  });
}
function Oe(e2, i, n) {
  let t = h.get(e2);
  t && (n ? t.resolve(JSON.parse(i)) : t.resolve(i), h.delete(e2));
}
function Pe(e2, i) {
  let n = h.get(e2);
  n && (n.reject(i), h.delete(e2));
}
var Ie = (e2) => M(Ae, e2), Te = (e2) => M(ve, e2), Be = (e2) => M(be, e2), T = (e2) => M(Re, e2), ze = (e2) => M(Ee, e2), ke = (e2) => M(ye, e2);
var N = {};
w(N, { Emit: () => L, Off: () => Ye, OffAll: () => Ke, On: () => Ze, OnMultiple: () => k, Once: () => je, Types: () => Le, WailsEvent: () => A, setup: () => Ve });
var ae = { Windows: { SystemThemeChanged: "windows:SystemThemeChanged", APMPowerStatusChange: "windows:APMPowerStatusChange", APMSuspend: "windows:APMSuspend", APMResumeAutomatic: "windows:APMResumeAutomatic", APMResumeSuspend: "windows:APMResumeSuspend", APMPowerSettingChange: "windows:APMPowerSettingChange", ApplicationStarted: "windows:ApplicationStarted", WebViewNavigationCompleted: "windows:WebViewNavigationCompleted", WindowInactive: "windows:WindowInactive", WindowActive: "windows:WindowActive", WindowClickActive: "windows:WindowClickActive", WindowMaximise: "windows:WindowMaximise", WindowUnMaximise: "windows:WindowUnMaximise", WindowFullscreen: "windows:WindowFullscreen", WindowUnFullscreen: "windows:WindowUnFullscreen", WindowRestore: "windows:WindowRestore", WindowMinimise: "windows:WindowMinimise", WindowUnMinimise: "windows:WindowUnMinimise", WindowClose: "windows:WindowClose", WindowSetFocus: "windows:WindowSetFocus", WindowKillFocus: "windows:WindowKillFocus", WindowDragDrop: "windows:WindowDragDrop", WindowDragEnter: "windows:WindowDragEnter", WindowDragLeave: "windows:WindowDragLeave", WindowDragOver: "windows:WindowDragOver", WindowDidMove: "windows:WindowDidMove", WindowDidResize: "windows:WindowDidResize" }, Mac: { ApplicationDidBecomeActive: "mac:ApplicationDidBecomeActive", ApplicationDidChangeBackingProperties: "mac:ApplicationDidChangeBackingProperties", ApplicationDidChangeEffectiveAppearance: "mac:ApplicationDidChangeEffectiveAppearance", ApplicationDidChangeIcon: "mac:ApplicationDidChangeIcon", ApplicationDidChangeOcclusionState: "mac:ApplicationDidChangeOcclusionState", ApplicationDidChangeScreenParameters: "mac:ApplicationDidChangeScreenParameters", ApplicationDidChangeStatusBarFrame: "mac:ApplicationDidChangeStatusBarFrame", ApplicationDidChangeStatusBarOrientation: "mac:ApplicationDidChangeStatusBarOrientation", ApplicationDidFinishLaunching: "mac:ApplicationDidFinishLaunching", ApplicationDidHide: "mac:ApplicationDidHide", ApplicationDidResignActiveNotification: "mac:ApplicationDidResignActiveNotification", ApplicationDidUnhide: "mac:ApplicationDidUnhide", ApplicationDidUpdate: "mac:ApplicationDidUpdate", ApplicationWillBecomeActive: "mac:ApplicationWillBecomeActive", ApplicationWillFinishLaunching: "mac:ApplicationWillFinishLaunching", ApplicationWillHide: "mac:ApplicationWillHide", ApplicationWillResignActive: "mac:ApplicationWillResignActive", ApplicationWillTerminate: "mac:ApplicationWillTerminate", ApplicationWillUnhide: "mac:ApplicationWillUnhide", ApplicationWillUpdate: "mac:ApplicationWillUpdate", ApplicationDidChangeTheme: "mac:ApplicationDidChangeTheme!", ApplicationShouldHandleReopen: "mac:ApplicationShouldHandleReopen!", WindowDidBecomeKey: "mac:WindowDidBecomeKey", WindowDidBecomeMain: "mac:WindowDidBecomeMain", WindowDidBeginSheet: "mac:WindowDidBeginSheet", WindowDidChangeAlpha: "mac:WindowDidChangeAlpha", WindowDidChangeBackingLocation: "mac:WindowDidChangeBackingLocation", WindowDidChangeBackingProperties: "mac:WindowDidChangeBackingProperties", WindowDidChangeCollectionBehavior: "mac:WindowDidChangeCollectionBehavior", WindowDidChangeEffectiveAppearance: "mac:WindowDidChangeEffectiveAppearance", WindowDidChangeOcclusionState: "mac:WindowDidChangeOcclusionState", WindowDidChangeOrderingMode: "mac:WindowDidChangeOrderingMode", WindowDidChangeScreen: "mac:WindowDidChangeScreen", WindowDidChangeScreenParameters: "mac:WindowDidChangeScreenParameters", WindowDidChangeScreenProfile: "mac:WindowDidChangeScreenProfile", WindowDidChangeScreenSpace: "mac:WindowDidChangeScreenSpace", WindowDidChangeScreenSpaceProperties: "mac:WindowDidChangeScreenSpaceProperties", WindowDidChangeSharingType: "mac:WindowDidChangeSharingType", WindowDidChangeSpace: "mac:WindowDidChangeSpace", WindowDidChangeSpaceOrderingMode: "mac:WindowDidChangeSpaceOrderingMode", WindowDidChangeTitle: "mac:WindowDidChangeTitle", WindowDidChangeToolbar: "mac:WindowDidChangeToolbar", WindowDidChangeVisibility: "mac:WindowDidChangeVisibility", WindowDidDeminiaturize: "mac:WindowDidDeminiaturize", WindowDidEndSheet: "mac:WindowDidEndSheet", WindowDidEnterFullScreen: "mac:WindowDidEnterFullScreen", WindowDidEnterVersionBrowser: "mac:WindowDidEnterVersionBrowser", WindowDidExitFullScreen: "mac:WindowDidExitFullScreen", WindowDidExitVersionBrowser: "mac:WindowDidExitVersionBrowser", WindowDidExpose: "mac:WindowDidExpose", WindowDidFocus: "mac:WindowDidFocus", WindowDidMiniaturize: "mac:WindowDidMiniaturize", WindowDidMove: "mac:WindowDidMove", WindowDidOrderOffScreen: "mac:WindowDidOrderOffScreen", WindowDidOrderOnScreen: "mac:WindowDidOrderOnScreen", WindowDidResignKey: "mac:WindowDidResignKey", WindowDidResignMain: "mac:WindowDidResignMain", WindowDidResize: "mac:WindowDidResize", WindowDidUpdate: "mac:WindowDidUpdate", WindowDidUpdateAlpha: "mac:WindowDidUpdateAlpha", WindowDidUpdateCollectionBehavior: "mac:WindowDidUpdateCollectionBehavior", WindowDidUpdateCollectionProperties: "mac:WindowDidUpdateCollectionProperties", WindowDidUpdateShadow: "mac:WindowDidUpdateShadow", WindowDidUpdateTitle: "mac:WindowDidUpdateTitle", WindowDidUpdateToolbar: "mac:WindowDidUpdateToolbar", WindowDidUpdateVisibility: "mac:WindowDidUpdateVisibility", WindowShouldClose: "mac:WindowShouldClose!", WindowWillBecomeKey: "mac:WindowWillBecomeKey", WindowWillBecomeMain: "mac:WindowWillBecomeMain", WindowWillBeginSheet: "mac:WindowWillBeginSheet", WindowWillChangeOrderingMode: "mac:WindowWillChangeOrderingMode", WindowWillClose: "mac:WindowWillClose", WindowWillDeminiaturize: "mac:WindowWillDeminiaturize", WindowWillEnterFullScreen: "mac:WindowWillEnterFullScreen", WindowWillEnterVersionBrowser: "mac:WindowWillEnterVersionBrowser", WindowWillExitFullScreen: "mac:WindowWillExitFullScreen", WindowWillExitVersionBrowser: "mac:WindowWillExitVersionBrowser", WindowWillFocus: "mac:WindowWillFocus", WindowWillMiniaturize: "mac:WindowWillMiniaturize", WindowWillMove: "mac:WindowWillMove", WindowWillOrderOffScreen: "mac:WindowWillOrderOffScreen", WindowWillOrderOnScreen: "mac:WindowWillOrderOnScreen", WindowWillResignMain: "mac:WindowWillResignMain", WindowWillResize: "mac:WindowWillResize", WindowWillUnfocus: "mac:WindowWillUnfocus", WindowWillUpdate: "mac:WindowWillUpdate", WindowWillUpdateAlpha: "mac:WindowWillUpdateAlpha", WindowWillUpdateCollectionBehavior: "mac:WindowWillUpdateCollectionBehavior", WindowWillUpdateCollectionProperties: "mac:WindowWillUpdateCollectionProperties", WindowWillUpdateShadow: "mac:WindowWillUpdateShadow", WindowWillUpdateTitle: "mac:WindowWillUpdateTitle", WindowWillUpdateToolbar: "mac:WindowWillUpdateToolbar", WindowWillUpdateVisibility: "mac:WindowWillUpdateVisibility", WindowWillUseStandardFrame: "mac:WindowWillUseStandardFrame", MenuWillOpen: "mac:MenuWillOpen", MenuDidOpen: "mac:MenuDidOpen", MenuDidClose: "mac:MenuDidClose", MenuWillSendAction: "mac:MenuWillSendAction", MenuDidSendAction: "mac:MenuDidSendAction", MenuWillHighlightItem: "mac:MenuWillHighlightItem", MenuDidHighlightItem: "mac:MenuDidHighlightItem", MenuWillDisplayItem: "mac:MenuWillDisplayItem", MenuDidDisplayItem: "mac:MenuDidDisplayItem", MenuWillAddItem: "mac:MenuWillAddItem", MenuDidAddItem: "mac:MenuDidAddItem", MenuWillRemoveItem: "mac:MenuWillRemoveItem", MenuDidRemoveItem: "mac:MenuDidRemoveItem", MenuWillBeginTracking: "mac:MenuWillBeginTracking", MenuDidBeginTracking: "mac:MenuDidBeginTracking", MenuWillEndTracking: "mac:MenuWillEndTracking", MenuDidEndTracking: "mac:MenuDidEndTracking", MenuWillUpdate: "mac:MenuWillUpdate", MenuDidUpdate: "mac:MenuDidUpdate", MenuWillPopUp: "mac:MenuWillPopUp", MenuDidPopUp: "mac:MenuDidPopUp", MenuWillSendActionToItem: "mac:MenuWillSendActionToItem", MenuDidSendActionToItem: "mac:MenuDidSendActionToItem", WebViewDidStartProvisionalNavigation: "mac:WebViewDidStartProvisionalNavigation", WebViewDidReceiveServerRedirectForProvisionalNavigation: "mac:WebViewDidReceiveServerRedirectForProvisionalNavigation", WebViewDidFinishNavigation: "mac:WebViewDidFinishNavigation", WebViewDidCommitNavigation: "mac:WebViewDidCommitNavigation", WindowFileDraggingEntered: "mac:WindowFileDraggingEntered", WindowFileDraggingPerformed: "mac:WindowFileDraggingPerformed", WindowFileDraggingExited: "mac:WindowFileDraggingExited" }, Linux: { SystemThemeChanged: "linux:SystemThemeChanged", WindowLoadChanged: "linux:WindowLoadChanged", WindowDeleteEvent: "linux:WindowDeleteEvent", WindowDidMove: "linux:WindowDidMove", WindowDidResize: "linux:WindowDidResize", WindowFocusIn: "linux:WindowFocusIn", WindowFocusOut: "linux:WindowFocusOut", ApplicationStartup: "linux:ApplicationStartup" }, Common: { ApplicationStarted: "common:ApplicationStarted", WindowMaximise: "common:WindowMaximise", WindowUnMaximise: "common:WindowUnMaximise", WindowFullscreen: "common:WindowFullscreen", WindowUnFullscreen: "common:WindowUnFullscreen", WindowRestore: "common:WindowRestore", WindowMinimise: "common:WindowMinimise", WindowUnMinimise: "common:WindowUnMinimise", WindowClosing: "common:WindowClosing", WindowZoom: "common:WindowZoom", WindowZoomIn: "common:WindowZoomIn", WindowZoomOut: "common:WindowZoomOut", WindowZoomReset: "common:WindowZoomReset", WindowFocus: "common:WindowFocus", WindowLostFocus: "common:WindowLostFocus", WindowShow: "common:WindowShow", WindowHide: "common:WindowHide", WindowDPIChanged: "common:WindowDPIChanged", WindowFilesDropped: "common:WindowFilesDropped", WindowRuntimeReady: "common:WindowRuntimeReady", ThemeChanged: "common:ThemeChanged", WindowDidMove: "common:WindowDidMove", WindowDidResize: "common:WindowDidResize" } };
var Le = ae;
window._wails = window._wails || {};
window._wails.dispatchWailsEvent = _e;
var Ne = d(l.Events, ""), He = 0, u = /* @__PURE__ */ new Map(), z = class {
  constructor(i, n, t) {
    this.eventName = i, this.maxCallbacks = t || -1, this.Callback = (r) => (n(r), this.maxCallbacks === -1 ? false : (this.maxCallbacks -= 1, this.maxCallbacks === 0));
  }
}, A = class {
  constructor(i, n = null) {
    this.name = i, this.data = n;
  }
};
function Ve() {
}
function _e(e2) {
  let i = u.get(e2.name);
  if (i) {
    let n = i.filter((t) => {
      if (t.Callback(e2)) return true;
    });
    n.length > 0 && (i = i.filter((t) => !n.includes(t)), i.length === 0 ? u.delete(e2.name) : u.set(e2.name, i));
  }
}
function k(e2, i, n) {
  let t = u.get(e2) || [], r = new z(e2, i, n);
  return t.push(r), u.set(e2, t), () => Ge(r);
}
function Ze(e2, i) {
  return k(e2, i, -1);
}
function je(e2, i) {
  return k(e2, i, 1);
}
function Ge(e2) {
  let i = e2.eventName, n = u.get(i).filter((t) => t !== e2);
  n.length === 0 ? u.delete(i) : u.set(i, n);
}
function Ye(e2, ...i) {
  [e2, ...i].forEach((t) => u.delete(t));
}
function Ke() {
  u.clear();
}
function L(e2) {
  return Ne(He, e2);
}
function le() {
  if (!EventTarget || !AbortSignal || !AbortController) return false;
  let e2 = true, i = new EventTarget(), n = new AbortController();
  return i.addEventListener("test", () => {
    e2 = false;
  }, { signal: n.signal }), n.abort(), i.dispatchEvent(new CustomEvent("test")), e2;
}
var de = false;
document.addEventListener("DOMContentLoaded", () => de = true);
function se(e2) {
  de || document.readyState === "complete" ? e2() : document.addEventListener("DOMContentLoaded", e2);
}
var Xe = 0, Qe = 1, Je = 2, qe = 3, $e = 4, ei = 5, ii = 6, ni = 7, ti = 8, oi = 9, ri = 10, ai = 11, li = 12, di = 13, si = 14, ci = 15, wi = 16, mi = 17, ui = 18, pi = 19, Wi = 20, hi = 21, gi = 22, fi = 23, Di = 24, Mi = 25, Ci = 26, Si = 27, xi = 28, Ai = 29, vi = 30, bi = 31, Ri = 32, Ei = 33, yi = 34, Ui = 35, Fi = 36, Oi = 37, Pi = 38, Ii = 39, Ti = 40, Bi = 41, zi = 42, ki = 43, Li = 44, Ni = 45, Hi = 46, Vi = 47, o = Symbol(), H = class e {
  constructor(i = "") {
    this[o] = d(l.Window, i);
    for (let n of Object.getOwnPropertyNames(e.prototype)) n !== "constructor" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
  }
  Get(i) {
    return new e(i);
  }
  Position() {
    return this[o](Xe);
  }
  Center() {
    return this[o](Qe);
  }
  Close() {
    return this[o](Je);
  }
  DisableSizeConstraints() {
    return this[o](qe);
  }
  EnableSizeConstraints() {
    return this[o]($e);
  }
  Focus() {
    return this[o](ei);
  }
  ForceReload() {
    return this[o](ii);
  }
  Fullscreen() {
    return this[o](ni);
  }
  GetScreen() {
    return this[o](ti);
  }
  GetZoom() {
    return this[o](oi);
  }
  Height() {
    return this[o](ri);
  }
  Hide() {
    return this[o](ai);
  }
  IsFocused() {
    return this[o](li);
  }
  IsFullscreen() {
    return this[o](di);
  }
  IsMaximised() {
    return this[o](si);
  }
  IsMinimised() {
    return this[o](ci);
  }
  Maximise() {
    return this[o](wi);
  }
  Minimise() {
    return this[o](mi);
  }
  Name() {
    return this[o](ui);
  }
  OpenDevTools() {
    return this[o](pi);
  }
  RelativePosition() {
    return this[o](Wi);
  }
  Reload() {
    return this[o](hi);
  }
  Resizable() {
    return this[o](gi);
  }
  Restore() {
    return this[o](fi);
  }
  SetPosition(i, n) {
    return this[o](Di, { x: i, y: n });
  }
  SetAlwaysOnTop(i) {
    return this[o](Mi, { alwaysOnTop: i });
  }
  SetBackgroundColour(i, n, t, r) {
    return this[o](Ci, { r: i, g: n, b: t, a: r });
  }
  SetFrameless(i) {
    return this[o](Si, { frameless: i });
  }
  SetFullscreenButtonEnabled(i) {
    return this[o](xi, { enabled: i });
  }
  SetMaxSize(i, n) {
    return this[o](Ai, { width: i, height: n });
  }
  SetMinSize(i, n) {
    return this[o](vi, { width: i, height: n });
  }
  SetRelativePosition(i, n) {
    return this[o](bi, { x: i, y: n });
  }
  SetResizable(i) {
    return this[o](Ri, { resizable: i });
  }
  SetSize(i, n) {
    return this[o](Ei, { width: i, height: n });
  }
  SetTitle(i) {
    return this[o](yi, { title: i });
  }
  SetZoom(i) {
    return this[o](Ui, { zoom: i });
  }
  Show() {
    return this[o](Fi);
  }
  Size() {
    return this[o](Oi);
  }
  ToggleFullscreen() {
    return this[o](Pi);
  }
  ToggleMaximise() {
    return this[o](Ii);
  }
  UnFullscreen() {
    return this[o](Ti);
  }
  UnMaximise() {
    return this[o](Bi);
  }
  UnMinimise() {
    return this[o](zi);
  }
  Width() {
    return this[o](ki);
  }
  Zoom() {
    return this[o](Li);
  }
  ZoomIn() {
    return this[o](Ni);
  }
  ZoomOut() {
    return this[o](Hi);
  }
  ZoomReset() {
    return this[o](Vi);
  }
}, _i = new H(""), E = _i;
function Zi(e2, i = null) {
  L(new A(e2, i));
}
function ji(e2, i) {
  let n = E.Get(e2), t = n[i];
  if (typeof t == "function") try {
    t.call(n);
  } catch {
  }
}
function ce(e2) {
  let i = e2.currentTarget;
  function n(r = "Yes") {
    if (r !== "Yes") return;
    let s = i.getAttribute("wml-event"), c = i.getAttribute("wml-target-window") || "", m = i.getAttribute("wml-window"), a = i.getAttribute("wml-openurl");
    s !== null && Zi(s), m !== null && ji(c, m), a !== null && P(a);
  }
  let t = i.getAttribute("wml-confirm");
  t ? T({ Title: "Confirm", Message: t, Detached: false, Buttons: [{ Label: "Yes" }, { Label: "No", IsDefault: true }] }).then(n) : n();
}
var y = Symbol(), V = class {
  constructor() {
    this[y] = new AbortController();
  }
  set(i, n) {
    return { signal: this[y].signal };
  }
  reset() {
    this[y].abort(), this[y] = new AbortController();
  }
}, v = Symbol(), C = Symbol(), _ = class {
  constructor() {
    this[v] = /* @__PURE__ */ new WeakMap(), this[C] = 0;
  }
  set(i, n) {
    return this[C] += !this[v].has(i), this[v].set(i, n), {};
  }
  reset() {
    if (!(this[C] <= 0)) {
      for (let i of document.body.querySelectorAll("*")) {
        if (this[C] <= 0) break;
        let n = this[v].get(i);
        this[C] -= typeof n < "u";
        for (let t of n || []) i.removeEventListener(t, ce);
      }
      this[v] = /* @__PURE__ */ new WeakMap(), this[C] = 0;
    }
  }
}, we = le() ? new V() : new _();
function Gi(e2) {
  let i = /\S+/g, n = e2.getAttribute("wml-trigger") || "click", t = [], r;
  for (; (r = i.exec(n)) !== null; ) t.push(r[0]);
  let s = we.set(e2, t);
  for (let c of t) e2.addEventListener(c, ce, s);
}
function Z() {
  se(me);
}
function me() {
  we.reset(), document.body.querySelectorAll("[wml-event], [wml-window], [wml-openurl]").forEach(Gi);
}
window.wails = G;
Z();
var X = {};
w(X, { Capabilities: () => Qi, Environment: () => Ji, IsAMD64: () => en, IsARM: () => nn, IsARM64: () => tn, IsDarkMode: () => Xi, IsDebug: () => K, IsLinux: () => qi, IsMac: () => $i, IsWindows: () => Y, invoke: () => g });
var ue = d(l.System, ""), Yi = 0, Ki = 1;
function g(e2) {
  return window.chrome ? window.chrome.webview.postMessage(e2) : window.webkit.messageHandlers.external.postMessage(e2);
}
function Xi() {
  return ue(Yi);
}
function Qi() {
  return fetch("/wails/capabilities").json();
}
function Ji() {
  return ue(Ki);
}
function Y() {
  return window._wails.environment.OS === "windows";
}
function qi() {
  return window._wails.environment.OS === "linux";
}
function $i() {
  return window._wails.environment.OS === "darwin";
}
function en() {
  return window._wails.environment.Arch === "amd64";
}
function nn() {
  return window._wails.environment.Arch === "arm";
}
function tn() {
  return window._wails.environment.Arch === "arm64";
}
function K() {
  return window._wails.environment.Debug === true;
}
window.addEventListener("contextmenu", ln);
var on = d(l.ContextMenu, ""), rn = 0;
function an(e2, i, n, t) {
  on(rn, { id: e2, x: i, y: n, data: t });
}
function ln(e2) {
  let i = e2.target, n = window.getComputedStyle(i).getPropertyValue("--custom-contextmenu");
  if (n = n ? n.trim() : "", n) {
    e2.preventDefault();
    let t = window.getComputedStyle(i).getPropertyValue("--custom-contextmenu-data");
    an(n, e2.clientX, e2.clientY, t);
    return;
  }
  dn(e2);
}
function dn(e2) {
  if (K()) return;
  let i = e2.target;
  switch (window.getComputedStyle(i).getPropertyValue("--default-contextmenu").trim()) {
    case "show":
      return;
    case "hide":
      e2.preventDefault();
      return;
    default:
      if (i.isContentEditable) return;
      let r = window.getSelection(), s = r.toString().length > 0;
      if (s) for (let c = 0; c < r.rangeCount; c++) {
        let a = r.getRangeAt(c).getClientRects();
        for (let p = 0; p < a.length; p++) {
          let x = a[p];
          if (document.elementFromPoint(x.left, x.top) === i) return;
        }
      }
      if ((i.tagName === "INPUT" || i.tagName === "TEXTAREA") && (s || !i.readOnly && !i.disabled)) return;
      e2.preventDefault();
  }
}
var Q = {};
w(Q, { GetFlag: () => b });
function b(e2) {
  try {
    return window._wails.flags[e2];
  } catch (i) {
    throw new Error("Unable to retrieve flag '" + e2 + "': " + i);
  }
}
var S = false, pe = false, U = null, J = "auto";
window._wails = window._wails || {};
window._wails.setResizable = function(e2) {
  pe = e2;
};
window._wails.endDrag = function() {
  document.body.style.cursor = "default", S = false;
};
window.addEventListener("mousedown", cn);
window.addEventListener("mousemove", mn);
window.addEventListener("mouseup", wn);
function sn(e2) {
  let i = window.getComputedStyle(e2.target).getPropertyValue("--wails-draggable"), n = e2.buttons !== void 0 ? e2.buttons : e2.which;
  return !i || i === "" || i.trim() !== "drag" || n === 0 ? false : e2.detail === 1;
}
function cn(e2) {
  if (U) {
    g("wails:resize:" + U), e2.preventDefault();
    return;
  }
  if (sn(e2)) {
    if (e2.offsetX > e2.target.clientWidth || e2.offsetY > e2.target.clientHeight) return;
    S = true;
  } else S = false;
}
function wn() {
  S = false;
}
function W(e2) {
  document.documentElement.style.cursor = e2 || J, U = e2;
}
function mn(e2) {
  if (S && (S = false, (e2.buttons !== void 0 ? e2.buttons : e2.which) > 0)) {
    g("wails:drag");
    return;
  }
  if (!pe || !Y()) return;
  let i = b("system.resizeHandleHeight") || 5, n = b("system.resizeHandleWidth") || 5, t = b("resizeCornerExtra") || 10, r = window.outerWidth - e2.clientX < n, s = e2.clientX < n, c = e2.clientY < i, m = window.outerHeight - e2.clientY < i, a = window.outerWidth - e2.clientX < n + t, p = e2.clientX < n + t, x = e2.clientY < i + t, re = window.outerHeight - e2.clientY < i + t;
  !s && !r && !c && !m && U !== void 0 ? W() : a && re ? W("se-resize") : p && re ? W("sw-resize") : p && x ? W("nw-resize") : x && a ? W("ne-resize") : s ? W("w-resize") : c ? W("n-resize") : m ? W("s-resize") : r && W("e-resize");
}
var $ = {};
w($, { Hide: () => hn, Quit: () => fn, Show: () => gn });
var q = d(l.Application, ""), un = 0, pn = 1, Wn = 2;
function hn() {
  return q(un);
}
function gn() {
  return q(pn);
}
function fn() {
  return q(Wn);
}
var ee = {};
w(ee, { ByID: () => bn, ByName: () => vn, Call: () => An, Plugin: () => Rn });
window._wails = window._wails || {};
window._wails.callResultHandler = Sn;
window._wails.callErrorHandler = xn;
var F = 0, Dn = d(l.Call, ""), Mn = d(l.CancelCall, ""), R = /* @__PURE__ */ new Map();
function Cn() {
  let e2;
  do
    e2 = D();
  while (R.has(e2));
  return e2;
}
function Sn(e2, i, n) {
  let t = We(e2);
  t && t.resolve(n ? JSON.parse(i) : i);
}
function xn(e2, i) {
  let n = We(e2);
  n && n.reject(i);
}
function We(e2) {
  let i = R.get(e2);
  return R.delete(e2), i;
}
function O(e2, i = {}) {
  let n = Cn(), t = () => Mn(e2, { "call-id": n }), r = false, s = false, c = new Promise((m, a) => {
    i["call-id"] = n, R.set(n, { resolve: m, reject: a }), Dn(e2, i).then((p) => {
      if (s = true, r) return t();
    }).catch((p) => {
      a(p), R.delete(n);
    });
  });
  return c.cancel = () => {
    if (s) return t();
    r = true;
  }, c;
}
function An(e2) {
  return O(F, e2);
}
function vn(e2, ...i) {
  return O(F, { methodName: e2, args: i });
}
function bn(e2, ...i) {
  return O(F, { methodID: e2, args: i });
}
function Rn(e2, i, ...n) {
  return O(F, { packageName: "wails-plugins", structName: e2, methodName: i, args: n });
}
var ie = {};
w(ie, { SetText: () => Un, Text: () => Fn });
var he = d(l.Clipboard, ""), En = 0, yn = 1;
function Un(e2) {
  return he(En, { text: e2 });
}
function Fn() {
  return he(yn);
}
var ne = {};
w(ne, { Any: () => f, Array: () => Pn, ByteSlice: () => On, Map: () => In, Nullable: () => Tn, Struct: () => Bn });
function f(e2) {
  return e2;
}
function On(e2) {
  return e2 ?? "";
}
function Pn(e2) {
  return e2 === f ? (i) => i === null ? [] : i : (i) => {
    if (i === null) return [];
    for (let n = 0; n < i.length; n++) i[n] = e2(i[n]);
    return i;
  };
}
function In(e2, i) {
  return i === f ? (n) => n === null ? {} : n : (n) => {
    if (n === null) return {};
    for (let t in n) n[t] = i(n[t]);
    return n;
  };
}
function Tn(e2) {
  return e2 === f ? f : (i) => i === null ? null : e2(i);
}
function Bn(e2) {
  let i = true;
  for (let n in e2) if (e2[n] !== f) {
    i = false;
    break;
  }
  return i ? f : (n) => {
    for (let t in e2) t in n && (n[t] = e2[t](n[t]));
    return n;
  };
}
var oe = {};
w(oe, { GetAll: () => Nn, GetCurrent: () => Vn, GetPrimary: () => Hn });
var te = d(l.Screens, ""), zn = 0, kn = 1, Ln = 2;
function Nn() {
  return te(zn);
}
function Hn() {
  return te(kn);
}
function Vn() {
  return te(Ln);
}
window._wails = window._wails || {};
window._wails.invoke = g;
g("wails:runtime:ready");
class QueryResult {
  /**
   * Creates a new QueryResult instance.
   * @param {Partial<QueryResult>} [$$source = {}] - The source object to create the QueryResult.
   */
  constructor($$source = {}) {
    if (!("columns" in $$source)) {
      this["columns"] = [];
    }
    if (!("rows" in $$source)) {
      this["rows"] = [];
    }
    if (!("error" in $$source)) {
      this["error"] = "";
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new QueryResult instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {QueryResult}
   */
  static createFrom($$source = {}) {
    const $$createField0_0 = $$createType0$6;
    const $$createField1_0 = $$createType2$3;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("columns" in $$parsedSource) {
      $$parsedSource["columns"] = $$createField0_0($$parsedSource["columns"]);
    }
    if ("rows" in $$parsedSource) {
      $$parsedSource["rows"] = $$createField1_0($$parsedSource["rows"]);
    }
    return new QueryResult(
      /** @type {Partial<QueryResult>} */
      $$parsedSource
    );
  }
}
const $$createType0$6 = ne.Array(ne.Any);
const $$createType1$5 = ne.Array(ne.Any);
const $$createType2$3 = ne.Array($$createType1$5);
let DB$1 = class DB {
  /**
   * Creates a new DB instance.
   * @param {Partial<DB>} [$$source = {}] - The source object to create the DB.
   */
  constructor($$source = {}) {
    Object.assign(this, $$source);
  }
  /**
   * Creates a new DB instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {DB}
   */
  static createFrom($$source = {}) {
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    return new DB(
      /** @type {Partial<DB>} */
      $$parsedSource
    );
  }
};
class Clause {
  /**
   * Creates a new Clause instance.
   * @param {Partial<Clause>} [$$source = {}] - The source object to create the Clause.
   */
  constructor($$source = {}) {
    if (!("Name" in $$source)) {
      this["Name"] = "";
    }
    if (!("BeforeExpression" in $$source)) {
      this["BeforeExpression"] = null;
    }
    if (!("AfterNameExpression" in $$source)) {
      this["AfterNameExpression"] = null;
    }
    if (!("AfterExpression" in $$source)) {
      this["AfterExpression"] = null;
    }
    if (!("Expression" in $$source)) {
      this["Expression"] = null;
    }
    if (!("Builder" in $$source)) {
      this["Builder"] = null;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Clause instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Clause}
   */
  static createFrom($$source = {}) {
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    return new Clause(
      /** @type {Partial<Clause>} */
      $$parsedSource
    );
  }
}
class Expr {
  /**
   * Creates a new Expr instance.
   * @param {Partial<Expr>} [$$source = {}] - The source object to create the Expr.
   */
  constructor($$source = {}) {
    if (!("SQL" in $$source)) {
      this["SQL"] = "";
    }
    if (!("Vars" in $$source)) {
      this["Vars"] = [];
    }
    if (!("WithoutParentheses" in $$source)) {
      this["WithoutParentheses"] = false;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Expr instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Expr}
   */
  static createFrom($$source = {}) {
    const $$createField1_0 = $$createType0$5;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("Vars" in $$parsedSource) {
      $$parsedSource["Vars"] = $$createField1_0($$parsedSource["Vars"]);
    }
    return new Expr(
      /** @type {Partial<Expr>} */
      $$parsedSource
    );
  }
}
class Where {
  /**
   * Creates a new Where instance.
   * @param {Partial<Where>} [$$source = {}] - The source object to create the Where.
   */
  constructor($$source = {}) {
    if (!("Exprs" in $$source)) {
      this["Exprs"] = [];
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Where instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Where}
   */
  static createFrom($$source = {}) {
    const $$createField0_0 = $$createType1$4;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("Exprs" in $$parsedSource) {
      $$parsedSource["Exprs"] = $$createField0_0($$parsedSource["Exprs"]);
    }
    return new Where(
      /** @type {Partial<Where>} */
      $$parsedSource
    );
  }
}
const $$createType0$5 = ne.Array(ne.Any);
const $$createType1$4 = ne.Array(ne.Any);
class StructField {
  /**
   * Creates a new StructField instance.
   * @param {Partial<StructField>} [$$source = {}] - The source object to create the StructField.
   */
  constructor($$source = {}) {
    if (!("Name" in $$source)) {
      this["Name"] = "";
    }
    if (!("PkgPath" in $$source)) {
      this["PkgPath"] = "";
    }
    if (!("Type" in $$source)) {
      this["Type"] = null;
    }
    if (!("Tag" in $$source)) {
      this["Tag"] = /** @type {StructTag} */
      "";
    }
    if (!("Offset" in $$source)) {
      this["Offset"] = 0;
    }
    if (!("Index" in $$source)) {
      this["Index"] = [];
    }
    if (!("Anonymous" in $$source)) {
      this["Anonymous"] = false;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new StructField instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {StructField}
   */
  static createFrom($$source = {}) {
    const $$createField5_0 = $$createType0$4;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("Index" in $$parsedSource) {
      $$parsedSource["Index"] = $$createField5_0($$parsedSource["Index"]);
    }
    return new StructField(
      /** @type {Partial<StructField>} */
      $$parsedSource
    );
  }
}
class Value {
  /**
   * Creates a new Value instance.
   * @param {Partial<Value>} [$$source = {}] - The source object to create the Value.
   */
  constructor($$source = {}) {
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Value instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Value}
   */
  static createFrom($$source = {}) {
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    return new Value(
      /** @type {Partial<Value>} */
      $$parsedSource
    );
  }
}
const $$createType0$4 = ne.Array(ne.Any);
class Field {
  /**
   * Creates a new Field instance.
   * @param {Partial<Field>} [$$source = {}] - The source object to create the Field.
   */
  constructor($$source = {}) {
    if (!("Name" in $$source)) {
      this["Name"] = "";
    }
    if (!("DBName" in $$source)) {
      this["DBName"] = "";
    }
    if (!("BindNames" in $$source)) {
      this["BindNames"] = [];
    }
    if (!("EmbeddedBindNames" in $$source)) {
      this["EmbeddedBindNames"] = [];
    }
    if (!("DataType" in $$source)) {
      this["DataType"] = /** @type {DataType} */
      "";
    }
    if (!("GORMDataType" in $$source)) {
      this["GORMDataType"] = /** @type {DataType} */
      "";
    }
    if (!("PrimaryKey" in $$source)) {
      this["PrimaryKey"] = false;
    }
    if (!("AutoIncrement" in $$source)) {
      this["AutoIncrement"] = false;
    }
    if (!("AutoIncrementIncrement" in $$source)) {
      this["AutoIncrementIncrement"] = 0;
    }
    if (!("Creatable" in $$source)) {
      this["Creatable"] = false;
    }
    if (!("Updatable" in $$source)) {
      this["Updatable"] = false;
    }
    if (!("Readable" in $$source)) {
      this["Readable"] = false;
    }
    if (!("AutoCreateTime" in $$source)) {
      this["AutoCreateTime"] = /** @type {TimeType} */
      0;
    }
    if (!("AutoUpdateTime" in $$source)) {
      this["AutoUpdateTime"] = /** @type {TimeType} */
      0;
    }
    if (!("HasDefaultValue" in $$source)) {
      this["HasDefaultValue"] = false;
    }
    if (!("DefaultValue" in $$source)) {
      this["DefaultValue"] = "";
    }
    if (!("DefaultValueInterface" in $$source)) {
      this["DefaultValueInterface"] = null;
    }
    if (!("NotNull" in $$source)) {
      this["NotNull"] = false;
    }
    if (!("Unique" in $$source)) {
      this["Unique"] = false;
    }
    if (!("Comment" in $$source)) {
      this["Comment"] = "";
    }
    if (!("Size" in $$source)) {
      this["Size"] = 0;
    }
    if (!("Precision" in $$source)) {
      this["Precision"] = 0;
    }
    if (!("Scale" in $$source)) {
      this["Scale"] = 0;
    }
    if (!("IgnoreMigration" in $$source)) {
      this["IgnoreMigration"] = false;
    }
    if (!("FieldType" in $$source)) {
      this["FieldType"] = null;
    }
    if (!("IndirectFieldType" in $$source)) {
      this["IndirectFieldType"] = null;
    }
    if (!("StructField" in $$source)) {
      this["StructField"] = new StructField();
    }
    if (!("Tag" in $$source)) {
      this["Tag"] = /** @type {reflect$0.StructTag} */
      "";
    }
    if (!("TagSettings" in $$source)) {
      this["TagSettings"] = {};
    }
    if (!("Schema" in $$source)) {
      this["Schema"] = null;
    }
    if (!("EmbeddedSchema" in $$source)) {
      this["EmbeddedSchema"] = null;
    }
    if (!("OwnerSchema" in $$source)) {
      this["OwnerSchema"] = null;
    }
    if (!("ReflectValueOf" in $$source)) {
      this["ReflectValueOf"] = null;
    }
    if (!("ValueOf" in $$source)) {
      this["ValueOf"] = null;
    }
    if (!("Set" in $$source)) {
      this["Set"] = null;
    }
    if (!("Serializer" in $$source)) {
      this["Serializer"] = null;
    }
    if (!("NewValuePool" in $$source)) {
      this["NewValuePool"] = null;
    }
    if (!("UniqueIndex" in $$source)) {
      this["UniqueIndex"] = "";
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Field instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Field}
   */
  static createFrom($$source = {}) {
    const $$createField2_0 = $$createType0$3;
    const $$createField3_0 = $$createType0$3;
    const $$createField26_0 = $$createType1$3;
    const $$createField28_0 = $$createType2$2;
    const $$createField29_0 = $$createType4$1;
    const $$createField30_0 = $$createType4$1;
    const $$createField31_0 = $$createType4$1;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("BindNames" in $$parsedSource) {
      $$parsedSource["BindNames"] = $$createField2_0($$parsedSource["BindNames"]);
    }
    if ("EmbeddedBindNames" in $$parsedSource) {
      $$parsedSource["EmbeddedBindNames"] = $$createField3_0($$parsedSource["EmbeddedBindNames"]);
    }
    if ("StructField" in $$parsedSource) {
      $$parsedSource["StructField"] = $$createField26_0($$parsedSource["StructField"]);
    }
    if ("TagSettings" in $$parsedSource) {
      $$parsedSource["TagSettings"] = $$createField28_0($$parsedSource["TagSettings"]);
    }
    if ("Schema" in $$parsedSource) {
      $$parsedSource["Schema"] = $$createField29_0($$parsedSource["Schema"]);
    }
    if ("EmbeddedSchema" in $$parsedSource) {
      $$parsedSource["EmbeddedSchema"] = $$createField30_0($$parsedSource["EmbeddedSchema"]);
    }
    if ("OwnerSchema" in $$parsedSource) {
      $$parsedSource["OwnerSchema"] = $$createField31_0($$parsedSource["OwnerSchema"]);
    }
    return new Field(
      /** @type {Partial<Field>} */
      $$parsedSource
    );
  }
}
class Polymorphic {
  /**
   * Creates a new Polymorphic instance.
   * @param {Partial<Polymorphic>} [$$source = {}] - The source object to create the Polymorphic.
   */
  constructor($$source = {}) {
    if (!("PolymorphicID" in $$source)) {
      this["PolymorphicID"] = null;
    }
    if (!("PolymorphicType" in $$source)) {
      this["PolymorphicType"] = null;
    }
    if (!("Value" in $$source)) {
      this["Value"] = "";
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Polymorphic instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Polymorphic}
   */
  static createFrom($$source = {}) {
    const $$createField0_0 = $$createType6$1;
    const $$createField1_0 = $$createType6$1;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("PolymorphicID" in $$parsedSource) {
      $$parsedSource["PolymorphicID"] = $$createField0_0($$parsedSource["PolymorphicID"]);
    }
    if ("PolymorphicType" in $$parsedSource) {
      $$parsedSource["PolymorphicType"] = $$createField1_0($$parsedSource["PolymorphicType"]);
    }
    return new Polymorphic(
      /** @type {Partial<Polymorphic>} */
      $$parsedSource
    );
  }
}
class Reference {
  /**
   * Creates a new Reference instance.
   * @param {Partial<Reference>} [$$source = {}] - The source object to create the Reference.
   */
  constructor($$source = {}) {
    if (!("PrimaryKey" in $$source)) {
      this["PrimaryKey"] = null;
    }
    if (!("PrimaryValue" in $$source)) {
      this["PrimaryValue"] = "";
    }
    if (!("ForeignKey" in $$source)) {
      this["ForeignKey"] = null;
    }
    if (!("OwnPrimaryKey" in $$source)) {
      this["OwnPrimaryKey"] = false;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Reference instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Reference}
   */
  static createFrom($$source = {}) {
    const $$createField0_0 = $$createType6$1;
    const $$createField2_0 = $$createType6$1;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("PrimaryKey" in $$parsedSource) {
      $$parsedSource["PrimaryKey"] = $$createField0_0($$parsedSource["PrimaryKey"]);
    }
    if ("ForeignKey" in $$parsedSource) {
      $$parsedSource["ForeignKey"] = $$createField2_0($$parsedSource["ForeignKey"]);
    }
    return new Reference(
      /** @type {Partial<Reference>} */
      $$parsedSource
    );
  }
}
class Relationship {
  /**
   * Creates a new Relationship instance.
   * @param {Partial<Relationship>} [$$source = {}] - The source object to create the Relationship.
   */
  constructor($$source = {}) {
    if (!("Name" in $$source)) {
      this["Name"] = "";
    }
    if (!("Type" in $$source)) {
      this["Type"] = /** @type {RelationshipType} */
      "";
    }
    if (!("Field" in $$source)) {
      this["Field"] = null;
    }
    if (!("Polymorphic" in $$source)) {
      this["Polymorphic"] = null;
    }
    if (!("References" in $$source)) {
      this["References"] = [];
    }
    if (!("Schema" in $$source)) {
      this["Schema"] = null;
    }
    if (!("FieldSchema" in $$source)) {
      this["FieldSchema"] = null;
    }
    if (!("JoinTable" in $$source)) {
      this["JoinTable"] = null;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Relationship instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Relationship}
   */
  static createFrom($$source = {}) {
    const $$createField2_0 = $$createType6$1;
    const $$createField3_0 = $$createType8$1;
    const $$createField4_0 = $$createType11$1;
    const $$createField5_0 = $$createType4$1;
    const $$createField6_0 = $$createType4$1;
    const $$createField7_0 = $$createType4$1;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("Field" in $$parsedSource) {
      $$parsedSource["Field"] = $$createField2_0($$parsedSource["Field"]);
    }
    if ("Polymorphic" in $$parsedSource) {
      $$parsedSource["Polymorphic"] = $$createField3_0($$parsedSource["Polymorphic"]);
    }
    if ("References" in $$parsedSource) {
      $$parsedSource["References"] = $$createField4_0($$parsedSource["References"]);
    }
    if ("Schema" in $$parsedSource) {
      $$parsedSource["Schema"] = $$createField5_0($$parsedSource["Schema"]);
    }
    if ("FieldSchema" in $$parsedSource) {
      $$parsedSource["FieldSchema"] = $$createField6_0($$parsedSource["FieldSchema"]);
    }
    if ("JoinTable" in $$parsedSource) {
      $$parsedSource["JoinTable"] = $$createField7_0($$parsedSource["JoinTable"]);
    }
    return new Relationship(
      /** @type {Partial<Relationship>} */
      $$parsedSource
    );
  }
}
class Relationships {
  /**
   * Creates a new Relationships instance.
   * @param {Partial<Relationships>} [$$source = {}] - The source object to create the Relationships.
   */
  constructor($$source = {}) {
    if (!("HasOne" in $$source)) {
      this["HasOne"] = [];
    }
    if (!("BelongsTo" in $$source)) {
      this["BelongsTo"] = [];
    }
    if (!("HasMany" in $$source)) {
      this["HasMany"] = [];
    }
    if (!("Many2Many" in $$source)) {
      this["Many2Many"] = [];
    }
    if (!("Relations" in $$source)) {
      this["Relations"] = {};
    }
    if (!("EmbeddedRelations" in $$source)) {
      this["EmbeddedRelations"] = {};
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Relationships instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Relationships}
   */
  static createFrom($$source = {}) {
    const $$createField0_0 = $$createType14$1;
    const $$createField1_0 = $$createType14$1;
    const $$createField2_0 = $$createType14$1;
    const $$createField3_0 = $$createType14$1;
    const $$createField4_0 = $$createType15$1;
    const $$createField5_0 = $$createType18$1;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("HasOne" in $$parsedSource) {
      $$parsedSource["HasOne"] = $$createField0_0($$parsedSource["HasOne"]);
    }
    if ("BelongsTo" in $$parsedSource) {
      $$parsedSource["BelongsTo"] = $$createField1_0($$parsedSource["BelongsTo"]);
    }
    if ("HasMany" in $$parsedSource) {
      $$parsedSource["HasMany"] = $$createField2_0($$parsedSource["HasMany"]);
    }
    if ("Many2Many" in $$parsedSource) {
      $$parsedSource["Many2Many"] = $$createField3_0($$parsedSource["Many2Many"]);
    }
    if ("Relations" in $$parsedSource) {
      $$parsedSource["Relations"] = $$createField4_0($$parsedSource["Relations"]);
    }
    if ("EmbeddedRelations" in $$parsedSource) {
      $$parsedSource["EmbeddedRelations"] = $$createField5_0($$parsedSource["EmbeddedRelations"]);
    }
    return new Relationships(
      /** @type {Partial<Relationships>} */
      $$parsedSource
    );
  }
}
class Schema {
  /**
   * Creates a new Schema instance.
   * @param {Partial<Schema>} [$$source = {}] - The source object to create the Schema.
   */
  constructor($$source = {}) {
    if (!("Name" in $$source)) {
      this["Name"] = "";
    }
    if (!("ModelType" in $$source)) {
      this["ModelType"] = null;
    }
    if (!("Table" in $$source)) {
      this["Table"] = "";
    }
    if (!("PrioritizedPrimaryField" in $$source)) {
      this["PrioritizedPrimaryField"] = null;
    }
    if (!("DBNames" in $$source)) {
      this["DBNames"] = [];
    }
    if (!("PrimaryFields" in $$source)) {
      this["PrimaryFields"] = [];
    }
    if (!("PrimaryFieldDBNames" in $$source)) {
      this["PrimaryFieldDBNames"] = [];
    }
    if (!("Fields" in $$source)) {
      this["Fields"] = [];
    }
    if (!("FieldsByName" in $$source)) {
      this["FieldsByName"] = {};
    }
    if (!("FieldsByBindName" in $$source)) {
      this["FieldsByBindName"] = {};
    }
    if (!("FieldsByDBName" in $$source)) {
      this["FieldsByDBName"] = {};
    }
    if (!("FieldsWithDefaultDBValue" in $$source)) {
      this["FieldsWithDefaultDBValue"] = [];
    }
    if (!("Relationships" in $$source)) {
      this["Relationships"] = new Relationships();
    }
    if (!("CreateClauses" in $$source)) {
      this["CreateClauses"] = [];
    }
    if (!("QueryClauses" in $$source)) {
      this["QueryClauses"] = [];
    }
    if (!("UpdateClauses" in $$source)) {
      this["UpdateClauses"] = [];
    }
    if (!("DeleteClauses" in $$source)) {
      this["DeleteClauses"] = [];
    }
    if (!("BeforeCreate" in $$source)) {
      this["BeforeCreate"] = false;
    }
    if (!("AfterCreate" in $$source)) {
      this["AfterCreate"] = false;
    }
    if (!("BeforeUpdate" in $$source)) {
      this["BeforeUpdate"] = false;
    }
    if (!("AfterUpdate" in $$source)) {
      this["AfterUpdate"] = false;
    }
    if (!("BeforeDelete" in $$source)) {
      this["BeforeDelete"] = false;
    }
    if (!("AfterDelete" in $$source)) {
      this["AfterDelete"] = false;
    }
    if (!("BeforeSave" in $$source)) {
      this["BeforeSave"] = false;
    }
    if (!("AfterSave" in $$source)) {
      this["AfterSave"] = false;
    }
    if (!("AfterFind" in $$source)) {
      this["AfterFind"] = false;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Schema instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Schema}
   */
  static createFrom($$source = {}) {
    const $$createField3_0 = $$createType6$1;
    const $$createField4_0 = $$createType0$3;
    const $$createField5_0 = $$createType19;
    const $$createField6_0 = $$createType0$3;
    const $$createField7_0 = $$createType19;
    const $$createField8_0 = $$createType20;
    const $$createField9_0 = $$createType20;
    const $$createField10_0 = $$createType20;
    const $$createField11_0 = $$createType19;
    const $$createField12_0 = $$createType16$1;
    const $$createField13_0 = $$createType21;
    const $$createField14_0 = $$createType21;
    const $$createField15_0 = $$createType21;
    const $$createField16_0 = $$createType21;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("PrioritizedPrimaryField" in $$parsedSource) {
      $$parsedSource["PrioritizedPrimaryField"] = $$createField3_0($$parsedSource["PrioritizedPrimaryField"]);
    }
    if ("DBNames" in $$parsedSource) {
      $$parsedSource["DBNames"] = $$createField4_0($$parsedSource["DBNames"]);
    }
    if ("PrimaryFields" in $$parsedSource) {
      $$parsedSource["PrimaryFields"] = $$createField5_0($$parsedSource["PrimaryFields"]);
    }
    if ("PrimaryFieldDBNames" in $$parsedSource) {
      $$parsedSource["PrimaryFieldDBNames"] = $$createField6_0($$parsedSource["PrimaryFieldDBNames"]);
    }
    if ("Fields" in $$parsedSource) {
      $$parsedSource["Fields"] = $$createField7_0($$parsedSource["Fields"]);
    }
    if ("FieldsByName" in $$parsedSource) {
      $$parsedSource["FieldsByName"] = $$createField8_0($$parsedSource["FieldsByName"]);
    }
    if ("FieldsByBindName" in $$parsedSource) {
      $$parsedSource["FieldsByBindName"] = $$createField9_0($$parsedSource["FieldsByBindName"]);
    }
    if ("FieldsByDBName" in $$parsedSource) {
      $$parsedSource["FieldsByDBName"] = $$createField10_0($$parsedSource["FieldsByDBName"]);
    }
    if ("FieldsWithDefaultDBValue" in $$parsedSource) {
      $$parsedSource["FieldsWithDefaultDBValue"] = $$createField11_0($$parsedSource["FieldsWithDefaultDBValue"]);
    }
    if ("Relationships" in $$parsedSource) {
      $$parsedSource["Relationships"] = $$createField12_0($$parsedSource["Relationships"]);
    }
    if ("CreateClauses" in $$parsedSource) {
      $$parsedSource["CreateClauses"] = $$createField13_0($$parsedSource["CreateClauses"]);
    }
    if ("QueryClauses" in $$parsedSource) {
      $$parsedSource["QueryClauses"] = $$createField14_0($$parsedSource["QueryClauses"]);
    }
    if ("UpdateClauses" in $$parsedSource) {
      $$parsedSource["UpdateClauses"] = $$createField15_0($$parsedSource["UpdateClauses"]);
    }
    if ("DeleteClauses" in $$parsedSource) {
      $$parsedSource["DeleteClauses"] = $$createField16_0($$parsedSource["DeleteClauses"]);
    }
    return new Schema(
      /** @type {Partial<Schema>} */
      $$parsedSource
    );
  }
}
const $$createType0$3 = ne.Array(ne.Any);
const $$createType1$3 = StructField.createFrom;
const $$createType2$2 = ne.Map(ne.Any, ne.Any);
const $$createType3$3 = Schema.createFrom;
const $$createType4$1 = ne.Nullable($$createType3$3);
const $$createType5$1 = Field.createFrom;
const $$createType6$1 = ne.Nullable($$createType5$1);
const $$createType7$1 = Polymorphic.createFrom;
const $$createType8$1 = ne.Nullable($$createType7$1);
const $$createType9$1 = Reference.createFrom;
const $$createType10$1 = ne.Nullable($$createType9$1);
const $$createType11$1 = ne.Array($$createType10$1);
const $$createType12$1 = Relationship.createFrom;
const $$createType13$1 = ne.Nullable($$createType12$1);
const $$createType14$1 = ne.Array($$createType13$1);
const $$createType15$1 = ne.Map(ne.Any, $$createType13$1);
const $$createType16$1 = Relationships.createFrom;
const $$createType17$1 = ne.Nullable($$createType16$1);
const $$createType18$1 = ne.Map(ne.Any, $$createType17$1);
const $$createType19 = ne.Array($$createType6$1);
const $$createType20 = ne.Map(ne.Any, $$createType6$1);
const $$createType21 = ne.Array(ne.Any);
class Builder {
  /**
   * Creates a new Builder instance.
   * @param {Partial<Builder>} [$$source = {}] - The source object to create the Builder.
   */
  constructor($$source = {}) {
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Builder instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Builder}
   */
  static createFrom($$source = {}) {
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    return new Builder(
      /** @type {Partial<Builder>} */
      $$parsedSource
    );
  }
}
let Map$1 = class Map2 {
  /**
   * Creates a new Map instance.
   * @param {Partial<Map>} [$$source = {}] - The source object to create the Map.
   */
  constructor($$source = {}) {
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Map instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Map}
   */
  static createFrom($$source = {}) {
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    return new Map2(
      /** @type {Partial<Map>} */
      $$parsedSource
    );
  }
};
class join {
  /**
   * Creates a new join instance.
   * @param {Partial<join>} [$$source = {}] - The source object to create the join.
   */
  constructor($$source = {}) {
    if (!("Name" in $$source)) {
      this["Name"] = "";
    }
    if (!("Conds" in $$source)) {
      this["Conds"] = [];
    }
    if (!("On" in $$source)) {
      this["On"] = null;
    }
    if (!("Selects" in $$source)) {
      this["Selects"] = [];
    }
    if (!("Omits" in $$source)) {
      this["Omits"] = [];
    }
    if (!("JoinType" in $$source)) {
      this["JoinType"] = /** @type {clause$0.JoinType} */
      "";
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new join instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {join}
   */
  static createFrom($$source = {}) {
    const $$createField1_0 = $$createType0$2;
    const $$createField2_0 = $$createType2$1;
    const $$createField3_0 = $$createType3$2;
    const $$createField4_0 = $$createType3$2;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("Conds" in $$parsedSource) {
      $$parsedSource["Conds"] = $$createField1_0($$parsedSource["Conds"]);
    }
    if ("On" in $$parsedSource) {
      $$parsedSource["On"] = $$createField2_0($$parsedSource["On"]);
    }
    if ("Selects" in $$parsedSource) {
      $$parsedSource["Selects"] = $$createField3_0($$parsedSource["Selects"]);
    }
    if ("Omits" in $$parsedSource) {
      $$parsedSource["Omits"] = $$createField4_0($$parsedSource["Omits"]);
    }
    return new join(
      /** @type {Partial<join>} */
      $$parsedSource
    );
  }
}
const $$createType0$2 = ne.Array(ne.Any);
const $$createType1$2 = Where.createFrom;
const $$createType2$1 = ne.Nullable($$createType1$2);
const $$createType3$2 = ne.Array(ne.Any);
class DB2 {
  /**
   * Creates a new DB instance.
   * @param {Partial<DB>} [$$source = {}] - The source object to create the DB.
   */
  constructor($$source = {}) {
    if (!("SkipDefaultTransaction" in $$source)) {
      this["SkipDefaultTransaction"] = false;
    }
    if (!("NamingStrategy" in $$source)) {
      this["NamingStrategy"] = null;
    }
    if (!("FullSaveAssociations" in $$source)) {
      this["FullSaveAssociations"] = false;
    }
    if (!("Logger" in $$source)) {
      this["Logger"] = null;
    }
    if (!("NowFunc" in $$source)) {
      this["NowFunc"] = null;
    }
    if (!("DryRun" in $$source)) {
      this["DryRun"] = false;
    }
    if (!("PrepareStmt" in $$source)) {
      this["PrepareStmt"] = false;
    }
    if (!("DisableAutomaticPing" in $$source)) {
      this["DisableAutomaticPing"] = false;
    }
    if (!("DisableForeignKeyConstraintWhenMigrating" in $$source)) {
      this["DisableForeignKeyConstraintWhenMigrating"] = false;
    }
    if (!("IgnoreRelationshipsWhenMigrating" in $$source)) {
      this["IgnoreRelationshipsWhenMigrating"] = false;
    }
    if (!("DisableNestedTransaction" in $$source)) {
      this["DisableNestedTransaction"] = false;
    }
    if (!("AllowGlobalUpdate" in $$source)) {
      this["AllowGlobalUpdate"] = false;
    }
    if (!("QueryFields" in $$source)) {
      this["QueryFields"] = false;
    }
    if (!("CreateBatchSize" in $$source)) {
      this["CreateBatchSize"] = 0;
    }
    if (!("TranslateError" in $$source)) {
      this["TranslateError"] = false;
    }
    if (!("PropagateUnscoped" in $$source)) {
      this["PropagateUnscoped"] = false;
    }
    if (!("ClauseBuilders" in $$source)) {
      this["ClauseBuilders"] = {};
    }
    if (!("ConnPool" in $$source)) {
      this["ConnPool"] = null;
    }
    if (!("Dialector" in $$source)) {
      this["Dialector"] = null;
    }
    if (!("Plugins" in $$source)) {
      this["Plugins"] = {};
    }
    if (!("Error" in $$source)) {
      this["Error"] = null;
    }
    if (!("RowsAffected" in $$source)) {
      this["RowsAffected"] = 0;
    }
    if (!("Statement" in $$source)) {
      this["Statement"] = null;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new DB instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {DB}
   */
  static createFrom($$source = {}) {
    const $$createField16_0 = $$createType0$1;
    const $$createField19_0 = $$createType1$1;
    const $$createField22_0 = $$createType3$1;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("ClauseBuilders" in $$parsedSource) {
      $$parsedSource["ClauseBuilders"] = $$createField16_0($$parsedSource["ClauseBuilders"]);
    }
    if ("Plugins" in $$parsedSource) {
      $$parsedSource["Plugins"] = $$createField19_0($$parsedSource["Plugins"]);
    }
    if ("Statement" in $$parsedSource) {
      $$parsedSource["Statement"] = $$createField22_0($$parsedSource["Statement"]);
    }
    return new DB2(
      /** @type {Partial<DB>} */
      $$parsedSource
    );
  }
}
class Statement {
  /**
   * Creates a new Statement instance.
   * @param {Partial<Statement>} [$$source = {}] - The source object to create the Statement.
   */
  constructor($$source = {}) {
    if (!("SkipDefaultTransaction" in $$source)) {
      this["SkipDefaultTransaction"] = false;
    }
    if (!("NamingStrategy" in $$source)) {
      this["NamingStrategy"] = null;
    }
    if (!("FullSaveAssociations" in $$source)) {
      this["FullSaveAssociations"] = false;
    }
    if (!("Logger" in $$source)) {
      this["Logger"] = null;
    }
    if (!("NowFunc" in $$source)) {
      this["NowFunc"] = null;
    }
    if (!("DryRun" in $$source)) {
      this["DryRun"] = false;
    }
    if (!("PrepareStmt" in $$source)) {
      this["PrepareStmt"] = false;
    }
    if (!("DisableAutomaticPing" in $$source)) {
      this["DisableAutomaticPing"] = false;
    }
    if (!("DisableForeignKeyConstraintWhenMigrating" in $$source)) {
      this["DisableForeignKeyConstraintWhenMigrating"] = false;
    }
    if (!("IgnoreRelationshipsWhenMigrating" in $$source)) {
      this["IgnoreRelationshipsWhenMigrating"] = false;
    }
    if (!("DisableNestedTransaction" in $$source)) {
      this["DisableNestedTransaction"] = false;
    }
    if (!("AllowGlobalUpdate" in $$source)) {
      this["AllowGlobalUpdate"] = false;
    }
    if (!("QueryFields" in $$source)) {
      this["QueryFields"] = false;
    }
    if (!("CreateBatchSize" in $$source)) {
      this["CreateBatchSize"] = 0;
    }
    if (!("TranslateError" in $$source)) {
      this["TranslateError"] = false;
    }
    if (!("PropagateUnscoped" in $$source)) {
      this["PropagateUnscoped"] = false;
    }
    if (!("ClauseBuilders" in $$source)) {
      this["ClauseBuilders"] = {};
    }
    if (!("Dialector" in $$source)) {
      this["Dialector"] = null;
    }
    if (!("Plugins" in $$source)) {
      this["Plugins"] = {};
    }
    if (!("Error" in $$source)) {
      this["Error"] = null;
    }
    if (!("RowsAffected" in $$source)) {
      this["RowsAffected"] = 0;
    }
    if (!("Statement" in $$source)) {
      this["Statement"] = null;
    }
    if (!("TableExpr" in $$source)) {
      this["TableExpr"] = null;
    }
    if (!("Table" in $$source)) {
      this["Table"] = "";
    }
    if (!("Model" in $$source)) {
      this["Model"] = null;
    }
    if (!("Unscoped" in $$source)) {
      this["Unscoped"] = false;
    }
    if (!("Dest" in $$source)) {
      this["Dest"] = null;
    }
    if (!("ReflectValue" in $$source)) {
      this["ReflectValue"] = new Value();
    }
    if (!("Clauses" in $$source)) {
      this["Clauses"] = {};
    }
    if (!("BuildClauses" in $$source)) {
      this["BuildClauses"] = [];
    }
    if (!("Distinct" in $$source)) {
      this["Distinct"] = false;
    }
    if (!("Selects" in $$source)) {
      this["Selects"] = [];
    }
    if (!("Omits" in $$source)) {
      this["Omits"] = [];
    }
    if (!("ColumnMapping" in $$source)) {
      this["ColumnMapping"] = {};
    }
    if (!("Joins" in $$source)) {
      this["Joins"] = [];
    }
    if (!("Preloads" in $$source)) {
      this["Preloads"] = {};
    }
    if (!("Settings" in $$source)) {
      this["Settings"] = new Map$1();
    }
    if (!("ConnPool" in $$source)) {
      this["ConnPool"] = null;
    }
    if (!("Schema" in $$source)) {
      this["Schema"] = null;
    }
    if (!("Context" in $$source)) {
      this["Context"] = null;
    }
    if (!("RaiseErrorOnNotFound" in $$source)) {
      this["RaiseErrorOnNotFound"] = false;
    }
    if (!("SkipHooks" in $$source)) {
      this["SkipHooks"] = false;
    }
    if (!("SQL" in $$source)) {
      this["SQL"] = new Builder();
    }
    if (!("Vars" in $$source)) {
      this["Vars"] = [];
    }
    if (!("CurDestIndex" in $$source)) {
      this["CurDestIndex"] = 0;
    }
    Object.assign(this, $$source);
  }
  /**
   * Creates a new Statement instance from a string or object.
   * @param {any} [$$source = {}]
   * @returns {Statement}
   */
  static createFrom($$source = {}) {
    const $$createField16_0 = $$createType0$1;
    const $$createField18_0 = $$createType1$1;
    const $$createField21_0 = $$createType3$1;
    const $$createField22_0 = $$createType5;
    const $$createField27_0 = $$createType6;
    const $$createField28_0 = $$createType8;
    const $$createField29_0 = $$createType9;
    const $$createField31_0 = $$createType9;
    const $$createField32_0 = $$createType9;
    const $$createField33_0 = $$createType10;
    const $$createField34_0 = $$createType12;
    const $$createField35_0 = $$createType14;
    const $$createField36_0 = $$createType15;
    const $$createField38_0 = $$createType17;
    const $$createField42_0 = $$createType18;
    const $$createField43_0 = $$createType13;
    let $$parsedSource = typeof $$source === "string" ? JSON.parse($$source) : $$source;
    if ("ClauseBuilders" in $$parsedSource) {
      $$parsedSource["ClauseBuilders"] = $$createField16_0($$parsedSource["ClauseBuilders"]);
    }
    if ("Plugins" in $$parsedSource) {
      $$parsedSource["Plugins"] = $$createField18_0($$parsedSource["Plugins"]);
    }
    if ("Statement" in $$parsedSource) {
      $$parsedSource["Statement"] = $$createField21_0($$parsedSource["Statement"]);
    }
    if ("TableExpr" in $$parsedSource) {
      $$parsedSource["TableExpr"] = $$createField22_0($$parsedSource["TableExpr"]);
    }
    if ("ReflectValue" in $$parsedSource) {
      $$parsedSource["ReflectValue"] = $$createField27_0($$parsedSource["ReflectValue"]);
    }
    if ("Clauses" in $$parsedSource) {
      $$parsedSource["Clauses"] = $$createField28_0($$parsedSource["Clauses"]);
    }
    if ("BuildClauses" in $$parsedSource) {
      $$parsedSource["BuildClauses"] = $$createField29_0($$parsedSource["BuildClauses"]);
    }
    if ("Selects" in $$parsedSource) {
      $$parsedSource["Selects"] = $$createField31_0($$parsedSource["Selects"]);
    }
    if ("Omits" in $$parsedSource) {
      $$parsedSource["Omits"] = $$createField32_0($$parsedSource["Omits"]);
    }
    if ("ColumnMapping" in $$parsedSource) {
      $$parsedSource["ColumnMapping"] = $$createField33_0($$parsedSource["ColumnMapping"]);
    }
    if ("Joins" in $$parsedSource) {
      $$parsedSource["Joins"] = $$createField34_0($$parsedSource["Joins"]);
    }
    if ("Preloads" in $$parsedSource) {
      $$parsedSource["Preloads"] = $$createField35_0($$parsedSource["Preloads"]);
    }
    if ("Settings" in $$parsedSource) {
      $$parsedSource["Settings"] = $$createField36_0($$parsedSource["Settings"]);
    }
    if ("Schema" in $$parsedSource) {
      $$parsedSource["Schema"] = $$createField38_0($$parsedSource["Schema"]);
    }
    if ("SQL" in $$parsedSource) {
      $$parsedSource["SQL"] = $$createField42_0($$parsedSource["SQL"]);
    }
    if ("Vars" in $$parsedSource) {
      $$parsedSource["Vars"] = $$createField43_0($$parsedSource["Vars"]);
    }
    return new Statement(
      /** @type {Partial<Statement>} */
      $$parsedSource
    );
  }
}
const $$createType0$1 = ne.Map(ne.Any, ne.Any);
const $$createType1$1 = ne.Map(ne.Any, ne.Any);
const $$createType2 = Statement.createFrom;
const $$createType3$1 = ne.Nullable($$createType2);
const $$createType4 = Expr.createFrom;
const $$createType5 = ne.Nullable($$createType4);
const $$createType6 = Value.createFrom;
const $$createType7 = Clause.createFrom;
const $$createType8 = ne.Map(ne.Any, $$createType7);
const $$createType9 = ne.Array(ne.Any);
const $$createType10 = ne.Map(ne.Any, ne.Any);
const $$createType11 = join.createFrom;
const $$createType12 = ne.Array($$createType11);
const $$createType13 = ne.Array(ne.Any);
const $$createType14 = ne.Map(ne.Any, $$createType13);
const $$createType15 = Map$1.createFrom;
const $$createType16 = Schema.createFrom;
const $$createType17 = ne.Nullable($$createType16);
const $$createType18 = Builder.createFrom;
function Execute(query) {
  let $resultPromise = (
    /** @type {any} */
    ee.ByID(913414865, query)
  );
  return $resultPromise;
}
function ExecuteQuery(query) {
  let $resultPromise = (
    /** @type {any} */
    ee.ByID(3595892903, query)
  );
  let $typingPromise = (
    /** @type {any} */
    $resultPromise.then(($result) => {
      return $$createType0($result);
    })
  );
  $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
  return $typingPromise;
}
function GetName() {
  let $resultPromise = (
    /** @type {any} */
    ee.ByID(2086215133)
  );
  return $resultPromise;
}
const $$createType0 = QueryResult.createFrom;
const $$createType1 = DB2.createFrom;
ne.Nullable($$createType1);
const $$createType3 = DB$1.createFrom;
ne.Nullable($$createType3);
export {
  ExecuteQuery as E,
  GetName as G,
  N,
  QueryResult as Q,
  Execute as a,
  bind_value as b,
  ee as e,
  remove_input_defaults as r,
  set_attribute as s
};
