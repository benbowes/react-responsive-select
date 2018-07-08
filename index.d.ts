import * as React from "react";

import OnChangeArgsMultiSelect = ReactResponsiveSelect.OnChangeArgsMultiSelect;
import OnChangeArgsSingleSelect = ReactResponsiveSelect.OnChangeArgsSingleSelect;
import ReactResponsiveSelectOption = ReactResponsiveSelect.ReactResponsiveSelectOption;
import ReactResponsiveSelectProps = ReactResponsiveSelect.ReactResponsiveSelectProps;

export {
  OnChangeArgsMultiSelect,
  OnChangeArgsSingleSelect,
  ReactResponsiveSelectOption,
  ReactResponsiveSelectProps,
};

export default ReactResponsiveSelect.ReactResponsiveSelect;

declare namespace ReactResponsiveSelect {
  interface ReactResponsiveSelectProps {
    name: string;
    options: ReactResponsiveSelectOption[];
    onSubmit?: () => void;
    onChange?: (changes: OnChangeArgsSingleSelect | OnChangeArgsMultiSelect) => void;
    caretIcon?: JSX.Element | string;
    selectedValue?: string;
    prefix?: string;
    disabled?: boolean;
    customLabelRenderer?: (
      selected: ReactResponsiveSelectOption | { options: ReactResponsiveSelectOption[] }
    ) => JSX.Element | string;
    multiselect?: boolean;
    selectedValues?: string[];
  }

  interface OnChangeArgsSingleSelect {
    altered: boolean;
    text: string;
    name: string;
    value: string;
  }

  interface OnChangeArgsMultiSelect {
    altered: boolean;
    options: ReactResponsiveSelectOption[];
  }

  interface ReactResponsiveSelectOption {
    text: string;
    value: string;
    markup?: JSX.Element;
    disabled?: boolean;
  }

  interface CustomRendererReactResponsiveSelectOption {
    text: string;
    value: string;
    markup?: JSX.Element;
    disabled?: boolean;
  }

  export class ReactResponsiveSelect extends React.Component<ReactResponsiveSelectProps> {}
}
