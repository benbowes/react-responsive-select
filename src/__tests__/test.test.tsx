import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BASIC_OPTIONS } from '../__mocks__/options';
import RRS from '../ReactResponsiveSelect';

afterEach(cleanup);

describe('SingleSelect', () => {
    test('MouseDown on an option will select it', () => {
        const wrapper = render(<RRS name="cars" options={BASIC_OPTIONS} />);

        // Open options panel
        const select = wrapper.getByTestId('cars');
        fireEvent.mouseDown(select);
        
        // Click option 8
        const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
        fireEvent.mouseDown(rrsOption8);
        
        // Expect that the label updates with option 8's text property
        expect(wrapper.getByTestId('rrs-label_cars').textContent).toEqual('Zonda');
    });
});

describe('MultiSelect', () => {
    test('MouseDown on an option will add it to the selected options', () => {
        const wrapper = render(<RRS multiselect={true} name="cars" options={BASIC_OPTIONS} />);

        // Open options panel
        const select = wrapper.getByTestId('cars');
        fireEvent.mouseDown(select);
        
        // Click some options
        const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
        const rrsOption7 = wrapper.getByTestId('rrs-option_cars_7');
        const rrsOption6 = wrapper.getByTestId('rrs-option_cars_6');

        fireEvent.mouseDown(rrsOption8);
        fireEvent.mouseDown(rrsOption7);
        fireEvent.mouseDown(rrsOption6);
        
        // Expect that the label updates with 3 options
        const labelText = wrapper.getByTestId('rrs-label_cars').textContent;
        expect(labelText && labelText.trim()).toEqual('Zonda+ 2');
    });
});
