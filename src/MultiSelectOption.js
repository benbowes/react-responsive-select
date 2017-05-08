import React, { Component, PropTypes } from 'react';

export default class MultiSelectOption extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    multiSelectSelectedIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    potentialOptionSelectionIndex: PropTypes.number,
    option: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      markup: PropTypes.element
    }).isRequired
  }

  render(){
    const {
      potentialOptionSelectionIndex,
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
          ${(potentialOptionSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
        `}
      >
        {option.markup || option.text}
      </div>
    );
  }
}
