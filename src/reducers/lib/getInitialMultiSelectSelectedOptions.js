export default function getInitialMultiSelectSelectedOptions(options, selectedValues, name) {

  if (selectedValues) {
    /* Grab selected options by matching option.value with selectedValuesand merge in `name` */
    return options.filter(
      option => selectedValues.some(
        selectedValue => selectedValue === option.value
      )
    )
    .map( option => ({ name, ...option }) );

  } else {
    /* Grab first option and merge in `name` */
    return [{ name, ...options[0] }];
  }

}
