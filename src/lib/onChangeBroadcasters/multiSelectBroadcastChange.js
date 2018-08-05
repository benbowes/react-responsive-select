import isEqual from 'lodash.isequal';

export default (prevOptions, currOptions, altered, onChange) => {
  if (!onChange) return;

  const shouldBroadcastChange = !isEqual(prevOptions, currOptions);

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
