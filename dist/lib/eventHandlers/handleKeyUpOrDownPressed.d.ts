import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';
interface TArgs {
    state: IState;
    type: 'INCREMENT' | 'DECREMENT';
    ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}
export default function handleKeyUpOrDownPressed({ state, ReactResponsiveSelectClassRef, type, }: TArgs): void;
export {};
