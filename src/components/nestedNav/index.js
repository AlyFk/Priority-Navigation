export default class NestedNav extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <li>
        <a class="menu__item__link menu__item__link--big link--nested link--active" href="#">
        lihihnoihikhj
        </a>
        <ul class="menu__group">${this.innerHTML}</ul>
      </li> `;

    const navBtn = this.children.item(0).children.item(0);
    console.log(navBtn);
    navBtn.addEventListener('click', () => {
      navBtn.nextElementSibling.classList.toggle('menu__group--active');
      navBtn.classList.toggle('link--active');
    });
    navBtn.innerHTML = this.getAttribute('title');
  }
}
customElements.define('nested-nav', NestedNav);
