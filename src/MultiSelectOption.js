import React, { Component, PropTypes } from 'react';

export default class MultiSelectOption extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    multiSelectSelectedIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    nextPotentialSelectionIndex: PropTypes.number,
    option: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      markup: PropTypes.element
    }).isRequired
  }

  render(){
    const {
      nextPotentialSelectionIndex,
      option,
      index,
      multiSelectSelectedIndexes
    } = this.props;

    return (
      <div
        role="option"
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={`
          rrs__option
          ${(multiSelectSelectedIndexes.some(i => i === index)) ? 'rrs__option--selected' : ''}
          ${(nextPotentialSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
        `}
      >
        {option.markup || option.text}
      </div>
    );
  }
}
