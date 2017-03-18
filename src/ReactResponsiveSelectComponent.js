import React, { Component, PropTypes } from 'react';

export default class ReactResponsiveSelectComponent extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    dropdownIcon: PropTypes.element,
    prefix: PropTypes.string,
    name: PropTypes.string,
    onSubmit: PropTypes.func,
    selectedValue: PropTypes.string,
    selectedOption: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    }),
    initialIndex: PropTypes.number,
    selectedIndex: PropTypes.number,
    nextSelectedIndex: PropTypes.number,
    isOptionsPanelOpen: PropTypes.bool,
    isDragging: PropTypes.bool
  }

  componentDidUpdate(){
    const { nextSelectedIndex, isDragging } = this.props;

    // Scroll to keep the selected option in view
    if(isDragging === false) {
      this.optionsContainer.scrollTop = this[`option_${nextSelectedIndex}`].offsetTop;
    }
  }

  render(){
    const { prefix, name, dropdownIcon, selectedOption, initialIndex, selectedIndex, nextSelectedIndex, isOptionsPanelOpen, options } = this.props;
    return (
      <div
        className={`
          rrs__select-container
          ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
          ${(initialIndex !== selectedIndex) ? 'rrs__has-changed': ''}
        `}
        role="listbox"
        tabIndex="0"
      >
        <div className="rrs__label-container">
          {prefix &&
          <span>{prefix}</span>
          }
          <span className="rrs__label"> {selectedOption.text}</span>
          {dropdownIcon && dropdownIcon}
        </div>
        <div className="rrs__options-container" ref={(r) => { this.optionsContainer = r; }}>
          {options.length > 0 &&
            options.map((option, index) => (
              <div
                key={index}
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
            ))
          }
        </div>

        {name &&
        <input type="hidden" name={name} value={selectedOption.value} />
        }

      </div>
    );
  }
}
