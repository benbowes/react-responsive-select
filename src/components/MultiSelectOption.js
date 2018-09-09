import React, { Component } from 'react';
import singleline from 'singleline';
import { MultiSelectOptionProps } from '../propTypes';

export default class MultiSelectOption extends Component {
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

  render() {
    const {
      index,
      multiSelectSelectedIndexes,
      nextPotentialSelectionIndex,
      option,
    } = this.props;
    const isSelected = multiSelectSelectedIndexes.some(i => i === index);

    return (
      <li
        role="checkbox"
        tabIndex="-1"
        aria-checked={isSelected}
        aria-label={option.text}
        aria-live="assertive"
        aria-disabled={option.disabled ? 'true' : 'false'}
        data-key={index}
        index={index}
        ref={this.optionRef}
        className={singleline(`
          rrs__option
          ${isSelected ? 'rrs__option--selected' : ''}
          ${
            nextPotentialSelectionIndex === index
              ? 'rrs__option--next-selection'
              : ''
          }
          ${option.disabled === true ? 'rrs__option--disabled' : ''}
        `)}
      >
        {option.markup || option.text}
      </li>
    );
  }
}

MultiSelectOption.propTypes = MultiSelectOptionProps;
