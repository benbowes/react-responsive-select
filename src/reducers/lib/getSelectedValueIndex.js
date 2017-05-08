export default function getSelectedValueIndex(options, selectedValue) {
  const index = options.map(option => option.value).indexOf(selectedValue);
  return (index > -1)
    ? index
    : 0;
}
