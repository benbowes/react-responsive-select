import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BASIC_OPTIONS } from '../__mocks__/options';
import { Select } from '../';

afterEach(cleanup);

describe('SingleSelect', () => {
  test('MouseDown on an option will select it', () => {
    const wrapper = render(<Select name="cars" options={BASIC_OPTIONS} />);

    // Open options panel
    const select = wrapper.getByTestId('cars');
    fireEvent.mouseDown(select);

    // Click option 8
    const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
    fireEvent.mouseDown(rrsOption8);

    // Expect that the label updates with option 8's text property
    expect(wrapper.getByTestId('rrs-label_cars').textContent).toEqual('Volvo');
  });
});

describe('MultiSelect', () => {
  test('MouseDown on an option will add it to the selected options', () => {
    const wrapper = render(
      <Select multiselect={true} noSelectionLabel="Please select" name="cars" options={BASIC_OPTIONS} />
    );

    // Open options panel
    const select = wrapper.getByTestId('cars');
    fireEvent.mouseDown(select);

    // Click some options
    const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
    const rrsOption9 = wrapper.getByTestId('rrs-option_cars_9');
    const rrsOption5 = wrapper.getByTestId('rrs-option_cars_5');

    fireEvent.mouseDown(rrsOption9);
    fireEvent.mouseDown(rrsOption8);
    fireEvent.mouseDown(rrsOption5);

    // Expect that the label updates with 3 options
    const labelText = wrapper.getByTestId('rrs-label_cars').textContent;
    expect(labelText && labelText.trim()).toEqual('Zonda+ 2');
  });

  test('MouseDown on an option will trigger onChange with selected options and altered: true', () => {
    const changeSpy = jest.fn();
    const wrapper = render(
      <Select
        multiselect={true}
        noSelectionLabel="Please select"
        name="cars"
        options={BASIC_OPTIONS}
        onChange={changeSpy}
      />
    );

    // Open options panel
    const select = wrapper.getByTestId('cars');
    fireEvent.mouseDown(select);

    // Click option 8 (Volvo)
    const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
    fireEvent.mouseDown(rrsOption8);

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith({
      options: [{ name: 'cars', text: 'Volvo', value: 'volvo' }],
      altered: true,
    });
  });
});

describe('onListen', () => {
  test('invokes onListen with isOpen=true when selecting and deselecting options in multiselect while open', () => {
    const onListenSpy = jest.fn();
    const wrapper = render(
      <Select
        multiselect={true}
        noSelectionLabel="Please select"
        name="cars"
        options={BASIC_OPTIONS}
        onListen={onListenSpy}
      />
    );

    // Initial mount action is INITIALISE (isOpen=false)
    expect(onListenSpy).toHaveBeenCalledWith(false, 'cars', 'INITIALISE');

    // Open options panel
    const select = wrapper.getByTestId('cars');
    fireEvent.mouseDown(select);
    expect(onListenSpy).toHaveBeenLastCalledWith(true, 'cars', 'SET_OPTIONS_PANEL_OPEN');

    // Select option 8 (Volvo) - overlay remains visible and isOpen must remain true
    const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
    fireEvent.mouseDown(rrsOption8);
    expect(onListenSpy).toHaveBeenLastCalledWith(true, 'cars', 'SET_MULTISELECT_OPTIONS');

    // Select option 9 (Zonda) - isOpen must remain true
    const rrsOption9 = wrapper.getByTestId('rrs-option_cars_9');
    fireEvent.mouseDown(rrsOption9);
    expect(onListenSpy).toHaveBeenLastCalledWith(true, 'cars', 'SET_MULTISELECT_OPTIONS');

    // Deselect option 8 (Volvo) - isOpen must remain true
    fireEvent.mouseDown(rrsOption8);
    expect(onListenSpy).toHaveBeenLastCalledWith(true, 'cars', 'SET_MULTISELECT_OPTIONS');

    // Close panel by clicking the label/overlay
    const label = wrapper.getByTestId('rrs-label_cars');
    fireEvent.mouseDown(label);
    expect(onListenSpy).toHaveBeenLastCalledWith(false, 'cars', 'SET_OPTIONS_PANEL_CLOSED');
  });

  test('invokes onListen with isOpen=false when option is selected in single-select', () => {
    const onListenSpy = jest.fn();
    const wrapper = render(<Select name="cars" options={BASIC_OPTIONS} onListen={onListenSpy} />);

    // Initial mount action is INITIALISE (isOpen=false)
    expect(onListenSpy).toHaveBeenCalledWith(false, 'cars', 'INITIALISE');

    // Open options panel
    const select = wrapper.getByTestId('cars');
    fireEvent.mouseDown(select);
    expect(onListenSpy).toHaveBeenLastCalledWith(true, 'cars', 'SET_OPTIONS_PANEL_OPEN');

    // Select option 8 (Volvo) - panel closes, isOpen must be false
    const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
    fireEvent.mouseDown(rrsOption8);
    expect(onListenSpy).toHaveBeenLastCalledWith(false, 'cars', 'SET_SINGLESELECT_OPTIONS');
  });
});
