import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.CKB6ls0T.js","_app/immutable/chunks/DW3n6JEE.js","_app/immutable/chunks/CIw2SDev.js","_app/immutable/chunks/s7fLFvbM.js","_app/immutable/chunks/DWuVTDaa.js","_app/immutable/chunks/CFvMyRA2.js","_app/immutable/chunks/DEDh6TSu.js","_app/immutable/chunks/B3Fzou4b.js"];
export const stylesheets = [];
export const fonts = [];
