import { IOutputSingleSelect } from '../../types/';
import { isEqual } from '../../lib/isEqual';

export function singleSelectBroadcastChange(
  currValue: IOutputSingleSelect,
  altered?: boolean,
  fn?: (changes: IOutputSingleSelect) => void,
  prevValue?: IOutputSingleSelect
): void {
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
}
