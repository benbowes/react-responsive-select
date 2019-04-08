export interface IState {
    selectedValue: string;
    initialSelectedValue: string;
    selectedValues: string[];
    initialSelectedValues: string[];
    isSingleSelect: boolean;
    isDisabled: boolean;
    initialSingleSelectOptions: Array<{ value: string; text: string; }>;
    initialMultiSelectOptions: Array<{
        value: string;
        text: string;
        markup: React.ReactElement;
    }>;
    functions: {
        handleSelectOption?: (event: any) => void,
        handleSelectOptions?: (event: any) => void,
        handleSingleSelectChange?: (event: any) => void,
        handleMultiSelectChange?: (newValue: { text: string; value: string; altered: boolean; }) => void,
        handleSelectTypeChange?: (event: any) => void,
        handleDisabledChange?: (event: any) => void,
        handleSubmit?: () => void,
    };
}
