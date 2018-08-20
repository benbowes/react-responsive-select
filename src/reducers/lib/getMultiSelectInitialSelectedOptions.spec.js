import deepFreeze from 'deep-freeze';
import getMultiSelectInitialSelectedOptions from './getMultiSelectInitialSelectedOptions';
import state from '../../../__mocks__/state-mock';

describe('addMultiSelectOption', () => {
  deepFreeze(state);

  it('should return list of selected multiSelectSelectOptions when selectedValues is set', () => {
    const result = getMultiSelectInitialSelectedOptions({
      ...state,
      selectedValues: ['fiat', 'bmw'],
      name: 'Make 1',
    });

    expect(result).toMatchObject([
      {
        name: 'Make 1',
        value: 'fiat',
        text: 'Fiat',
      },
      {
        name: 'Make 1',
        value: 'bmw',
        text: 'BMW',
      },
    ]);
  });

  it('should return first item for multiSelectSelectOptions when selectedValues is not set', () => {
    const result = getMultiSelectInitialSelectedOptions({
      ...state,
      selectedValues: undefined,
      name: 'Make 1',
    });

    expect(result).toMatchObject([
      {
        name: 'Make 1',
        value: 'null',
        text: 'Any',
      },
    ]);
  });

  it('should return default item for multiSelectSelectOptions when noSelectionLabel prop is set and selectedValues is not set', () => {
    const result = getMultiSelectInitialSelectedOptions({
      ...state,
      noSelectionLabel: 'Please select...',
      selectedValues: undefined,
      name: 'Make 1',
    });

    expect(result).toMatchObject([
      {
        name: 'Make 1',
        value: 'null',
        text: 'Please select...',
      },
    ]);
  });

  it('should return list of selected multiSelectSelectOptions when selectedValues is set and noSelectionLabel prop is set', () => {
    const result = getMultiSelectInitialSelectedOptions({
      ...state,
      noSelectionLabel: 'Please select...',
      selectedValues: ['fiat', 'bmw'],
      name: 'Make 1',
    });

    expect(result).toMatchObject([
      {
        name: 'Make 1',
        text: 'Fiat',
        value: 'fiat',
      },
      {
        name: 'Make 1',
        text: 'BMW',
        value: 'bmw',
      },
    ]);
  });
});
