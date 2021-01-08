class NavItem extends HTMLElement {
  static get observedAttributes() {
    return ['to'];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <li>
        <a class="menu__item__link menu__item__link--big" href="${this.getAttribute(
          'to',
        )}">
          ${this.innerHTML}
        </a>
      </li> `;
  }
}
customElements.define('nav-item', NavItem);
