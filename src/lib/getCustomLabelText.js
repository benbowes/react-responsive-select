export default function getCustomLabelText({ state, props }) {
  const { multiselect, customLabelRenderer } = props;
  const { multiSelectSelectedOptions, singleSelectSelectedOption } = state;

  if (!customLabelRenderer) return false;

  if (multiselect) return customLabelRenderer(multiSelectSelectedOptions);

  return customLabelRenderer(singleSelectSelectedOption);
}
