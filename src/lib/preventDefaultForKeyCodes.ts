export function preventDefaultForKeyCodes(keyCodes: number[], e: KeyboardEvent): void {
  keyCodes.forEach((keyCode: number) => {
    if (keyCode === e.keyCode) {
      e.preventDefault();
    }
  });
}
