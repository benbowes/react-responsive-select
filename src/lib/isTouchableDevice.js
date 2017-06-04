export default function isTouchableDevice() {
  return (
    ('ontouchstart' in window)
    || (window.navigator.MaxTouchPoints > 0)
    || (window.navigator.msMaxTouchPoints > 0)
  ) || false;
}
