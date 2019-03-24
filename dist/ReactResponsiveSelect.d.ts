import * as React from 'react';
import { IAction, IProps, IState } from './types/';
export default class ReactResponsiveSelect extends React.Component<IProps, IState> {
    selectBox: HTMLDivElement | null;
    private reducer;
    constructor(props: IProps);
    componentDidMount(): void;
    /**
     * Allow for the component to be updated/controlled via props after componentDidMount
     */
    componentWillReceiveProps(nextProps: IProps): void;
    componentDidUpdate(prevProps: IProps, prevState: IState): boolean;
    updateState(action: IAction, callback?: (nextState: IState) => any): void;
    focusButton(): void;
    render(): React.ReactNode;
}
