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
});
