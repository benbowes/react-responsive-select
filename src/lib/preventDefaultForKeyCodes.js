export default (keyCodes, e) => {
  keyCodes.forEach(keyCode => {
    if (keyCode === e.keyCode) e.preventDefault();
  });
};
