import * as React from 'react';
import singleline from 'singleline';
import { IOption, IOutputMultiSelect, IOutputMultiSelectOption } from '../types/';
import { MultiSelectOption } from './MultiSelectOption';

interface TProps {
  selectBoxRef: HTMLDivElement | null;
  caretIcon: React.ReactNode;
  customLabelText: React.ReactNode;
  disabled: boolean;
  isDragging: boolean;
  isOptionsPanelOpen: boolean;
  multiSelectSelectedIndexes: number[];
  multiSelectSelectedOptions: IOutputMultiSelect;
  name: string;
  options: IOption[];
  nextPotentialSelectionIndex: number;
  prefix: string;
}

export class MultiSelect extends React.Component<TProps> {
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
      there has been an interaction or the value has changed
    */
    const { isOptionsPanelOpen, selectBoxRef } = this.props;

    const optionsPanelJustClosed = !isOptionsPanelOpen && prevProps.isOptionsPanelOpen;

    if (optionsPanelJustClosed && selectBoxRef && selectBoxRef.contains(document.activeElement)) {
      // tslint:disable-next-line
      this.optionsButton.current && this.optionsButton.current.focus();
    }
  }

  public getAriaLabel(): string {
    const { multiSelectSelectedOptions, prefix } = this.props;
    const selectedOptionsLength = multiSelectSelectedOptions.options.length;

    return singleline(`
      Checkbox group ${prefix ? `${prefix} ` : ''} has
      ${selectedOptionsLength} item${selectedOptionsLength === 1 ? '' : 's'} selected.
      Selected option${selectedOptionsLength === 1 ? '' : 's'} ${selectedOptionsLength === 1 ? 'is' : 'are'}
      ${multiSelectSelectedOptions.options
        .map((option: IOutputMultiSelectOption): string => option.text || '')
        .join(' and ')}
    `);
  }

  public render(): React.ReactNode {
    const {
      caretIcon,
      customLabelText,
      disabled,
      isOptionsPanelOpen,
      multiSelectSelectedIndexes,
      multiSelectSelectedOptions,
      name,
      options,
      nextPotentialSelectionIndex,
      prefix,
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
          {customLabelText && (
            <div className="rrs__label">
              <span
                aria-label={this.getAriaLabel()}
                className="rrs__label__text"
                id={`rrs-${name}-label`}
                data-testid={`rrs-label_${name}`}
              >
                {customLabelText}
              </span>
              {caretIcon && caretIcon}
            </div>
          )}

          {!customLabelText && (
            <div className="rrs__label">
              <span
                aria-label={this.getAriaLabel()}
                className="rrs__label__text"
                id={`rrs-${name}-label`}
                data-testid={`rrs-label_${name}`}
              >
                <span className="rrs__multiselect-label">
                  <span className="rrs__multiselect-label__text">
                    {`${prefix ? `${prefix} ` : ''}
                  ${multiSelectSelectedOptions.options.length > 0 ? multiSelectSelectedOptions.options[0].text : ''}`}
                  </span>
                  {multiSelectSelectedOptions.options.length > 1 && (
                    <span className="rrs__multiselect-label__badge">
                      {`+ ${multiSelectSelectedOptions.options.length - 1}`}
                    </span>
                  )}
                </span>
              </span>
              {caretIcon && caretIcon}
            </div>
          )}

          {name && (
            <input
              type="hidden"
              name={name}
              data-testid={`rrs-input_${name}`}
              value={[multiSelectSelectedOptions.options.map((v: IOutputMultiSelectOption) => v.value)].join(',')}
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
                <MultiSelectOption
                  key={index}
                  name={name}
                  optHeaderLabel={optHeaderLabel}
                  optionsContainerRef={this.optionsContainer}
                  index={index}
                  option={option}
                  isOptionsPanelOpen={isOptionsPanelOpen}
                  multiSelectSelectedIndexes={multiSelectSelectedIndexes}
                  nextPotentialSelectionIndex={nextPotentialSelectionIndex}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}
