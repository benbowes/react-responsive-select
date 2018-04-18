export default (prevOptions, currOptions, altered, onChange) => {
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
