

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CtEhVRGE.js","_app/immutable/chunks/CpkR0JiJ.js","_app/immutable/chunks/Bo0lOMDE.js","_app/immutable/chunks/hPcP81BV.js"];
export const stylesheets = [];
export const fonts = [];
