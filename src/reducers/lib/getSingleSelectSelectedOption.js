export default function getSingleSelectSelectedOption(
  { noSelectionLabel, name, options },
  initialSelectedIndex = 0,
) {
  // has selection, has no selection use default noSelectionLabel (if exists) and nullify value

  if (!noSelectionLabel) {
    // Preselect the first item in the list when if no noSelectionLabel exists
    const selectionIndex =
      initialSelectedIndex === -1 ? 0 : initialSelectedIndex;

    return {
      name,
      ...options[selectionIndex],
    };
  }

  return initialSelectedIndex > -1
    ? {
        name,
        ...options[initialSelectedIndex],
      }
    : {
        name,
        text: noSelectionLabel,
        value: 'null',
      };
}
