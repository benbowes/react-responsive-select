import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IState } from '../../types/';
interface TArgs {
    event: MouseEvent | KeyboardEvent;
    state: IState;
    ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}
export default function handleClick({ event, state, ReactResponsiveSelectClassRef, }: TArgs): void;
export {};
