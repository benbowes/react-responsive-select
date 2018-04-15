export const multiSelectBroadcastChange = (prevOptions, currOptions, altered, onChange) => {
  if (!onChange) return;

  const shouldBroadcastChange = (
    prevOptions.length &&
    (
      (prevOptions.length !== currOptions.length)
      || (prevOptions.map(v => v.value).join('') !== currOptions.map(v => v.value).join(''))
    )
  );

  if (shouldBroadcastChange) {
    onChange({
      options: currOptions.map(currOption => ({
        name: currOption.name,
        text: currOption.text,
        value: currOption.value,
      })),
      altered,
    });
  }
};

export const singleSelectBroadcastChange = (prevValue, currValue, altered, onChange) => {
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
