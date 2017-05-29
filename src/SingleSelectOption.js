import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SingleSelectOption extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    singleSelectSelectedIndex: PropTypes.number,
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
          ${(nextPotentialSelectionIndex === index) ? 'rrs__option--next-selection' : ''}
        `}
      >
        {option.markup || option.text}
      </div>
    );
  }
}
