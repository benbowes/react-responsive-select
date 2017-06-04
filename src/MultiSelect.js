import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollIntoViewIIHOC from './lib/scrollIntoViewIIHOC';
import MultiSelectOption from './MultiSelectOption';
const MultiSelectOptionHOC = scrollIntoViewIIHOC(MultiSelectOption);

export default class MultiSelect extends Component {

  render(){
    const {
      altered,
      caretIcon,
      customLabelText,
      disabled,
      isOptionsPanelOpen,
      isTouchDevice,
      multiSelectSelectedIndexes,
      multiSelectSelectedOptions,
      name,
      options,
      nextPotentialSelectionIndex,
      prefix
    } = this.props;

    return (
      <div
        className={`
          rrs__select-container
          rrs__select-container--multiselect
          ${(disabled === true) ? 'rrs__select-container--disabled' : ''}
          ${(isTouchDevice === true) ? 'rrs__is-touch' : 'rrs__is-desktop'}
          ${(isOptionsPanelOpen === true) ? 'rrs__options-container--visible' : ''}
          ${altered ? 'rrs__has-changed': ''}
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
          <span className="rrs__label">
            <span className='rrs__multiselect__label'>
              <span className='rrs__multiselect__label-text'>{`${prefix ? prefix + ' ' : ''}${multiSelectSelectedOptions.options[0].text}`}</span>
              {multiSelectSelectedOptions.options.length > 1 &&
              <span className='rrs__multiselect__label-badge'>
                {`+ ${multiSelectSelectedOptions.options.length-1}`}
              </span>
              }
            </span>
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
                isTouchDevice={isTouchDevice}
                multiSelectSelectedIndexes={multiSelectSelectedIndexes}
                nextPotentialSelectionIndex={nextPotentialSelectionIndex}
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

MultiSelect.propTypes = {
  altered: PropTypes.bool,
  caretIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  customLabelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element
  ]),
  disabled: PropTypes.bool,
  multiSelectInitialSelectedIndexes: PropTypes.arrayOf(
    PropTypes.number
  ),
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
  isTouchDevice: PropTypes.bool,
  isOptionsPanelOpen: PropTypes.bool,
  name: PropTypes.string,
  nextPotentialSelectionIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  prefix: PropTypes.string
};
