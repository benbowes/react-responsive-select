import * as React from 'react';
import singleline from 'singleline';
import { IOption } from '../types/';

interface TProps {
  index: number;
  name: string;
  isOptionsPanelOpen: boolean;
  optionsContainerRef: React.RefObject<HTMLUListElement>;
  nextPotentialSelectionIndex: number;
  option: IOption;
  singleSelectSelectedIndex: number;
  optHeaderLabel: string;
}

export class SingleSelectOption extends React.Component<TProps> {
  private optionRef: React.RefObject<HTMLLIElement>;
  private scrollOffset: number;

  constructor(props: TProps) {
    super(props);
    this.optionRef = React.createRef();
    this.scrollOffset = 0;
  }

  public getScrollOffset(): number {
    const el = document.querySelector('.rrs__option--header');
    return Math.ceil((el && el.getBoundingClientRect().height) || 0);
  }

  public componentDidUpdate(): void {
    const { index, isOptionsPanelOpen, nextPotentialSelectionIndex, optionsContainerRef, optHeaderLabel } = this.props;

    if (index === nextPotentialSelectionIndex && isOptionsPanelOpen) {
      if (this.optionRef.current && optionsContainerRef.current) {
        this.optionRef.current.focus();

        if (optHeaderLabel !== '') {
          const scrollDiff = Math.ceil(
            this.optionRef.current.getBoundingClientRect().top - optionsContainerRef.current.getBoundingClientRect().top
          );

          this.scrollOffset = this.scrollOffset || this.getScrollOffset();

          if (scrollDiff < this.scrollOffset) {
            optionsContainerRef.current.scroll(
              0,
              Math.floor(optionsContainerRef.current.scrollTop - this.scrollOffset)
            );
          }
        }
      }
    }
  }

  public isDisabled(option: IOption): boolean {
    return Boolean(option.disabled || option.optHeader);
  }

  public render(): React.ReactNode {
    const { index, name, nextPotentialSelectionIndex, option, singleSelectSelectedIndex, optHeaderLabel } = this.props;

    return (
      <li
        role="menuitem"
        data-testid={`rrs-option_${name}_${index}`}
        tabIndex={-1}
        aria-disabled={this.isDisabled(option) ? 'true' : 'false'}
        aria-label={`
          ${option.text || (option.markup && (option.markup as HTMLElement).textContent)} ${
          optHeaderLabel !== '' ? ` of ${optHeaderLabel}` : ''
        }
        `}
        data-key={index}
        ref={this.optionRef}
        className={singleline(`
          rrs__option
          ${singleSelectSelectedIndex === index ? 'rrs__option--selected' : ''}
          ${nextPotentialSelectionIndex === index ? 'rrs__option--next-selection' : ''}
          ${option.disabled === true ? 'rrs__option--disabled' : ''}
          ${option.optHeader === true ? 'rrs__option--header' : ''}
        `)}
      >
        {option.markup || option.text}
      </li>
    );
  }
}
