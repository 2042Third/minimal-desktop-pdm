import { _ as ensure_array_like, $ as store_get, W as stringify, a0 as unsubscribe_stores, V as pop, S as push } from "../../../chunks/index.js";
import { w as writable, d as derived } from "../../../chunks/index2.js";
import { Q as QueryResult } from "../../../chunks/database.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { a as attr } from "../../../chunks/attributes.js";
const query = writable({ table: "", sql: "" });
const results = writable(new QueryResult());
const tables = writable([]);
const dbFile = writable("");
const editingCell = writable({ editing: false, row: 0, column: 0, width: 0, height: 0, top: 0, left: 0 });
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let editValue = "";
  const editorStyle = derived(editingCell, ($editingCell) => {
    if (!$editingCell.editing) return "";
    return `
            position: absolute;
            top: ${$editingCell.top}px;
            left: ${$editingCell.left}px;
            width: ${$editingCell.width}px;
            height: ${$editingCell.height}px;
        `;
  });
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$tables", tables));
  $$payload.out += `<div class="query-runner svelte-1vlgswv"><div class="container svelte-1vlgswv"><div class="left-panel svelte-1vlgswv"><div class="query-input svelte-1vlgswv"><textarea placeholder="Enter your SQL query..." class="svelte-1vlgswv">`;
  const $$body = escape_html(store_get($$store_subs ??= {}, "$query", query).sql);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <button class="svelte-1vlgswv">Execute Query</button> <button class="svelte-1vlgswv">Execute Statement</button> <button class="svelte-1vlgswv">Refresh</button></div> <div><h3 class="no-select">Database Name</h3> <p class="can-select">${escape_html(store_get($$store_subs ??= {}, "$dbFile", dbFile))}</p></div> <div class="tables-list svelte-1vlgswv"><h3 class="svelte-1vlgswv">Available Tables</h3> <ul class="svelte-1vlgswv"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let table = each_array[$$index];
    $$payload.out += `<li class="svelte-1vlgswv">${escape_html(table)}</li>`;
  }
  $$payload.out += `<!--]--></ul></div></div> <div class="results-panel svelte-1vlgswv">`;
  if (results) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="query-results svelte-1vlgswv">`;
    if (store_get($$store_subs ??= {}, "$results", results).error) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="error svelte-1vlgswv">${escape_html(store_get($$store_subs ??= {}, "$results", results).error)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$results", results).columns);
      const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$results", results).rows);
      $$payload.out += `<div class="table-container svelte-1vlgswv"><table class="svelte-1vlgswv"><thead><tr><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let column = each_array_1[$$index_1];
        $$payload.out += `<th class="svelte-1vlgswv">${escape_html(column)}</th>`;
      }
      $$payload.out += `<!--]--></tr></thead><tbody><!--[-->`;
      for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
        let row = each_array_2[index];
        const each_array_3 = ensure_array_like(row);
        $$payload.out += `<tr><!--[-->`;
        for (let cellIndex = 0, $$length2 = each_array_3.length; cellIndex < $$length2; cellIndex++) {
          let cell = each_array_3[cellIndex];
          $$payload.out += `<td${attr("data-row", index)}${attr("data-col", cellIndex)}${attr("style", `--custom-contextmenu: dbTableMenu; --custom-contextmenu-data: ${stringify(JSON.stringify({
            table: store_get($$store_subs ??= {}, "$query", query).table,
            rowid: row[0],
            column: store_get($$store_subs ??= {}, "$results", results).columns[cellIndex]
          }))}`)} class="svelte-1vlgswv">${escape_html(cell)}</td>`;
        }
        $$payload.out += `<!--]--></tr>`;
      }
      $$payload.out += `<!--]--></tbody></table> `;
      if (store_get($$store_subs ??= {}, "$editingCell", editingCell).editing) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<textarea class="cell-editor svelte-1vlgswv"${attr("style", store_get($$store_subs ??= {}, "$editorStyle", editorStyle))}>`;
        const $$body_1 = escape_html(editValue);
        if ($$body_1) {
          $$payload.out += `${$$body_1}`;
        }
        $$payload.out += `</textarea>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
