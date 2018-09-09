import isEqual from 'lodash.isequal';

export default (prevOptions, currOptions, altered, fn) => {
  if (!fn) return;

  const shouldBroadcastChange = !isEqual(prevOptions, currOptions);

  if (shouldBroadcastChange) {
    fn({
      options: currOptions.map(currOption => ({
        name: currOption.name,
        text: currOption.text,
        value: currOption.value,
      })),
      altered,
    });
  }
};
