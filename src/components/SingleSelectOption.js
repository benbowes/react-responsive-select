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
      customOptionRenderer,
    } = this.props;

    return (
      <li
        role="menuitem"
        tabIndex="-1"
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={singleline(`
          rrs__option
          ${(singleSelectSelectedIndex === index) ? 'rrs__option--selected' : ''}
          ${(nextPotentialSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
        `)}
      >
        {customOptionRenderer ? customOptionRenderer(option) : (option.markup || option.text)}
      </li>
    );
  }
}

SingleSelectOption.propTypes = SingleSelectOptionProps;
