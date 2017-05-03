import React, { Component, PropTypes } from 'react';

export default class ReactResponsiveMultiSelectComponent extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    caretIcon: PropTypes.element,
    prefix: PropTypes.string,
    name: PropTypes.string,
    onSubmit: PropTypes.func,
    selectedValue: PropTypes.string,
    selectedOption: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    }),
    customLabelText: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    initialIndex: PropTypes.number,
    selectedIndex: PropTypes.number,
    nextSelectedIndex: PropTypes.number,
    isOptionsPanelOpen: PropTypes.bool,
    isDragging: PropTypes.bool,
    isTouchDevice: PropTypes.bool
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
      prefix, name, caretIcon, multiSelectOptions, multiSelectIndexes,
      nextSelectedIndex, isTouchDevice, isOptionsPanelOpen, options, customLabelText
    } = this.props;
    return (
      <div
        className={`
          rrs__select-container
          ${(isTouchDevice === true) ? 'rrs__is-touch' : 'rrs__is-desktop'}
          ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
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
          <span className="rrs__label">
            {multiSelectOptions.length > 0 && ` ${multiSelectOptions[0].text}`}
            {multiSelectOptions.length > 1 && `(+${multiSelectOptions.length-1})`}
          </span>
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
                  ${(multiSelectIndexes.some(i => i === index)) ? 'rrs__option--selected' : ''}
                `}
              >
                {option.markup || option.text}
              </div>
            ))
          }
        </div>

        {name &&
        <input type="hidden" name={name} value={[multiSelectOptions.map(v => v.value)].join(',')} />
        }

      </div>
    );
  }
}
