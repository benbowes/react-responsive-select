import React, { Component, PropTypes } from 'react';
import scrollIntoViewIIHOC from './lib/scrollIntoViewIIHOC';
import MultiSelectOption from './MultiSelectOption';

const MultiSelectOptionHOC = scrollIntoViewIIHOC(MultiSelectOption);

export default class MultiSelect extends Component {

  static propTypes = {
    caretIcon: PropTypes.element,
    customLabelText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    initialIndex: PropTypes.number,
    initialSelectedIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    isDragging: PropTypes.bool,
    isOptionsPanelOpen: PropTypes.bool,
    isTouchDevice: PropTypes.bool,
    multiSelectIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    multiSelectOptions: PropTypes.shape({
      altered: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          text: PropTypes.string,
          value: PropTypes.string,
          markup: PropTypes.object
        })
      )
    }),
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

  render(){
    const {
      caretIcon,
      customLabelText,
      isOptionsPanelOpen,
      isTouchDevice,
      multiSelectIndexes,
      initialSelectedIndexes,
      multiSelectOptions,
      name,
      options,
      nextSelectedIndex,
      prefix
    } = this.props;

    return (
      <div
        className={`
          rrs__select-container
          rrs__select-container--multiselect
          ${(isTouchDevice === true) ? 'rrs__is-touch' : 'rrs__is-desktop'}
          ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
          ${(multiSelectIndexes.sort().toString() !== initialSelectedIndexes.sort().toString()) ? 'rrs__has-changed': ''}
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
            {multiSelectOptions.options.length > 0 && ` ${multiSelectOptions.options[0].text}`}
            {multiSelectOptions.options.length > 1 && ` (+${multiSelectOptions.options.length-1})`}
          </span>
          {caretIcon && caretIcon}
        </div>
        }

        <div
          className="rrs__options-container"
          ref={(r) => { if (r) { return this.optionsContainer = r; }}}
        >
          {options.length > 0 &&
            options.map((option, index) => (
              <MultiSelectOptionHOC
                scrollIntoViewScrollPaneRef={() => this.optionsContainer}
                scrollIntoViewElementSelector={'rrs__option--next-selection'}
                key={index}
                index={index}
                option={option}
                multiSelectIndexes={multiSelectIndexes}
                nextSelectedIndex={nextSelectedIndex}
              />
            ))
          }
        </div>

        {name &&
        <input
          type="hidden"
          name={name}
          value={[multiSelectOptions.options.map(v => v.value)].join(',')}
        />
        }

      </div>
    );
  }
}
