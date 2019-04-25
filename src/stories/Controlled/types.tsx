export interface IContext {
    selectedValue: string;
    selectedValues: string[];
    isSingleSelect: boolean;
    isDisabled: boolean;
    initialState: {
        singleSelectOptions: Array<{
            value: string;
            text: string;
        }>;
        multiSelectOptions: Array<{
            value: string;
            text: string;
            markup: React.ReactNode;
        }>;
    };
    functions: {
        handleSelectOption?: (event: any) => void,
        handleSelectOptions?: (event: any) => void,
        handleSingleSelectChange?: (newValue: INewSingleSelectValue) => void,
        handleMultiSelectChange?: (newValue: INewMultiSelectValue) => void,
        handleSelectTypeChange?: (event: any) => void,
        handleDisabledChange?: (event: any) => void,
        handleSubmit?: () => void,
    };
}

export interface INewMultiSelectValue {
    options: Array<{
        text: string;
        value: string;
        name: string;
    }>;
    altered: boolean;
}

export interface INewSingleSelectValue {
    text: string;
    value: string;
    altered: boolean;
    name: string;
}
