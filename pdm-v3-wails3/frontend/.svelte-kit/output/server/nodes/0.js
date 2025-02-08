import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B-hwfaTR.js","_app/immutable/chunks/BGQeMav5.js","_app/immutable/chunks/TdN3I5eQ.js","_app/immutable/chunks/DSlFIRKF.js","_app/immutable/chunks/BKaRVucg.js","_app/immutable/chunks/C-Bfzokj.js","_app/immutable/chunks/En2E40Cu.js","_app/immutable/chunks/DOG_QbrM.js"];
export const stylesheets = ["_app/immutable/assets/0.DLaRVqP1.css"];
export const fonts = [];
