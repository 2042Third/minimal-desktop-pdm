import { writable } from 'svelte/store';
import {QueryResult} from "@pdm/models/index.js";

export const query = writable({table: '', sql: ''});
export const results = writable(new QueryResult);
// @ts-ignore
export const tables= writable([]);
export const dbFile = writable('');
export const editingCell = writable({ editing:false, row:0, column:0, width: 0, height: 0, top: 0, left: 0 });
