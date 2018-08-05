import isEqual from 'lodash.isequal';

export default (prevValue, currValue, altered, onChange) => {
  if (!onChange) return;

  const shouldBroadcastChange = !isEqual(prevValue, currValue);

  if (shouldBroadcastChange) {
    onChange({
      name: currValue.name,
      text: currValue.text,
      value: currValue.value,
      altered,
    });
  }
};
