import React, { Component, PropTypes } from 'react';

export default class SingleSelectOption extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number,
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
      selectedIndex
    } = this.props;

    return (
      <div
        role="option"
        data-key={index}
        ref={(r) => { this[`option_${index}`] = r; }}
        className={`
          rrs__option
          ${(selectedIndex === index) ? 'rrs__option--selected' : ''}
          ${(nextSelectedIndex === index) ? 'rrs__option--next-selection' : ''}
        `}
      >
        {option.markup || option.text}
      </div>
    );
  }
}
