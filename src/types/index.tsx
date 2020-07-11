import * as React from 'react';

export interface IProps {
  name: string;
  options: Array<{
    text?: string;
    value?: string;
    optHeader?: boolean;
    markup?: React.ReactNode;
    disabled?: boolean;
  }>;
  noSelectionLabel?: string;
  onSubmit?: (event: any) => void;
  /**
   * singleselect mode | multiselect mode
   */
  onChange?: (
    changes:
      | {
          altered?: boolean; // Property added when outputed via onChange, onBlur etc. Passed around without this property
          text?: string;
          name?: string;
          value?: string;
        }
      | {
          altered?: boolean; // Property added when outputed via onChange, onBlur etc. Passed around without this property
          options: Array<{
            text?: string;
            name?: string;
            value?: string;
          }>;
        }
  ) => void;
  /**
   * singleselect mode | multiselect mode
   */
  onBlur?: (
    changes:
      | {
          altered?: boolean; // Property added when outputed via onChange, onBlur etc. Passed around without this property
          text?: string;
          name?: string;
          value?: string;
        }
      | {
          altered?: boolean; // Property added when outputed via onChange, onBlur etc. Passed around without this property
          options: Array<{
            text?: string;
            name?: string;
            value?: string;
          }>;
        }
  ) => void;
  caretIcon?: React.ReactNode;
  selectedValue?: string;
  prefix?: string;
  disabled?: boolean;
  /**
   * singleselect mode | multiselect mode
   */
  customLabelRenderer?: (
    selected:
      | {
          text?: string;
          value?: string;
          disabled?: boolean;
        }
      | {
          options: Array<{
            text?: string;
            value?: string;
            disabled?: boolean;
          }>;
        }
  ) => React.ReactNode;
  multiselect?: boolean;
  selectedValues?: string[];
  /**
   * `onListen` is handy for those situations where you need to change something potentially outside of your
   * control, e.g. setting a class on <body/> when the options panel opens to inhibit body scrolling.
   */
  onListen?: (isOpen?: boolean, name?: string, actionType?: string) => void;
  /**
   * `onSelect` passes back the option you just selected (singleselect/multiselect)
   */
  onSelect?: (option: IOption) => void;
  /**
   * `onDeselect` passes back the option you just deselected (multiselect)
   */
  onDeselect?: (option: IOption) => void;
  /**
   * Add a close button for when the the mobile view shows the selection modal.
   * You'll essentially be clicking the background so this is purely visual.
   */
  modalCloseButton?: React.ReactNode;
}

export interface IState {
  altered?: boolean;
  disabled?: boolean;
  hasOptHeaders?: boolean;
  noSelectionLabel?: string;
  isDragging: boolean;
  isOptionsPanelOpen: boolean;
  multiSelectInitialSelectedIndexes: number[];
  multiSelectSelectedIndexes: number[];
  multiSelectSelectedOptions: {
    altered?: boolean;
    options: Array<{
      value?: string;
      text?: string;
      name?: string;
    }>;
  };
  multiselect: boolean;
  name: string;
  nextPotentialSelectionIndex: number;
  options: Array<{
    text?: string;
    value?: string;
    optHeader?: boolean;
    markup?: React.ReactNode;
    disabled?: boolean;
  }>;
  singleSelectInitialIndex: number;
  singleSelectSelectedIndex: number;
  singleSelectSelectedOption: {
    altered?: boolean; // Property added when outputed via onChange, onBlur etc. Passed around without this property
    text?: string;
    name?: string;
    value?: string;
  };
}

/*

  Export Interfaces That are reused within /src. Not used above because
  props output in storybook is better when verbosely stated

*/

export interface IOption {
  text?: string;
  value?: string;
  optHeader?: boolean;
  markup?: React.ReactNode;
  disabled?: boolean;
}

export interface IOutputSingleSelect {
  name?: string;
  text?: string;
  value?: string;
  altered?: boolean;
}

export interface IOutputMultiSelect {
  options: Array<{
    name?: string;
    text?: string;
    value?: string;
  }>;
  altered?: boolean;
}

export interface IOutputMultiSelectOption {
  name?: string;
  text?: string;
  value?: string;
  disabled?: boolean;
}

export interface IAction {
  type: string;
  value?: any;
}
