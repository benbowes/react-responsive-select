import React, { Component } from 'react';
import { SingleSelectOptionProps } from '../propTypes';
import singleline from 'singleline';

export default class SingleSelectOption extends Component {

  componentDidUpdate() {
    const { index, isOptionsPanelOpen, nextPotentialSelectionIndex } = this.props;
    if(index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
      this[`option_${index}`].focus();
    }
  }

  render(){
    const {
      index,
      nextPotentialSelectionIndex,
      option,
      singleSelectSelectedIndex
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
        {option.markup || option.text}
      </li>
    );
  }
}

SingleSelectOption.propTypes = SingleSelectOptionProps;
