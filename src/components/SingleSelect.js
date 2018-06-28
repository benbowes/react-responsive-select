import React, { Component } from 'react';
import singleline from 'singleline';
import { SingleSelectProps } from '../propTypes';
import SingleSelectOption from './SingleSelectOption';
import scrollIntoViewIIHOC from '../lib/scrollIntoViewIIHOC';

const SingleSelectOptionHOC = scrollIntoViewIIHOC(SingleSelectOption);

export default class SingleSelect extends Component {
  componentDidUpdate(prevProps) {
    /* Focus selectBox button if options panel has just closed, there has been an interaction or the value has changed */
    if (
      !this.props.isOptionsPanelOpen
      && prevProps.isOptionsPanelOpen
      && prevProps.singleSelectSelectedIndex !== this.props.singleSelectSelectedIndex
    ) {
      this.optionsButton.focus();
    }
  }

  render() {
    const {
      caretIcon,
      customLabelText,
      customOptionRenderer,
      disabled,
      isOptionsPanelOpen,
      isDragging,
      name,
      nextPotentialSelectionIndex,
      options,
      prefix,
      singleSelectSelectedIndex,
      singleSelectSelectedOption,
    } = this.props;

    return (
      <div>
        <div
          role="button"
          tabIndex="0"
          aria-disabled={disabled}
          aria-haspopup="true"
          aria-expanded={isOptionsPanelOpen}
          aria-controls={`rrs-${name}-menu`}
          ref={(r) => { if (r) this.optionsButton = r; }}
          className={singleline(`
            rrs__button
            ${(disabled === true) ? 'rrs__button--disabled' : ''}
          `)}
        >

          {customLabelText &&
          <div className="rrs__label">
            <span
              aria-label={`${prefix ? `${prefix} ` : ''}${singleSelectSelectedOption.text} selected`}
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
              aria-label={`${prefix ? `${prefix} ` : ''}${singleSelectSelectedOption.text} selected`}
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
          ref={(r) => { if (r) this.optionsContainer = r; }}
        >
          {options.length > 0 &&
            options.map((option, index) => (
              <SingleSelectOptionHOC
                customOptionRenderer={customOptionRenderer}
                scrollIntoViewScrollPaneRef={() => this.optionsContainer}
                scrollIntoViewElementSelector="rrs__option--next-selection"
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

SingleSelect.propTypes = SingleSelectProps;
