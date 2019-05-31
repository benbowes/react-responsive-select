import { IOutputSingleSelect } from '../../types/';

export function singleSelectBroadcastChange(
  currValue: IOutputSingleSelect,
  altered?: boolean,
  fn?: (changes: IOutputSingleSelect) => void,
  prevValue?: IOutputSingleSelect,
): void {
  if (!fn) {
    return;
  }

  const shouldBroadcastChange = !(JSON.stringify(prevValue) === JSON.stringify(currValue));

  if (shouldBroadcastChange) {
    fn({
      name: currValue.name,
      text: currValue.text,
      value: currValue.value,
      altered,
    });
  }
}
