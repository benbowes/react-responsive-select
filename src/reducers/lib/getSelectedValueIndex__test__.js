import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import getSelectedValueIndex from './getSelectedValueIndex';
import state from '../../../mocha/state-mock';

describe('getSelectedValueIndex', () => {
  deepFreeze(state);

  it('should return the index of a found option if match', () => {
    const newState = {
      ...state,
      selectedValue: 'fiat',
    };

    const result = getSelectedValueIndex(newState);
    expect(result).to.equal(1);
  });

  it('should return 0 if no matches found', () => {
    const newState = {
      ...state,
      selectedValue: 'jibber',
    };

    const result = getSelectedValueIndex(newState);
    expect(result).to.equal(0);
  });

  it('should return 0 if selectedValues is undefined', () => {
    const newState = {
      ...state,
      selectedValue: undefined,
    };

    const result = getSelectedValueIndex(newState);
    expect(result).to.equal(0);
  });

  it('should return -1 if selectedValues is undefined and noSelectionLabel prop is set', () => {
    const newState = {
      ...state,
      noSelectionLabel: 'Please select...',
      selectedValue: undefined,
    };

    const result = getSelectedValueIndex(newState);
    expect(result).to.equal(-1);
  });

  it('should return the index of a found option if match and noSelectionLabel prop is set', () => {
    const newState = {
      ...state,
      noSelectionLabel: 'Please select...',
      selectedValue: 'fiat',
    };

    const result = getSelectedValueIndex(newState);
    expect(result).to.equal(1);
  });
});
