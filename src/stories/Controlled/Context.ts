import { createContext } from 'react';

export const Context = createContext({
    selectedValue: 'null',
    selectedValues: [],
    isSingleSelect: true,
    isDisabled: false,
    initialState: {
        singleSelectOptions: [],
        multiSelectOptions: [],
    },
    functions: {},
});
