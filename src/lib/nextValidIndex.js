export function nextValidIndex(
  options,
  nextPotentialSelectionIndex,
  mode = 'INCREMENT',
) {
  const possibleOptionIndexes = options.reduce((acc, option, index) => {
    if (!option.optHeader) acc.push(index);
    return acc;
  }, []);

  const indexNotFocusable =
    possibleOptionIndexes.indexOf(nextPotentialSelectionIndex) === -1;

  if (indexNotFocusable && mode === 'INCREMENT') {
    return options[nextPotentialSelectionIndex + 1]
      ? nextPotentialSelectionIndex + 1
      : possibleOptionIndexes[0];
  }

  if (indexNotFocusable && mode === 'DECREMENT') {
    return options[nextPotentialSelectionIndex - 1]
      ? nextPotentialSelectionIndex - 1
      : possibleOptionIndexes[possibleOptionIndexes.length - 1];
  }

  return nextPotentialSelectionIndex;
}
