export default function getSelectedValueIndexes(options, selectedValues = []) {
  const result = options.map((option, optionIndex) => {
    /* return the index of the found item, if found */
    return selectedValues.some(selected => option.value === selected)
      ? optionIndex
      : undefined;
  })
  .filter(r => r !== undefined);

  /* If something found return that, else return the first item */
  return result.length
    ? result
    : [0];
}
