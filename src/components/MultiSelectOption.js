import React, { Component } from 'react';
import PropTypes from 'prop-types';
import singleline from 'singleline';

export default class MultiSelectOption extends Component {

  componentDidUpdate() {
    const { index, isOptionsPanelOpen, nextPotentialSelectionIndex } = this.props;
    if(index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
      this[`option_${index}`].focus();
    }
  }

  render(){
    const { index, multiSelectSelectedIndexes, nextPotentialSelectionIndex, option } = this.props;
    const isSelected = multiSelectSelectedIndexes.some(i => i === index);

    return (
      <li
        role="checkbox"
        tabIndex="-1"
        aria-checked={isSelected}
        aria-label={option.text}
        aria-live="assertive"
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={singleline(`
          rrs__option
          ${(isSelected) ? 'rrs__option--selected' : ''}
          ${(nextPotentialSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
        `)}
      >
        {option.markup || option.text}
      </li>
    );
  }
}

MultiSelectOption.propTypes = {
  index: PropTypes.number.isRequired,
  isOptionsPanelOpen: PropTypes.bool.isRequired,
  multiSelectSelectedIndexes: PropTypes.arrayOf(
    PropTypes.number
  ),
  nextPotentialSelectionIndex: PropTypes.number,
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    markup: PropTypes.element
  }).isRequired
};
