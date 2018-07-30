export default function getMultiSelectInitialSelectedOptions({
  options, name, selectedValues, noSelectionLabel,
}) {
  if (!noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
    if (selectedValues) {
      /* Grab selected options by matching option.value with selectedValuesand merge in `name` */
      return options
        .filter(option => selectedValues.some(selectedValue => selectedValue === option.value))
        .map(option => ({ name, ...option }));
    }

    /* Grab first option and merge in `name` */
    return [{ name, ...options[0] }];
  }

  return (selectedValues && selectedValues.length > 0)
    ? options
      .filter(option => selectedValues.some(selectedValue => selectedValue === option.value))
      .map(option => ({ name, ...option }))
    : [{
      name,
      text: noSelectionLabel,
      value: 'null',
    }];
}
