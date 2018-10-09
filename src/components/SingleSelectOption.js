import React, { Component } from 'react';
import singleline from 'singleline';
import { SingleSelectOptionProps } from '../propTypes';

export default class SingleSelectOption extends Component {
  constructor() {
    super();
    this.optionRef = React.createRef();
  }

  componentDidUpdate() {
    const {
      index,
      isOptionsPanelOpen,
      nextPotentialSelectionIndex,
    } = this.props;
    if (index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
      this.optionRef.current.focus();
    }
  }

  isDisabled(option) {
    return option.disabled || option.optHeader;
  }

  render() {
    const {
      index,
      nextPotentialSelectionIndex,
      option,
      singleSelectSelectedIndex,
      optHeaderLabel,
    } = this.props;

    return (
      <li
        role="menuitem"
        tabIndex="-1"
        aria-disabled={this.isDisabled(option) ? 'true' : 'false'}
        aria-label={`
          ${option.text || (option.markup && option.markup.textNode)} ${
          optHeaderLabel !== '' ? ` of ${optHeaderLabel}` : ''
        }
        `}
        data-key={index}
        index={index}
        ref={this.optionRef}
        className={singleline(`
          rrs__option
          ${singleSelectSelectedIndex === index ? 'rrs__option--selected' : ''}
          ${
            nextPotentialSelectionIndex === index
              ? 'rrs__option--next-selection'
              : ''
          }
          ${option.disabled === true ? 'rrs__option--disabled' : ''}
          ${option.optHeader === true ? 'rrs__option--header' : ''}
        `)}
      >
        {option.markup || option.text}
      </li>
    );
  }
}

SingleSelectOption.propTypes = SingleSelectOptionProps;
