import React, { Component, PropTypes } from 'react';

export default class SingleSelectOption extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    singleSelectSelectedIndex: PropTypes.number,
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
      singleSelectSelectedIndex
    } = this.props;

    return (
      <div
        role="option"
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={`
          rrs__option
          ${(singleSelectSelectedIndex === index) ? 'rrs__option--selected' : ''}
          ${(potentialOptionSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
        `}
      >
        {option.markup || option.text}
      </div>
    );
  }
}
