import { createContext } from 'react';
import { IState } from './types';

export const Context = createContext({
    selectedValue: 'null',
    initialSelectedValue: 'null',
    selectedValues: [],
    initialSelectedValues: [],
    isSingleSelect: true,
    isDisabled: false,
    initialSingleSelectOptions: [],
    initialMultiSelectOptions: [],
    functions: {
        //
    },
});
