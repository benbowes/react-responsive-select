import React, { Component, PropTypes } from 'react';

export default class ReactResponsiveMultiSelectComponent extends Component {

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
    multiSelectIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    multiSelectOptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        text: PropTypes.string,
        value: PropTypes.string,
        markup: PropTypes.object
      })
    ),
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
      isOptionsPanelOpen,
      isTouchDevice,
      multiSelectIndexes,
      multiSelectOptions,
      name,
      nextSelectedIndex,
      options,
      prefix
    } = this.props;

    return (
      <div
        className={`
          rrs__select-container
          rrs__select-container--multiselect
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
            {multiSelectOptions.length > 1 && ` (+${multiSelectOptions.length-1})`}
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
                  ${(nextSelectedIndex === index) ? 'rrs__option--next-selection' : ''}
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
