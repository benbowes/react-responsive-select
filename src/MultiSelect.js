import React, { Component, PropTypes } from 'react';
import scrollIntoViewIIHOC from './lib/scrollIntoViewIIHOC';
import MultiSelectOption from './MultiSelectOption';

const MultiSelectOptionHOC = scrollIntoViewIIHOC(MultiSelectOption);

export default class MultiSelect extends Component {

  static propTypes = {
    caretIcon: PropTypes.element,
    customLabelText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.element
    ]),
    multiSelectInitialSelectedIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    isDragging: PropTypes.bool,
    isOptionsPanelOpen: PropTypes.bool,
    isTouchDevice: PropTypes.bool,
    multiSelectSelectedIndexes: PropTypes.arrayOf(
      PropTypes.number
    ),
    multiSelectSelectedOptions: PropTypes.shape({
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
    potentialOptionSelectionIndex: PropTypes.number,
    onSubmit: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    prefix: PropTypes.string
  }

  render(){
    const {
      caretIcon,
      customLabelText,
      isOptionsPanelOpen,
      isTouchDevice,
      isDragging,
      multiSelectSelectedIndexes,
      multiSelectSelectedOptions,
      name,
      options,
      potentialOptionSelectionIndex,
      prefix
    } = this.props;

    return (
      <div
        className={`
          rrs__select-container
          rrs__select-container--multiselect
          ${(isTouchDevice === true) ? 'rrs__is-touch' : 'rrs__is-desktop'}
          ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
          ${multiSelectSelectedOptions.altered ? 'rrs__has-changed': ''}
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
            {multiSelectSelectedOptions.options.length > 0 && ` ${multiSelectSelectedOptions.options[0].text}`}
            {multiSelectSelectedOptions.options.length > 1 && ` (+${multiSelectSelectedOptions.options.length-1})`}
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
                isDragging={isDragging}
                multiSelectSelectedIndexes={multiSelectSelectedIndexes}
                potentialOptionSelectionIndex={potentialOptionSelectionIndex}
              />
            ))
          }
        </div>

        {name &&
        <input
          type="hidden"
          name={name}
          value={[multiSelectSelectedOptions.options.map(v => v.value)].join(',')}
        />
        }

      </div>
    );
  }
}
