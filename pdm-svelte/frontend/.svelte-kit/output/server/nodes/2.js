

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DsI0U-xR.js","_app/immutable/chunks/CRVcQe8l.js","_app/immutable/chunks/CQrtv1eE.js"];
export const stylesheets = [];
export const fonts = [];
