import { nextValidIndex } from '../../lib/nextValidIndex';

export default function getMultiSelectSelectedValueIndexes(
  state,
  selectedValues = [],
  noSelectionLabel,
) {
  const { options } = state;
  const result = options
    .map(
      (option, optionIndex) =>
        /* return the index of the found item, if found */
        selectedValues.some(selected => option.value === selected)
          ? optionIndex
          : undefined,
    )
    .filter(r => r !== undefined);

  const emptyResult = noSelectionLabel ? [] : [nextValidIndex(state, 0)];

  /* If something found return that, else return the first item */
  return result.length ? result : emptyResult;
}
