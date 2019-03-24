import * as React from 'react';
import { IOption, IOutputMultiSelect } from '../types/';
interface TProps {
    selectBoxRef: HTMLDivElement | null;
    caretIcon: React.ReactNode;
    customLabelText: React.ReactNode;
    disabled: boolean;
    isDragging: boolean;
    isOptionsPanelOpen: boolean;
    multiSelectSelectedIndexes: number[];
    multiSelectSelectedOptions: IOutputMultiSelect;
    name: string;
    options: IOption[];
    nextPotentialSelectionIndex: number;
    prefix: string;
}
export default class MultiSelect extends React.Component<TProps> {
    private optionsButton;
    private optionsContainer;
    constructor(props: TProps);
    componentDidUpdate(prevProps: TProps): void;
    getAriaLabel(): string;
    render(): React.ReactNode;
}
export {};
