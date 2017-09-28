import React, { Component } from 'react';
import PropTypes from 'prop-types';
import singleline from 'singleline';
import scrollIntoViewIIHOC from '../lib/scrollIntoViewIIHOC';
import SingleSelectOption from './SingleSelectOption';

const SingleSelectOptionHOC = scrollIntoViewIIHOC(SingleSelectOption);

export default class SingleSelect extends Component {

  componentDidUpdate (prevProps) {
    /* Focus selectBox button if options panel has just closed, there has been an interaction or the value has changed */
    if (
      !this.props.isOptionsPanelOpen
      && prevProps.isOptionsPanelOpen
      && prevProps.singleSelectSelectedIndex !== this.props.singleSelectSelectedIndex
    ) {
      this.optionsButton.focus();
    }
  }

  render(){
    const {
      caretIcon,
      customLabelText,
      disabled,
      isOptionsPanelOpen,
      isDragging,
      name,
      nextPotentialSelectionIndex,
      options,
      prefix,
      singleSelectSelectedIndex,
      singleSelectSelectedOption
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
              aria-label={`${prefix ? prefix + ' ' : ''}${singleSelectSelectedOption.text} selected`}
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
              aria-label={`${prefix ? prefix + ' ' : ''}${singleSelectSelectedOption.text} selected`}
              className="rrs__label__text"
              id={`rrs-${name}-label`}
            >
              {prefix &&
                <span>{prefix}</span>
              }
              {singleSelectSelectedOption.text}
            </span>
            {caretIcon && caretIcon}
          </div>
          }

          {name &&
          <input type="hidden" name={name} value={singleSelectSelectedOption.value} />
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
              <SingleSelectOptionHOC
                scrollIntoViewScrollPaneRef={() => this.optionsContainer}
                scrollIntoViewElementSelector={'rrs__option--next-selection'}
                key={index}
                index={index}
                isDragging={isDragging}
                isOptionsPanelOpen={isOptionsPanelOpen}
                option={option}
                singleSelectSelectedIndex={singleSelectSelectedIndex}
                nextPotentialSelectionIndex={nextPotentialSelectionIndex}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

SingleSelect.propTypes = {
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
  singleSelectInitialIndex: PropTypes.number,
  singleSelectSelectedIndex: PropTypes.number,
  singleSelectSelectedOption: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
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
  prefix: PropTypes.string,
  selectedValue: PropTypes.string
};
