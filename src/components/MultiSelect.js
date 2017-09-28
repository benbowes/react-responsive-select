import React, { Component } from 'react';
import PropTypes from 'prop-types';
import singleline from 'singleline';
import scrollIntoViewIIHOC from '../lib/scrollIntoViewIIHOC';
import MultiSelectOption from './MultiSelectOption';
import simpleArraysEqual from '../lib/simpleArraysEqual';
const MultiSelectOptionHOC = scrollIntoViewIIHOC(MultiSelectOption);

export default class MultiSelect extends Component {

  getAriaLabel() {
    const { multiSelectSelectedOptions, prefix } = this.props;
    const selectedOptionsLength = multiSelectSelectedOptions.options.length;
    return singleline(`
      Checkbox group ${prefix ? prefix + ' ' : ''} has
      ${selectedOptionsLength} item${selectedOptionsLength === 1 ? '' : 's'} selected.
      Selected option${selectedOptionsLength === 1 ? '' : 's'} ${selectedOptionsLength === 1 ? 'is' : 'are'}
      ${multiSelectSelectedOptions.options.map(v => v.text).join(' and ')}
    `);
  }

  componentDidUpdate (prevProps) {
    /* Focus selectBox button if options panel has just closed, there has been an interaction or the value has changed */
    if (
      !this.props.isOptionsPanelOpen
      && prevProps.isOptionsPanelOpen
      && !simpleArraysEqual(prevProps.multiSelectSelectedIndexes, this.props.multiSelectSelectedIndexes)
    ) {
      this.optionsButton.focus();
    }
  }

  render(){
    const {
      caretIcon,
      customLabelText,
      disabled,
      isDragging,
      isOptionsPanelOpen,
      multiSelectSelectedIndexes,
      multiSelectSelectedOptions,
      name,
      options,
      nextPotentialSelectionIndex,
      prefix
    } = this.props;

    return (
      <div>
        <div
          role="button"
          tabIndex="0"
          aria-haspopup="true"
          aria-expanded={`${isOptionsPanelOpen}`}
          aria-controls={`rrs-${name}-menu`}
          ref={(r) => { if (r) { return this.optionsButton = r; }}}
          className={singleline(`
            rrs__button
            ${(disabled === true) ? 'rrs__button--disabled' : ''}
          `)}
        >

          {customLabelText &&
          <div className="rrs__label">
            <span
              aria-label={this.getAriaLabel()}
              className="rrs__label__text"
              id={`rrs-${name}-label`}
            >
              {customLabelText}
            </span>
            {caretIcon && caretIcon}
          </div>
          }

          {!customLabelText &&
          <div className="rrs__label">
            <span
              aria-label={this.getAriaLabel()}
              className="rrs__label__text"
              id={`rrs-${name}-label`}
            >
              <span className='rrs__multiselect-label'>
                <span className='rrs__multiselect-label__text'>{`${prefix ? prefix + ' ' : ''}${multiSelectSelectedOptions.options[0].text}`}</span>
                {multiSelectSelectedOptions.options.length > 1 &&
                <span className='rrs__multiselect-label__badge'>
                  {`+ ${multiSelectSelectedOptions.options.length-1}`}
                </span>
                }
              </span>
            </span>
            {caretIcon && caretIcon}
          </div>
          }

          {name &&
          <input
            type="hidden"
            name={name}
            value={[multiSelectSelectedOptions.options.map(v => v.value)].join(',')}
          />
          }

        </div>

        <ul
          id={`rrs-${name}-menu`}
          aria-labelledby={`rrs-${name}-label`}
          role="menu"
          className="rrs__options"
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
                isOptionsPanelOpen={isOptionsPanelOpen}
                multiSelectSelectedIndexes={multiSelectSelectedIndexes}
                nextPotentialSelectionIndex={nextPotentialSelectionIndex}
              />
            ))
          }
        </ul>
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
  isDragging: PropTypes.bool,
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
