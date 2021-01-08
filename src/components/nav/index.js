import Utils from '../../utils/utils';

export default class PriorityNavigation extends HTMLElement {
  constructor() {
    super();
    this.breakWidths = [];
  }
  connectedCallback() {
    this.innerHTML = `
    <nav class="nav">
    <ul class="horizontal-links">
    ${this.innerHTML}
    </ul>
    <div class="hide show-more" id="more"><div id="show-btn" class="item item--hover"><i class="fab fa-elementor item__icon"></i>Show More</div><ul class="vertical-links">${this.innerHTML}</ul><div class="backdrop"></div></div>
    </nav>`;

    this.hideItem = document.querySelector('#more');
    this.numOfAllitem = document.querySelector(
      '.horizontal-links',
    ).children.length;
    this.handlePriortity();
    const btn = document.querySelector('#show-btn');
    btn.addEventListener('click', () => {
      btn.classList.toggle('item--active');
      btn.nextSibling.classList.toggle('active-links');
    });
  }

  setBreaksWidth(visibleLinks) {
    let totalSpace = 0;
    Array.from(visibleLinks.children).forEach((item) => {
      totalSpace += item.offsetWidth;
      this.breakWidths.push(totalSpace);
    });
  }

  handlePriortity() {
    const visibleLinks = document.querySelector('.horizontal-links');
    this.setBreaksWidth(visibleLinks);
    window.addEventListener('resize', () => {
      this.checkWidth();
    });
    this.checkWidth();
  }

  checkWidth() {
    const visibleLinks = document.querySelector('.horizontal-links');
    const hidenLinks = document.querySelector('.vertical-links');
    if (window.matchMedia('(min-width: 480px)').matches) {
      let availableSpace = Utils.getWidth(visibleLinks);
      let numOfVisibleItems = Array.from(visibleLinks.children).filter(
        (item) => item.style.display !== 'none',
      ).length;
      let requiredSpace = this.breakWidths[numOfVisibleItems - 1];

      if (requiredSpace > visibleLinks.getBoundingClientRect().width - 35) {
        visibleLinks.children.item(numOfVisibleItems - 1).style.display =
          'none';
        hidenLinks.children.item(numOfVisibleItems - 1).style.display = 'block';
        // Utils.prependToFirst(
        // visibleLinks.children.item(visibleLinks.children.length - 1),
        // hidenLinks,
        // );
        numOfVisibleItems -= 1;
        this.checkWidth();
      } else if (availableSpace > this.breakWidths[numOfVisibleItems]) {
        visibleLinks.children.item(numOfVisibleItems).style.display = 'block';
        hidenLinks.children.item(numOfVisibleItems).style.display = 'none';
        //Utils.prependTolast(hidenLinks.children.item(0), visibleLinks);
        numOfVisibleItems += 1;
      }

      if (this.numOfAllitem - numOfVisibleItems > 0) {
        this.hideItem.classList.remove('hide');
      } else {
        this.hideItem.classList.add('hide');
      }
    }
  }
}

customElements.define('priority-navigation', PriorityNavigation);
