import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { IProps, IState } from '../../types/';
interface TArgs {
    event: KeyboardEvent;
    state: IState;
    props: IProps;
    ReactResponsiveSelectClassRef: ReactResponsiveSelect;
}
export default function handleKeyEvent({ event, state, props, ReactResponsiveSelectClassRef, }: TArgs): void;
export {};
