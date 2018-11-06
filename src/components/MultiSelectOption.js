import React, { Component } from 'react';
import singleline from 'singleline';
import { MultiSelectOptionProps } from '../propTypes';

export default class MultiSelectOption extends Component {
  constructor() {
    super();
    this.optionRef = React.createRef();
  }

  componentDidUpdate() {
    const {
      index,
      isOptionsPanelOpen,
      nextPotentialSelectionIndex,
      optionsContainerRef,
      optHeaderLabel,
    } = this.props;

    if (index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
      this.optionRef.current.focus();

      if (optHeaderLabel !== '') {
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

  isDisabled(option) {
    return option.disabled || option.optHeader;
  }

  render() {
    const {
      index,
      multiSelectSelectedIndexes,
      nextPotentialSelectionIndex,
      option,
      optHeaderLabel,
    } = this.props;
    const isSelected = multiSelectSelectedIndexes.some(i => i === index);

    return (
      <li
        role="checkbox"
        tabIndex="-1"
        aria-checked={isSelected}
        aria-label={`
        ${option.text || (option.markup && option.markup.textNode)} ${
          optHeaderLabel !== '' ? ` of ${optHeaderLabel}` : ''
        }
      `}
        aria-live="assertive"
        aria-disabled={this.isDisabled(option) ? 'true' : 'false'}
        data-key={index}
        index={index}
        ref={this.optionRef}
        className={singleline(`
          rrs__option
          ${isSelected ? 'rrs__option--selected' : ''}
          ${
            nextPotentialSelectionIndex === index
              ? 'rrs__option--next-selection'
              : ''
          }
          ${option.disabled === true ? 'rrs__option--disabled' : ''}
          ${option.optHeader === true ? 'rrs__option--header' : ''}
        `)}
      >
        {option.markup || option.text}
      </li>
    );
  }
}

MultiSelectOption.propTypes = MultiSelectOptionProps;
