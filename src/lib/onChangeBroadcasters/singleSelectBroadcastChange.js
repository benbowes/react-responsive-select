import isEqual from 'lodash.isequal';

export default (prevValue, currValue, altered, fn) => {
  if (!fn) return;

  const shouldBroadcastChange = !isEqual(prevValue, currValue);

  if (shouldBroadcastChange) {
    fn({
      name: currValue.name,
      text: currValue.text,
      value: currValue.value,
      altered,
    });
  }
};
