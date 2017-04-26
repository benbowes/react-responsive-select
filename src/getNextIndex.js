export default function getNextIndex(
  mode,
  isOptionsPanelOpen,
  selectedIndex,
  optionNodesLength
) {

  if (mode === 'increment') {
    // Hold selection on current selected option when options panel first opens
    if (isOptionsPanelOpen === false) return selectedIndex;
    // User is at the end of the options so stay there
    if (selectedIndex === optionNodesLength - 1) return optionNodesLength - 1;
    // Else increment
    return selectedIndex + 1;
  }

  if (mode === 'decrement') {
    // Hold selection on current selected option when options panel first opens
    if (isOptionsPanelOpen === false) return selectedIndex;
    // User is at start of the options so stay there
    if (selectedIndex === 0) return 0;
    // Else decrement
    return selectedIndex - 1;
  }

}
