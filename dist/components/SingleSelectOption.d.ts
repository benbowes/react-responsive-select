import * as React from 'react';
import { IOption } from '../types/';
interface TProps {
    index: number;
    isOptionsPanelOpen: boolean;
    optionsContainerRef: React.RefObject<HTMLUListElement>;
    nextPotentialSelectionIndex: number;
    option: IOption;
    singleSelectSelectedIndex: number;
    optHeaderLabel: string;
}
export default class SingleSelectOption extends React.Component<TProps> {
    private optionRef;
    private scrollOffset;
    constructor(props: TProps);
    getScrollOffset(): number;
    componentDidUpdate(): void;
    isDisabled(option: IOption): boolean;
    render(): React.ReactNode;
}
export {};
