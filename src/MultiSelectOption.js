import React, { Component, PropTypes } from 'react';

export default class MultiSelectOption extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    multiSelectIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    nextSelectedIndex: PropTypes.number,
    option: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      markup: PropTypes.element
    }).isRequired
  }

  render(){
    const {
      nextSelectedIndex,
      option,
      index,
      multiSelectIndexes
    } = this.props;

    return (
      <div
        role="option"
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={`
          rrs__option
          ${(multiSelectIndexes.some(i => i === index)) ? 'rrs__option--selected' : ''}
          ${(nextSelectedIndex === index) ? 'rrs__option--next-selection' : ''}
        `}
      >
        {option.markup || option.text}
      </div>
    );
  }
}
