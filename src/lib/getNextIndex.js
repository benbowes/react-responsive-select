export default function getNextIndex(
  mode,
  isOptionsPanelOpen,
  singleSelectSelectedIndex,
  optionNodesLength
) {

  if (mode === 'increment') {
    // Hold selection on current selected option when options panel first opens
    if (isOptionsPanelOpen === false) return singleSelectSelectedIndex;
    // User is at the end of the options so stay there
    if (singleSelectSelectedIndex === optionNodesLength - 1) return optionNodesLength - 1;
    // Else increment
    return singleSelectSelectedIndex + 1;
  }

  if (mode === 'decrement') {
    // Hold selection on current selected option when options panel first opens
    if (isOptionsPanelOpen === false) return singleSelectSelectedIndex;
    // User is at start of the options so stay there
    if (singleSelectSelectedIndex === 0) return 0;
    // Else decrement
    return singleSelectSelectedIndex - 1;
  }

}
