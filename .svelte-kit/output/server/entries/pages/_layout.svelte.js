import { a as attr_class, h as head } from "../../chunks/index.js";
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let scrolled = false;
    let menuOpen = false;
    $$renderer2.push(`<header${attr_class("nav-bar", void 0, { "scrolled": scrolled })} id="navbar"><h1 class="nav-logo">Ireland 2026</h1> <nav><ul${attr_class("nav-links", void 0, { "open": menuOpen })}><li><a href="#map-section">Carte</a></li> <li><a href="#roadbook">Road Book</a></li> <li><a href="#dashboard">Resume</a></li> <li><a href="#tips">Conseils</a></li> <li><a href="#blogs">Blogs</a></li></ul></nav> <button${attr_class("nav-hamburger", void 0, { "open": menuOpen })} aria-label="Menu"><span></span><span></span><span></span></button></header>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Ireland Road Trip 2026 — Wild Atlantic Way</title>`);
    });
  });
  Navbar($$renderer);
  $$renderer.push(`<!----> <main>`);
  children($$renderer);
  $$renderer.push(`<!----></main>`);
}
export {
  _layout as default
};
