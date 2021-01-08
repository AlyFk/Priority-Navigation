export default class Utils {
  static getWidth(element) {
    return (
      parseFloat(getComputedStyle(element, null).width.replace("px", "")) - 10
    );
  }
  static prependToFirst(element, target) {
    target.insertBefore(element, target.firstChild);
  }
  static prependTolast(element, target) {
    target.insertBefore(element, target.lastChild.nextSibling);
  }
}
