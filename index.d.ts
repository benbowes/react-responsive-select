import * as React from "react";

import OnBlurMultiSelect = ReactResponsiveSelect.IOnBlurMultiSelect;
import OnBlurSingleSelect = ReactResponsiveSelect.IOnBlurSingleSelect;
import OnChangeMultiSelect = ReactResponsiveSelect.IOnChangeMultiSelect;
import OnChangeSingleSelect = ReactResponsiveSelect.IOnChangeSingleSelect;
import ReactResponsiveSelectOption = ReactResponsiveSelect.IOption;
import Props = ReactResponsiveSelect.IProps;
import CustomLabelRendererSelectedOption = ReactResponsiveSelect.ICustomLabelRendererSelectedOption;
import CustomLabelRendererSelectedOptions = ReactResponsiveSelect.ICustomLabelRendererSelectedOptions;

export {
  OnBlurMultiSelect,
  OnBlurSingleSelect,
  OnChangeMultiSelect,
  OnChangeSingleSelect,
  ReactResponsiveSelectOption,
  Props,
  CustomLabelRendererSelectedOption,
  CustomLabelRendererSelectedOptions,
};

export default ReactResponsiveSelect.ReactResponsiveSelect;

declare namespace ReactResponsiveSelect {
  type JSXOutput = JSX.Element | string;

  interface IProps {
    name: string;
    options: IOption[];
    onSubmit?: () => void;
    onChange?: (changes: IOnChangeSingleSelect | IOnChangeMultiSelect) => void;
    onBlur?: (changes: IOnChangeSingleSelect | IOnChangeMultiSelect) => void;
    caretIcon?: JSXOutput;
    selectedValue?: string;
    prefix?: string;
    disabled?: boolean;
    customLabelRenderer?: (
      selected: ICustomLabelRendererSelectedOption | ICustomLabelRendererSelectedOptions
    ) => JSXOutput;
    multiselect?: boolean;
    selectedValues?: string[];
  }

  interface IOption {
    text: string;
    value: string;
    markup?: JSXOutput;
    disabled?: boolean;
  }

  interface IOnChange {
    altered: boolean;
  }

  interface IOnChangeSingleSelect extends IOnChange {
    text: string;
    name: string;
    value: string;
  }

  interface IOnChangeMultiSelect extends IOnChange {
    options: IOption[];
  }

  interface IOnBlurSingleSelect extends IOnChangeSingleSelect { }

  interface IOnBlurMultiSelect extends IOnChangeMultiSelect { }

  interface ICustomLabelRendererSelectedOption extends IOption { }

  interface ICustomLabelRendererSelectedOptions {
    options: IOption[];
  }

  export class ReactResponsiveSelect extends React.Component<IProps> { }
}
