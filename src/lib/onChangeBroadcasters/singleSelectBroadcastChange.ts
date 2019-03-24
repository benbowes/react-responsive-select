import * as isEqual from 'lodash.isequal';
import { IOutputSingleSelect } from '../../types/';

export default (
  currValue: IOutputSingleSelect,
  altered: boolean,
  fn?: (changes: IOutputSingleSelect) => void,
  prevValue?: IOutputSingleSelect,
): void => {
  if (!fn) {
    return;
  }

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
