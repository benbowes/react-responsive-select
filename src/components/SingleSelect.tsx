import * as React from 'react';
import singleline from 'singleline';
import { IOption, IOutputSingleSelect } from '../types/';
import { SingleSelectOption } from './SingleSelectOption';

interface TProps {
  prefix: string;
  singleSelectSelectedOption: IOutputSingleSelect;
  name: string;
  caretIcon: React.ReactNode;
  singleSelectSelectedIndex: number;
  noSelectionLabel: string;
  isOptionsPanelOpen: boolean;
  nextPotentialSelectionIndex: number;
  selectBoxRef: HTMLDivElement | null;
  customLabelText: React.ReactNode;
  disabled: boolean;
  options: IOption[];
}

export class SingleSelect extends React.Component<TProps> {
  private optionsButton: React.RefObject<HTMLDivElement>;
  private optionsContainer: React.RefObject<HTMLUListElement>;

  constructor(props: TProps) {
    super(props);
    this.optionsButton = React.createRef();
    this.optionsContainer = React.createRef();
  }

  public componentDidUpdate(prevProps: TProps): void {
    /*
      Focus selectBox button if options panel has just closed,
      there has been an interaction,
      or isOptionsPanelOpen and nextPotentialSelectionIndex === -1
    */
    const { isOptionsPanelOpen, nextPotentialSelectionIndex, selectBoxRef } = this.props;

    const optionsPanelJustClosed = !isOptionsPanelOpen && prevProps.isOptionsPanelOpen;

    if (this.optionsButton.current) {
      if (optionsPanelJustClosed && selectBoxRef && selectBoxRef.contains(document.activeElement)) {
        this.optionsButton.current.focus();
      }

      if (isOptionsPanelOpen && nextPotentialSelectionIndex === -1) {
        this.optionsButton.current.focus();
      }
    }
  }

  public getCustomLabel(): React.ReactNode {
    const { prefix, name, singleSelectSelectedOption, caretIcon, customLabelText } = this.props;

    return (
      <div className="rrs__label">
        <span
          aria-label={`${prefix ? `${prefix} ` : ''}${singleSelectSelectedOption.text} selected`}
          className="rrs__label__text"
          id={`rrs-${name}-label`}
          data-testid={`rrs-label_${name}`}
        >
          {customLabelText}
        </span>
        {caretIcon && caretIcon}
      </div>
    );
  }

  public getDefaultLabel(): React.ReactNode {
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
            data-testid={`rrs-label_${name}`}
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
          aria-label={`${prefix ? `${prefix} ` : ''}${singleSelectSelectedOption.text} selected`}
          className="rrs__label__text"
          id={`rrs-${name}-label`}
          data-testid={`rrs-label_${name}`}
        >
          {prefix && <span>{prefix}</span>}
          {singleSelectSelectedOption.text ? singleSelectSelectedOption.text : <div>&nbsp;</div>}
        </span>
        {caretIcon && caretIcon}
      </div>
    );
  }

  public render(): React.ReactNode {
    const {
      customLabelText,
      disabled,
      isOptionsPanelOpen,
      name,
      nextPotentialSelectionIndex,
      options,
      singleSelectSelectedIndex,
      singleSelectSelectedOption,
    } = this.props;

    let optHeaderLabel: string = '';

    return (
      <div>
        <div
          role="button"
          tabIndex={0}
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
          {customLabelText ? this.getCustomLabel() : this.getDefaultLabel()}

          {name && (
            <input
              type="hidden"
              name={name}
              data-testid={`rrs-input_${name}`}
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
            options.map((option: IOption, index: number) => {
              if (option.optHeader) {
                optHeaderLabel = option.text || (option.markup && (option.markup as HTMLElement).textContent) || '';
              }
              return (
                <SingleSelectOption
                  key={index}
                  name={name}
                  optHeaderLabel={optHeaderLabel}
                  optionsContainerRef={this.optionsContainer}
                  index={index}
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
