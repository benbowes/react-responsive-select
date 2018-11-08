import * as React from "react";

import OnBlurMultiSelect = ReactResponsiveSelect.IOnBlurMultiSelect;
import OnBlurSingleSelect = ReactResponsiveSelect.IOnBlurSingleSelect;
import OnChangeMultiSelect = ReactResponsiveSelect.IOnChangeMultiSelect;
import OnChangeSingleSelect = ReactResponsiveSelect.IOnChangeSingleSelect;
import ReactResponsiveSelectOption = ReactResponsiveSelect.IOption;
import ReactResponsiveSelectOptionHeader = ReactResponsiveSelect.IOptionHeader
import Props = ReactResponsiveSelect.IProps;
import CustomLabelRendererSelectedOption = ReactResponsiveSelect.ICustomLabelRendererSelectedOption;
import CustomLabelRendererSelectedOptions = ReactResponsiveSelect.ICustomLabelRendererSelectedOptions;

export {
  OnBlurMultiSelect,
  OnBlurSingleSelect,
  OnChangeMultiSelect,
  OnChangeSingleSelect,
  ReactResponsiveSelectOption,
  ReactResponsiveSelectOptionHeader,
  Props,
  CustomLabelRendererSelectedOption,
  CustomLabelRendererSelectedOptions,
};

export default ReactResponsiveSelect.ReactResponsiveSelect;

declare namespace ReactResponsiveSelect {
  type JSXOutput = JSX.Element | string;
  type Option = IOptionHeader | IOption;

  interface IProps {
    name: string;
    options: Option[];
    noSelectionLabel?: string;
    onSubmit?: () => void;
    onChange?: (changes: IOnChangeSingleSelect | IOnChangeMultiSelect) => void;
    onBlur?: (changes: IOnBlurSingleSelect | IOnBlurMultiSelect) => void;
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

  interface IOptionHeader {
    text?: string;
    optHeader: boolean;
    markup?: JSXOutput;
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

  interface IOnChangeSingleSelect {
    altered: boolean;
    text: string;
    name: string;
    value: string;
  }

  interface IOnChangeMultiSelect {
    altered: boolean;
    options: Array<{
      text: string;
      value: string;
      markup?: JSXOutput;
      disabled?: boolean;
    }>;
  }

  interface IOnBlurSingleSelect {
    altered: boolean;
    text: string;
    name: string;
    value: string;
  }

  interface IOnBlurMultiSelect {
    altered: boolean;
    options: Array<{
      text: string;
      value: string;
      markup?: JSXOutput;
      disabled?: boolean;
    }>;
  }

  interface ICustomLabelRendererSelectedOption {
    text: string;
    value: string;
    markup?: JSXOutput;
    disabled?: boolean;
  }

  interface ICustomLabelRendererSelectedOptions {
    options: Array<{
      text: string;
      value: string;
      markup?: JSXOutput;
      disabled?: boolean;
    }>;
  }

  export class ReactResponsiveSelect extends React.Component<IProps> { }
}
