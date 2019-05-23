import * as isEqual from 'lodash.isequal';
import { IOutputMultiSelect, IOutputMultiSelectOption } from '../../types/';

export function multiSelectBroadcastChange(
  currOptions: IOutputMultiSelectOption[],
  altered: boolean,
  fn?: (changes: IOutputMultiSelect) => void,
  prevOptions?: IOutputMultiSelectOption[],
): void {
  if (!fn) {
    return;
  }

  const shouldBroadcastChange =
    !prevOptions || !isEqual(prevOptions, currOptions);

  if (shouldBroadcastChange) {
    fn({
      options: currOptions.map((currOption: IOutputMultiSelectOption) => ({
        name: currOption.name || '',
        text: currOption.text || '',
        value: currOption.value || '',
      })),
      altered,
    });
  }
}
