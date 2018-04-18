export default (prevValue, currValue, altered, onChange) => {
  if (!onChange) return;

  const shouldBroadcastChange = (prevValue && prevValue.value !== currValue.value);

  if (shouldBroadcastChange) {
    onChange({
      name: currValue.name,
      text: currValue.text,
      value: currValue.value,
      altered,
    });
  }
};
