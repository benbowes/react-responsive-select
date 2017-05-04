import React, { Component, PropTypes } from 'react';

export default class ReactResponsiveSelectComponent extends Component {

  static propTypes = {
    caretIcon: PropTypes.element,
    customLabelText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    initialIndex: PropTypes.number,
    isDragging: PropTypes.bool,
    isOptionsPanelOpen: PropTypes.bool,
    isTouchDevice: PropTypes.bool,
    name: PropTypes.string,
    nextSelectedIndex: PropTypes.number,
    onSubmit: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    prefix: PropTypes.string,
    selectedIndex: PropTypes.number,
    selectedOption: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    }),
    selectedValue: PropTypes.string
  }

  componentDidUpdate(){
    const { nextSelectedIndex, isDragging, isTouchDevice } = this.props;

    // Scroll to keep the selected option in view if on desktop
    if(isDragging === false && !isTouchDevice) {
      this.optionsContainer.scrollTop = this[`option_${nextSelectedIndex}`].offsetTop;
    }
  }

  render(){
    const {
      caretIcon,
      customLabelText,
      initialIndex,
      isOptionsPanelOpen,
      isTouchDevice,
      name,
      nextSelectedIndex,
      options,
      prefix,
      selectedIndex,
      selectedOption
    } = this.props;

    return (
      <div
        className={`
          rrs__select-container
          ${(isTouchDevice === true) ? 'rrs__is-touch' : 'rrs__is-desktop'}
          ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
          ${(initialIndex !== selectedIndex) ? 'rrs__has-changed': ''}
        `}
        role="listbox"
        tabIndex="0"
      >

        {customLabelText &&
        <div className="rrs__label-container">
          <span className="rrs__label">{customLabelText}</span>
          {caretIcon && caretIcon}
        </div>
        }

        {!customLabelText &&
        <div className="rrs__label-container">
          {prefix &&
          <span>{prefix}</span>
          }
          <span className="rrs__label"> {selectedOption.text}</span>
          {caretIcon && caretIcon}
        </div>
        }

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
