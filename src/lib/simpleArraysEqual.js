/**
* A function to shallow compare 2 arrays. Does not work on an
* array of objects or an array of arrays
* @param {Array} a - shallow array
* @param {Array} b - shallow array
* @returns {Boolean}
*/
export default function simpleArraysEqual(a, b) {
  const aLength = a.length;
  if (aLength !== b.length) return false;

  for (let i = 0; i < aLength; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
