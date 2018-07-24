export default function getSelectedValueIndex({ options, selectedValue, noSelectionLabel }) {
  const index = options.map(option => option.value).indexOf(selectedValue);

  // Allow a negative index if user wants to display a noSelectionLabel
  // Keyboard will not focus on an option when fisrt opened
  if (noSelectionLabel) {
    return index;
  }

  // Select the first option when panel opens if !noSelectionLabel
  return (index > -1)
    ? index
    : 0;
}
