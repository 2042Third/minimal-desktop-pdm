import { t as template, a as append, c as comment } from "../chunks/BGQeMav5.js";
import { Y as create_text, b as block, i as set_hydrate_node, h as hydrating, Z as get_first_child, d as hydrate_next, D as get, _ as derived_safe_equal, H as HYDRATION_START_ELSE, g as remove_nodes, j as set_hydrating, n as hydrate_node, $ as HYDRATION_END, k as resume_effect, l as branch, m as pause_effect, a0 as INERT, a1 as array_from, I as active_effect, a2 as internal_set, N as mutable_source, B as source, a3 as EACH_INDEX_REACTIVE, a4 as pause_children, a5 as clear_text_content, a6 as run_out_transitions, a7 as destroy_effect, a8 as EACH_ITEM_REACTIVE, a9 as EACH_ITEM_IMMUTABLE, aa as get_next_sibling, L as is_array, ab as EACH_IS_CONTROLLED, v as queue_micro_task, ac as EACH_IS_ANIMATED, p as push, c as child, s as sibling, t as template_effect, a as pop, u as untrack, r as reset, f as first_child, F as set, ad as state } from "../chunks/TdN3I5eQ.js";
import { d as delegate, r as remove_textarea_child, s as set_text, e as event } from "../chunks/Cv_58GG0.js";
import { i as if_block, b as bind_this } from "../chunks/CB4pBYuS.js";
import { Q as QueryResult, b as bind_value, E as ExecuteQuery, a as Execute, G as GetName, s as set_attribute } from "../chunks/Bi1rSa6r.js";
import { s as store_get, a as setup_stores, b as store_set, p as proxy, c as store_mutate } from "../chunks/BFcj0Dfg.js";
import { o as onMount } from "../chunks/DOG_QbrM.js";
import { w as writable, d as derived } from "../chunks/En2E40Cu.js";
function index(_, i) {
  return i;
}
function pause_effects(state2, items, controlled_anchor, items_map) {
  var transitions = [];
  var length = items.length;
  for (var i = 0; i < length; i++) {
    pause_children(items[i].e, transitions, true);
  }
  var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      /** @type {Element} */
      controlled_anchor.parentNode
    );
    clear_text_content(parent_node);
    parent_node.append(
      /** @type {Element} */
      controlled_anchor
    );
    items_map.clear();
    link(state2, items[0].prev, items[length - 1].next);
  }
  run_out_transitions(transitions, () => {
    for (var i2 = 0; i2 < length; i2++) {
      var item = items[i2];
      if (!is_controlled) {
        items_map.delete(item.k);
        link(state2, item.prev, item.next);
      }
      destroy_effect(item.e, !is_controlled);
    }
  });
}
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var state2 = { items: /* @__PURE__ */ new Map(), first: null };
  var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(
      /** @type {Comment | Text} */
      get_first_child(parent_node)
    ) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback = null;
  var was_empty = false;
  var each_array = derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  block(() => {
    var array = get(each_array);
    var length = array.length;
    if (was_empty && length === 0) {
      return;
    }
    was_empty = length === 0;
    let mismatch = false;
    if (hydrating) {
      var is_else = (
        /** @type {Comment} */
        anchor.data === HYDRATION_START_ELSE
      );
      if (is_else !== (length === 0)) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    if (hydrating) {
      var prev = null;
      var item;
      for (var i = 0; i < length; i++) {
        if (hydrate_node.nodeType === 8 && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          anchor = /** @type {Comment} */
          hydrate_node;
          mismatch = true;
          set_hydrating(false);
          break;
        }
        var value = array[i];
        var key = get_key(value, i);
        item = create_item(
          hydrate_node,
          state2,
          prev,
          null,
          value,
          key,
          i,
          render_fn,
          flags,
          get_collection
        );
        state2.items.set(key, item);
        prev = item;
      }
      if (length > 0) {
        set_hydrate_node(remove_nodes());
      }
    }
    if (!hydrating) {
      reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection);
    }
    if (fallback_fn !== null) {
      if (length === 0) {
        if (fallback) {
          resume_effect(fallback);
        } else {
          fallback = branch(() => fallback_fn(anchor));
        }
      } else if (fallback !== null) {
        pause_effect(fallback, () => {
          fallback = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get(each_array);
  });
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection) {
  var _a, _b, _c, _d;
  var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
  var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
  var length = array.length;
  var items = state2.items;
  var first = state2.first;
  var current = first;
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key;
  var item;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item !== void 0) {
        (_a = item.a) == null ? void 0 : _a.measure();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(item);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key = get_key(value, i);
    item = items.get(key);
    if (item === void 0) {
      var child_anchor = current ? (
        /** @type {TemplateNode} */
        current.e.nodes_start
      ) : anchor;
      prev = create_item(
        child_anchor,
        state2,
        prev,
        prev === null ? state2.first : prev.next,
        value,
        key,
        i,
        render_fn,
        flags,
        get_collection
      );
      items.set(key, prev);
      matched = [];
      stashed = [];
      current = prev.next;
      continue;
    }
    if (should_update) {
      update_item(item, value, i, flags);
    }
    if ((item.e.f & INERT) !== 0) {
      resume_effect(item.e);
      if (is_animated) {
        (_b = item.a) == null ? void 0 : _b.unfix();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(item);
      }
    }
    if (item !== current) {
      if (seen !== void 0 && seen.has(item)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen.delete(item);
          move(item, current, anchor);
          link(state2, item.prev, item.next);
          link(state2, item, prev === null ? state2.first : prev.next);
          link(state2, prev, item);
          prev = item;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current.k !== key) {
        if ((current.e.f & INERT) === 0) {
          (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
        }
        stashed.push(current);
        current = current.next;
      }
      if (current === null) {
        continue;
      }
      item = current;
    }
    matched.push(item);
    prev = item;
    current = item.next;
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = seen === void 0 ? [] : array_from(seen);
    while (current !== null) {
      if ((current.e.f & INERT) === 0) {
        to_destroy.push(current);
      }
      current = current.next;
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          (_c = to_destroy[i].a) == null ? void 0 : _c.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          (_d = to_destroy[i].a) == null ? void 0 : _d.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor, items);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      var _a2;
      if (to_animate === void 0) return;
      for (item of to_animate) {
        (_a2 = item.a) == null ? void 0 : _a2.apply();
      }
    });
  }
  active_effect.first = state2.first && state2.first.e;
  active_effect.last = prev && prev.e;
}
function update_item(item, value, index2, type) {
  if ((type & EACH_ITEM_REACTIVE) !== 0) {
    internal_set(item.v, value);
  }
  if ((type & EACH_INDEX_REACTIVE) !== 0) {
    internal_set(
      /** @type {Value<number>} */
      item.i,
      index2
    );
  } else {
    item.i = index2;
  }
}
function create_item(anchor, state2, prev, next, value, key, index2, render_fn, flags, get_collection) {
  var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
  var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
  var v = reactive ? mutable ? mutable_source(value) : source(value) : value;
  var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
  var item = {
    i,
    v,
    k: key,
    a: null,
    // @ts-expect-error
    e: null,
    prev,
    next
  };
  try {
    item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
    item.e.prev = prev && prev.e;
    item.e.next = next && next.e;
    if (prev === null) {
      state2.first = item;
    } else {
      prev.next = item;
      prev.e.next = item.e;
    }
    if (next !== null) {
      next.prev = item;
      next.e.prev = item.e;
    }
    return item;
  } finally {
  }
}
function move(item, next, anchor) {
  var end = item.next ? (
    /** @type {TemplateNode} */
    item.next.e.nodes_start
  ) : anchor;
  var dest = next ? (
    /** @type {TemplateNode} */
    next.e.nodes_start
  ) : anchor;
  var node = (
    /** @type {TemplateNode} */
    item.e.nodes_start
  );
  while (node !== end) {
    var next_node = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    dest.before(node);
    node = next_node;
  }
}
function link(state2, prev, next) {
  if (prev === null) {
    state2.first = next;
  } else {
    prev.next = next;
    prev.e.next = next && next.e;
  }
  if (next !== null) {
    next.prev = prev;
    next.e.prev = prev && prev.e;
  }
}
const query = writable({ table: "", sql: "" });
const results = writable(new QueryResult());
const tables = writable([]);
const dbFile = writable("");
const editingCell = writable({ editing: false, row: 0, column: 0, width: 0, height: 0, top: 0, left: 0 });
async function executeStatement(_, cleanQuery, $query, $results) {
  try {
    const output = await Execute(cleanQuery($query().sql));
    console.log(output);
  } catch (error) {
    store_mutate(results, untrack($results).error = error.message, untrack($results));
  }
}
var on_keydown = (e, executeQuery) => e.ctrlKey && e.key === "Enter" && executeQuery();
var on_click = (__1, selectTable, table) => selectTable(get(table));
var root_1 = template(`<li class="svelte-quzy97"> </li>`);
var root_3 = template(`<div class="error svelte-quzy97"> </div>`);
var root_6 = template(`<th class="svelte-quzy97"> </th>`);
var root_9 = template(`<td class="can-select-text svelte-quzy97"> </td>`);
var root_7 = template(`<tr></tr>`);
var on_keydown_1 = (e, saveEdit, stopEditing) => {
  if (e.key === "Enter") saveEdit();
  if (e.key === "Escape") stopEditing();
};
var root_10 = template(`<textarea class="cell-editor svelte-quzy97"></textarea>`);
var root_4 = template(`<div class="table-container svelte-quzy97"><table class="svelte-quzy97"><thead><tr></tr></thead><tbody></tbody></table> <!></div>`);
var root_2 = template(`<div class="query-results svelte-quzy97"><!></div>`);
var root = template(`<div class="query-runner svelte-quzy97"><div class="container svelte-quzy97"><div class="left-panel svelte-quzy97"><div class="query-input svelte-quzy97"><textarea placeholder="Enter your SQL query..." class="svelte-quzy97"></textarea> <button class="svelte-quzy97">Execute Query</button> <button class="svelte-quzy97">Execute Statement</button> <button class="svelte-quzy97">Refresh</button></div> <div><h3 class="no-select">Database Name</h3> <p class="can-select-text"> </p></div> <div class="tables-list svelte-quzy97"><h3 class="svelte-quzy97">Available Tables</h3> <ul class="svelte-quzy97"></ul></div></div> <div class="results-panel svelte-quzy97"><!></div></div></div>`);
function _page($$anchor, $$props) {
  push($$props, true);
  const [$$stores, $$cleanup] = setup_stores();
  const $results = () => store_get(results, "$results", $$stores);
  const $query = () => store_get(query, "$query", $$stores);
  const $dbFile = () => store_get(dbFile, "$dbFile", $$stores);
  const $tables = () => store_get(tables, "$tables", $$stores);
  const $editingCell = () => store_get(editingCell, "$editingCell", $$stores);
  const $editorStyle = () => store_get(editorStyle, "$editorStyle", $$stores);
  const cleanQuery = (sql) => sql.trim().replace(/\n/g, " ");
  async function executeQuery() {
    try {
      store_set(results, proxy(await ExecuteQuery(cleanQuery($query().sql))));
    } catch (error) {
      store_mutate(results, untrack($results).error = error.message, untrack($results));
    }
  }
  async function loadSQLiteName() {
    store_set(dbFile, proxy(await GetName()));
  }
  async function loadTables() {
    try {
      const result = await ExecuteQuery("SELECT name FROM sqlite_master WHERE type='table';");
      store_set(tables, proxy(result.rows.map((row) => row[0])));
    } catch (error) {
      console.error("Failed to load tables:", error);
    }
  }
  function selectTable(tableName) {
    store_set(query, proxy({
      table: tableName,
      sql: `SELECT rowid, * FROM ${tableName} LIMIT 100;`
    }));
    executeQuery();
  }
  let editValue = state("");
  let tableContainer;
  const editorStyle = derived(editingCell, ($editingCell2) => {
    if (!$editingCell2.editing) return "";
    return `
            position: absolute;
            top: ${$editingCell2.top}px;
            left: ${$editingCell2.left}px;
            width: ${$editingCell2.width}px;
            height: ${$editingCell2.height}px;
        `;
  });
  function startEditing(event2, row, column, value) {
    const cell = event2.target;
    const rect = cell.getBoundingClientRect();
    const tableRect = tableContainer.getBoundingClientRect();
    set(editValue, proxy(value));
    store_set(editingCell, proxy({
      editing: true,
      row,
      column,
      width: rect.width,
      height: rect.height,
      top: rect.top - tableRect.top + tableContainer.scrollTop,
      left: rect.left - tableRect.left + tableContainer.scrollLeft
    }));
    setTimeout(
      () => {
        const textarea = document.querySelector(".cell-editor");
        if (textarea) {
          textarea.focus();
        }
      },
      0
    );
  }
  function stopEditing() {
    store_mutate(editingCell, untrack($editingCell).editing = false, untrack($editingCell));
  }
  async function saveEdit() {
    if (!$editingCell().editing) return;
    try {
      const rowIndex = $editingCell().row;
      const colIndex = $editingCell().column;
      const rowId = $results().rows[rowIndex][0];
      const columnName = $results().columns[colIndex];
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      stopEditing();
    }
  }
  onMount(() => {
    loadTables();
    loadSQLiteName();
  });
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var textarea_1 = child(div_3);
  remove_textarea_child(textarea_1);
  textarea_1.__keydown = [on_keydown, executeQuery];
  var button = sibling(textarea_1, 2);
  button.__click = executeQuery;
  var button_1 = sibling(button, 2);
  button_1.__click = [
    executeStatement,
    cleanQuery,
    $query,
    $results
  ];
  var button_2 = sibling(button_1, 2);
  button_2.__click = loadTables;
  reset(div_3);
  var div_4 = sibling(div_3, 2);
  var p = sibling(child(div_4), 2);
  var text = child(p, true);
  reset(p);
  reset(div_4);
  var div_5 = sibling(div_4, 2);
  var ul = sibling(child(div_5), 2);
  each(ul, 5, $tables, index, ($$anchor2, table) => {
    var li = root_1();
    li.__click = [on_click, selectTable, table];
    var text_1 = child(li, true);
    reset(li);
    template_effect(() => set_text(text_1, get(table)));
    append($$anchor2, li);
  });
  reset(ul);
  reset(div_5);
  reset(div_2);
  var div_6 = sibling(div_2, 2);
  var node = child(div_6);
  {
    var consequent_4 = ($$anchor2) => {
      var div_7 = root_2();
      var node_1 = child(div_7);
      {
        var consequent = ($$anchor3) => {
          var div_8 = root_3();
          var text_2 = child(div_8, true);
          reset(div_8);
          template_effect(() => set_text(text_2, $results().error));
          append($$anchor3, div_8);
        };
        var alternate = ($$anchor3) => {
          var div_9 = root_4();
          var table_1 = child(div_9);
          var thead = child(table_1);
          var tr = child(thead);
          each(tr, 5, () => $results().columns, index, ($$anchor4, column, i) => {
            var fragment = comment();
            var node_2 = first_child(fragment);
            {
              var consequent_1 = ($$anchor5) => {
                var th = root_6();
                var text_3 = child(th, true);
                reset(th);
                template_effect(() => set_text(text_3, get(column)));
                append($$anchor5, th);
              };
              if_block(node_2, ($$render) => {
                if (i !== 0) $$render(consequent_1);
              });
            }
            append($$anchor4, fragment);
          });
          reset(tr);
          reset(thead);
          var tbody = sibling(thead);
          each(tbody, 5, () => $results().rows, index, ($$anchor4, row, index$1) => {
            var tr_1 = root_7();
            each(tr_1, 21, () => get(row), index, ($$anchor5, cell, cellIndex) => {
              var fragment_1 = comment();
              var node_3 = first_child(fragment_1);
              {
                var consequent_2 = ($$anchor6) => {
                  var td = root_9();
                  set_attribute(td, "data-row", index$1);
                  set_attribute(td, "data-col", cellIndex);
                  td.__dblclick = (e) => startEditing(e, index$1, cellIndex, get(cell));
                  var text_4 = child(td, true);
                  reset(td);
                  template_effect(
                    ($0) => {
                      set_attribute(td, "style", `--custom-contextmenu: dbTableMenu; --custom-contextmenu-data: ${$0 ?? ""}`);
                      set_text(text_4, get(cell));
                    },
                    [
                      () => JSON.stringify({
                        table: $query().table,
                        rowid: get(row)[0],
                        column: $results().columns[cellIndex]
                      })
                    ]
                  );
                  append($$anchor6, td);
                };
                if_block(node_3, ($$render) => {
                  if (cellIndex !== 0) $$render(consequent_2);
                });
              }
              append($$anchor5, fragment_1);
            });
            reset(tr_1);
            append($$anchor4, tr_1);
          });
          reset(tbody);
          reset(table_1);
          var node_4 = sibling(table_1, 2);
          {
            var consequent_3 = ($$anchor4) => {
              var textarea_2 = root_10();
              remove_textarea_child(textarea_2);
              textarea_2.__keydown = [on_keydown_1, saveEdit, stopEditing];
              template_effect(() => set_attribute(textarea_2, "style", $editorStyle()));
              event("blur", textarea_2, saveEdit);
              bind_value(textarea_2, () => get(editValue), ($$value) => set(editValue, $$value));
              append($$anchor4, textarea_2);
            };
            if_block(node_4, ($$render) => {
              if ($editingCell().editing) $$render(consequent_3);
            });
          }
          reset(div_9);
          bind_this(div_9, ($$value) => tableContainer = $$value, () => tableContainer);
          append($$anchor3, div_9);
        };
        if_block(node_1, ($$render) => {
          if ($results().error) $$render(consequent);
          else $$render(alternate, false);
        });
      }
      reset(div_7);
      append($$anchor2, div_7);
    };
    if_block(node, ($$render) => {
      if (results) $$render(consequent_4);
    });
  }
  reset(div_6);
  reset(div_1);
  reset(div);
  template_effect(() => set_text(text, $dbFile()));
  bind_value(textarea_1, () => $query().sql, ($$value) => store_mutate(query, untrack($query).sql = $$value, untrack($query)));
  append($$anchor, div);
  pop();
  $$cleanup();
}
delegate(["keydown", "click", "dblclick"]);
export {
  _page as component
};
