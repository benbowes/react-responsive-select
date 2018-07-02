import React, { Component } from 'react';
import singleline from 'singleline';
import { SingleSelectOptionProps } from '../propTypes';

export default class SingleSelectOption extends Component {
  componentDidUpdate() {
    const { index, isOptionsPanelOpen, nextPotentialSelectionIndex } = this.props;
    if (index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
      this[`option_${index}`].focus();
    }
  }

  render() {
    const {
      index,
      nextPotentialSelectionIndex,
      option,
      singleSelectSelectedIndex,
    } = this.props;

    return (
      <li
        role="menuitem"
        tabIndex="-1"
        aria-disabled={option.disabled ? 'true' : 'false'}
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={singleline(`
          rrs__option
          ${(singleSelectSelectedIndex === index) ? 'rrs__option--selected' : ''}
          ${(nextPotentialSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
          ${(option.disabled === true) ? 'rrs__option--disabled' : ''}
        `)}
      >
        {option.markup || option.text}
      </li>
    );
  }
}

SingleSelectOption.propTypes = SingleSelectOptionProps;
