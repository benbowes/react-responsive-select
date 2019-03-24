import { IOption, IState } from '../../types/';
export default function getSingleSelectSelectedOption(state: IState, initialSelectedIndex?: number): IOption & {
    name: string;
};
