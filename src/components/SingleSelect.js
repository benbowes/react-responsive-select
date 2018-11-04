import React, { Component } from 'react';
import singleline from 'singleline';
import { SingleSelectProps } from '../propTypes';
import SingleSelectOption from './SingleSelectOption';

export default class SingleSelect extends Component {
  constructor() {
    super();
    this.optionsButton = React.createRef();
    this.optionsContainer = React.createRef();
  }

  componentDidUpdate(prevProps) {
    /*
      Focus selectBox button if options panel has just closed,
      there has been an interaction,
      or isOptionsPanelOpen and nextPotentialSelectionIndex === -1
    */
    const {
      isOptionsPanelOpen,
      nextPotentialSelectionIndex,
      selectBoxRef,
    } = this.props;

    const optionsPanelJustClosed =
      !isOptionsPanelOpen && prevProps.isOptionsPanelOpen;

    if (
      optionsPanelJustClosed &&
      selectBoxRef.contains(document.activeElement)
    ) {
      this.optionsButton.current.focus();
    }

    if (isOptionsPanelOpen && nextPotentialSelectionIndex === -1) {
      this.optionsButton.current.focus();

      if (optHeaderLabel) {
        const scrollDiff = Math.ceil(
          this.optionRef.current.getBoundingClientRect().top -
            optionsContainerRef.current.getBoundingClientRect().top,
        );

        this.scrollOffset =
          this.scrollOffset ||
          Math.ceil(
            document
              .querySelector('.rrs__option--header')
              .getBoundingClientRect().height,
          );

        if (scrollDiff < this.scrollOffset) {
          optionsContainerRef.current.scroll(
            0,
            Math.floor(
              optionsContainerRef.current.scrollTop - this.scrollOffset,
            ),
          );
        }
      }
    }
  }

  getCustomLabel() {
    const {
      prefix,
      name,
      singleSelectSelectedOption,
      caretIcon,
      customLabelText,
    } = this.props;

    return (
      <div className="rrs__label">
        <span
          aria-label={`${prefix ? `${prefix} ` : ''}${
            singleSelectSelectedOption.text
          } selected`}
          className="rrs__label__text"
          id={`rrs-${name}-label`}
        >
          {customLabelText}
        </span>
        {caretIcon && caretIcon}
      </div>
    );
  }

  getDefaultLabel() {
    const {
      prefix,
      singleSelectSelectedOption,
      name,
      caretIcon,
      singleSelectSelectedIndex,
      noSelectionLabel,
    } = this.props;

    if (singleSelectSelectedIndex === -1) {
      return (
        <div className="rrs__label">
          <span
            aria-label={noSelectionLabel}
            className="rrs__label__text"
            id={`rrs-${name}-label`}
          >
            {prefix && <span>{prefix}</span>}
            {noSelectionLabel}
          </span>
          {caretIcon && caretIcon}
        </div>
      );
    }

    return (
      <div className="rrs__label">
        <span
          aria-label={`${prefix ? `${prefix} ` : ''}${
            singleSelectSelectedOption.text
          } selected`}
          className="rrs__label__text"
          id={`rrs-${name}-label`}
        >
          {prefix && <span>{prefix}</span>}
          {singleSelectSelectedOption.text ? (
            singleSelectSelectedOption.text
          ) : (
            <div>&nbsp;</div>
          )}
        </span>
        {caretIcon && caretIcon}
      </div>
    );
  }

  render() {
    const {
      customLabelText,
      disabled,
      isOptionsPanelOpen,
      isDragging,
      name,
      nextPotentialSelectionIndex,
      options,
      singleSelectSelectedIndex,
      singleSelectSelectedOption,
    } = this.props;

    let optHeaderLabel = '';

    return (
      <div>
        <div
          role="button"
          tabIndex="0"
          aria-disabled={disabled}
          aria-haspopup="true"
          aria-expanded={isOptionsPanelOpen}
          aria-controls={`rrs-${name}-menu`}
          ref={this.optionsButton}
          className={singleline(`
            rrs__button
            ${disabled === true ? 'rrs__button--disabled' : ''}
          `)}
        >
          {customLabelText && this.getCustomLabel()}

          {!customLabelText && this.getDefaultLabel()}

          {name && (
            <input
              type="hidden"
              name={name}
              value={singleSelectSelectedOption.value}
            />
          )}
        </div>

        <ul
          id={`rrs-${name}-menu`}
          aria-labelledby={`rrs-${name}-label`}
          role="menu"
          className="rrs__options"
          ref={this.optionsContainer}
        >
          {options.length > 0 &&
            options.map((option, index) => {
              if (option.optHeader) {
                optHeaderLabel = option.text || option.markup.textContent;
              }
              return (
                <SingleSelectOption
                  key={index}
                  optHeaderLabel={optHeaderLabel}
                  optionsContainerRef={this.optionsContainer}
                  index={index}
                  isDragging={isDragging}
                  isOptionsPanelOpen={isOptionsPanelOpen}
                  option={option}
                  singleSelectSelectedIndex={singleSelectSelectedIndex}
                  nextPotentialSelectionIndex={nextPotentialSelectionIndex}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}

SingleSelect.propTypes = SingleSelectProps;
