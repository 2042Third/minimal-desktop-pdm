

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.hG_o33DK.js","_app/immutable/chunks/CRVcQe8l.js"];
export const stylesheets = [];
export const fonts = [];
