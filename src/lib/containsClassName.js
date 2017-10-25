export default function containsClassName(element, classNameStr) {
  return String(element.className).split(' ').indexOf(classNameStr) > -1;
}
