import { IOption } from '../../types/';

interface TArgs {
  options: IOption[];
  selectedValue: string;
  noSelectionLabel: string;
}

export function getSelectedValueIndex({ options, selectedValue, noSelectionLabel }: TArgs): number {
  const index = selectedValue ? options.map((option: IOption) => option.value).indexOf(selectedValue) : -1;

  // Allow a negative index if user wants to display a noSelectionLabel
  // Keyboard will not focus on an option when first opened

  // Select the first option when panel opens if !noSelectionLabel
  return index > -1 || noSelectionLabel ? index : 0;
}
