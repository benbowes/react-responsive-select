import { IOption } from '../../types/';
interface TArgs {
    options: IOption[];
    selectedValue: string;
    noSelectionLabel: string;
}
export default function getSelectedValueIndex({ options, selectedValue, noSelectionLabel, }: TArgs): number;
export {};
