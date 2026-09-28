import { multiSelectBroadcastChange } from '../lib/onChangeBroadcasters';
import { IOutputMultiSelectOption } from '../types';

describe('multiSelectBroadcastChange', () => {
  test('broadcasts when prevOptions is undefined', () => {
    const fn = jest.fn();
    const currOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];

    multiSelectBroadcastChange(currOptions, false, fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({
      options: [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }],
      altered: false,
    });
  });

  test('broadcasts when an option is added to currOptions compared to prevOptions', () => {
    const fn = jest.fn();
    const prevOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];
    const currOptions: IOutputMultiSelectOption[] = [
      { name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' },
      { name: 'cars', text: 'BMW', value: 'bmw' },
    ];

    multiSelectBroadcastChange(currOptions, true, fn, prevOptions);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({
      options: [
        { name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' },
        { name: 'cars', text: 'BMW', value: 'bmw' },
      ],
      altered: true,
    });
  });

  test('broadcasts when an option is removed from currOptions compared to prevOptions', () => {
    const fn = jest.fn();
    const prevOptions: IOutputMultiSelectOption[] = [
      { name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' },
      { name: 'cars', text: 'BMW', value: 'bmw' },
    ];
    const currOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];

    multiSelectBroadcastChange(currOptions, true, fn, prevOptions);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({
      options: [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }],
      altered: true,
    });
  });

  test('broadcasts when an option is modified in currOptions compared to prevOptions', () => {
    const fn = jest.fn();
    const prevOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];
    const currOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo Updated', value: 'alfa-romeo' }];

    multiSelectBroadcastChange(currOptions, true, fn, prevOptions);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({
      options: [{ name: 'cars', text: 'Alfa Romeo Updated', value: 'alfa-romeo' }],
      altered: true,
    });
  });

  test('does not broadcast when currOptions and prevOptions have identical options', () => {
    const fn = jest.fn();
    const prevOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];
    const currOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];

    multiSelectBroadcastChange(currOptions, true, fn, prevOptions);

    expect(fn).not.toHaveBeenCalled();
  });

  test('does not throw and does nothing when fn is undefined', () => {
    const currOptions: IOutputMultiSelectOption[] = [{ name: 'cars', text: 'Alfa Romeo', value: 'alfa-romeo' }];

    expect(() => {
      multiSelectBroadcastChange(currOptions, true, undefined);
    }).not.toThrow();
  });

  test('fills in empty strings when option name, text, or value are missing', () => {
    const fn = jest.fn();
    const currOptions: IOutputMultiSelectOption[] = [{}];

    multiSelectBroadcastChange(currOptions, false, fn);

    expect(fn).toHaveBeenCalledWith({
      options: [{ name: '', text: '', value: '' }],
      altered: false,
    });
  });
});
