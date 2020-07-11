export function containsClassName(element: HTMLElement, classNameStr: string): boolean {
  return (
    String(element.className)
      .split(' ')
      .indexOf(classNameStr) > -1
  );
}
