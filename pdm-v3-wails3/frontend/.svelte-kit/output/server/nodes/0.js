import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.YFIjT9xX.js","_app/immutable/chunks/CpkR0JiJ.js","_app/immutable/chunks/Bo0lOMDE.js","_app/immutable/chunks/hPcP81BV.js","_app/immutable/chunks/ClAXVajm.js","_app/immutable/chunks/CcvgdUSE.js","_app/immutable/chunks/B1dp9kIC.js","_app/immutable/chunks/CgmrDAx4.js"];
export const stylesheets = ["_app/immutable/assets/0.COt4TCKR.css"];
export const fonts = [];
