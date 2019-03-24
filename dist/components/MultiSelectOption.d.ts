import * as React from 'react';
import { IOption } from '../types/';
interface TProps {
    index: number;
    isOptionsPanelOpen: boolean;
    nextPotentialSelectionIndex: number;
    optionsContainerRef: React.RefObject<HTMLUListElement>;
    optHeaderLabel: string;
    multiSelectSelectedIndexes: number[];
    option: IOption;
}
export default class MultiSelectOption extends React.Component<TProps> {
    private optionRef;
    private scrollOffset;
    constructor(props: TProps);
    getScrollOffset(): number;
    componentDidUpdate(): void;
    isDisabled(option: IOption): boolean;
    render(): React.ReactNode;
}
export {};
