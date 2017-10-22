export default function containsClassName(element, classNameStr) {
  if (element && element.className) {
    return element.className.split(' ').indexOf(classNameStr) > -1;
  }
}
