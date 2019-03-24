import * as React from 'react';
import { IOption, IOutputSingleSelect } from '../types/';
interface TProps {
    prefix: string;
    singleSelectSelectedOption: IOutputSingleSelect;
    name: string;
    caretIcon: React.ReactNode;
    singleSelectSelectedIndex: number;
    noSelectionLabel: string;
    isOptionsPanelOpen: boolean;
    nextPotentialSelectionIndex: number;
    selectBoxRef: HTMLDivElement | null;
    customLabelText: React.ReactNode;
    disabled: boolean;
    options: IOption[];
}
export default class SingleSelect extends React.Component<TProps> {
    private optionsButton;
    private optionsContainer;
    constructor(props: TProps);
    componentDidUpdate(prevProps: TProps): void;
    getCustomLabel(): React.ReactNode;
    getDefaultLabel(): React.ReactNode;
    render(): React.ReactNode;
}
export {};
