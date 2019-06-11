import * as React from 'react';
// import { render, cleanup, fireEvent } from 'react-testing-library';
//@ts-ignore
import { render, cleanup, act, fireEvent, prettyDOM, wait } from 'react-testing-library';
import { BASIC_OPTIONS } from '../__mocks__/options';
import RRS from '../ReactResponsiveSelect';

afterEach(cleanup);

describe('Keyboard SingleSelect', () => {

    describe('When not focused', () => {
        test('Select Input receives focus when **TABBED** to', () => {});
    });

    describe('When focused and closed', () => {

        test('hitting **TAB** key should blur Select Input', () => {});

        test('hitting **DOWN** key should open the options panel and highlight **SELECTED ITEM**', () => {
            const wrapper = render(<RRS name="cars" selectedValue="zonda" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
            
            // Focus
            act(() => select.focus());

            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            expect(select.classList.contains('rrs')).toEqual(true);
            expect(select.classList.contains('rrs--options-visible')).toEqual(true);
            
            expect(rrsOption8.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption8.classList.contains('rrs__option--selected')).toEqual(true);
            expect(rrsOption8.classList.contains('rrs__option--next-selection')).toEqual(true);
        });

        test('hitting **UP** key should open the options panel and highlight **SELECTED ITEM**', () => {
            const wrapper = render(<RRS name="cars" selectedValue="zonda" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
            
            // Focus
            act(() => select.focus());
            
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });

            expect(select.classList.contains('rrs')).toEqual(true);
            expect(select.classList.contains('rrs--options-visible')).toEqual(true);
            
            expect(rrsOption8.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption8.classList.contains('rrs__option--selected')).toEqual(true);
            expect(rrsOption8.classList.contains('rrs__option--next-selection')).toEqual(true);
        });

        test('hitting **SPACE** key should open the options panel and highlight **SELECTED ITEM**', () => {
            const wrapper = render(<RRS name="cars" selectedValue="zonda" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption8 = wrapper.getByTestId('rrs-option_cars_8');
            
            // Focus
            act(() => select.focus());
            
            fireEvent.keyDown(select, { key: "Space", keyCode: 32 });

            expect(select.classList.contains('rrs')).toEqual(true);
            expect(select.classList.contains('rrs--options-visible')).toEqual(true);
            
            expect(rrsOption8.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption8.classList.contains('rrs__option--selected')).toEqual(true);
            expect(rrsOption8.classList.contains('rrs__option--next-selection')).toEqual(true);
        });

        test('hitting **ENTER** key should submit the form', () => {
            const submitSpy = jest.fn();
            const wrapper = render(<RRS name="cars" onSubmit={submitSpy} selectedValue="zonda" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            
            // Focus
            act(() => select.focus());
            
            fireEvent.keyDown(select, { key: "Enter", keyCode: 13 });

            expect(submitSpy).toHaveBeenCalled();
        });

        test('hitting **a-z or 0-9** key should open the options panel and highlight first option that starts with this character (must be a **FOCUSSABLE ITEM**)', () => {
            const wrapper = render(<RRS name="cars" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');
            
            // Focus
            act(() => select.focus());

            fireEvent.keyDown(select, { key: "f", keyCode: 70 });

            expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
        });;

        test('hitting **a-z or 0-9** key should open the options panel and highlight first option that starts with this character (must be a **FOCUSSABLE ITEM**)', () => {
            const wrapper = render(<RRS name="cars" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');
            
            // Focus
            act(() => select.focus());

            fireEvent.keyDown(select, { key: "f", keyCode: 70 });

            expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
        });
    });

    describe('When focused and open', () => {

        test('hitting **TAB** key should not blur the Select Input', () => {});

        test('hitting **DOWN** key should decrement down the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the bottom of the options list is reached, it cycles the next potential selection up to the top of the list. It cycles infinitely', () => {
            const wrapper = render(<RRS name="cars" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');

            // Focus
            act(() => select.focus());

            // Open panel
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            // Start moving down the options... continue till cycled back to 4th option (0 index)
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
        });

        test('hitting **UP** key should increment up the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the top of the options list is reached, it cycles the next potential selection to the bottom of the list. It cycles infinitely', () => {
            const wrapper = render(<RRS name="cars" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');
            
            // Focus
            act(() => select.focus());

            // Open panel
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });

            // Start moving down the options... continue till cycled back to 4th option (0 index)
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });

            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });

            expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
        });

        test('hitting **a-z or 0-9** key should highlight first item that starts with this character (must be a **FOCUSSABLE ITEM**)', () => {
            const wrapper = render(<RRS name="cars" options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');
            
            // Focus
            act(() => select.focus());

            // Open panel
            fireEvent.keyDown(select, { key: "Up", keyCode: 38 });

            fireEvent.keyDown(select, { key: "f", keyCode: 70 });

            expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
            expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
        });

        test('hitting **ENTER** key should select the current highlighted option and close the options panel, but not blur the Select Input', () => {
            const submitSpy = jest.fn();
            const wrapper = render(<RRS name="cars" onSubmit={submitSpy} options={BASIC_OPTIONS} />);

            const select = wrapper.getByTestId('cars');
            const rrsLabel = wrapper.getByTestId('rrs-label_cars');
            
            // Focus
            act(() => select.focus());

            // Open panel
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            // Choose Fiat by keypressing Down 3 times 
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
            fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

            // Select it
            fireEvent.keyDown(select, { key: "Enter", keyCode: 13 });

            // Should have updated label with new selection
            expect(rrsLabel.textContent).toEqual('Fiat');

            // Should not have called onSubmit
            expect(submitSpy).not.toHaveBeenCalled();
        });
    });

    test('hitting **ENTER** key should select the current highlighted option and close the options panel, but not blur the Select Input', (done) => {
        const submitSpy = jest.fn();
        const wrapper = render(<RRS name="cars" onSubmit={submitSpy} options={BASIC_OPTIONS} />);

        const select = wrapper.getByTestId('cars');
        const rrsLabel = wrapper.getByTestId('rrs-label_cars');
        
        // Focus
        act(() => select.focus());

        // Open panel
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

        // Choose Fiat by keypressing Down 3 times 
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

        
        wait(() => {
            // Select it
            fireEvent.keyDown(select, { key: "Space", keyCode: 32 });
            
            // Should have updated label with new selection
            expect(rrsLabel.textContent).toEqual('Fiat');

            // Should not have called onSubmit
            expect(submitSpy).not.toHaveBeenCalled();

            done();
        });
    });

    test('hitting **ESC** key should close the options panel and keep the user\'s last selection, or the initial selection, but not blur the Select Input', (done) => {
        const submitSpy = jest.fn();
        const wrapper = render(<RRS name="cars" selectedValue="subaru" onSubmit={submitSpy} options={BASIC_OPTIONS} />);

        const select = wrapper.getByTestId('cars');
        const rrsLabel = wrapper.getByTestId('rrs-label_cars');
        
        // Focus
        act(() => select.focus());

        // Open panel
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

        // Choose Fiat by keypressing Down 3 times 
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });
        fireEvent.keyDown(select, { key: "Down", keyCode: 40 });

        
        wait(() => {
            // Change mind about selecting this option by hitting Escape key
            fireEvent.keyDown(select, { key: "Escape", keyCode: 27 });
            
            // Should NOT have updated label with new selection
            expect(rrsLabel.textContent).toEqual('Subaru');

            // Should not have called onSubmit
            expect(submitSpy).not.toHaveBeenCalled();

            done();
        });
    });

    describe('Mouse/Touch Device', () => {

        test('**TAPPING** on a select will open it\'s options', () => {

        });

        test('**CLICKING** on a select will open it\'s options', () => {

        });

        test('**TAPPING** on an option will select it\'s value', () => {

        });

        test('**CLICKING** on an option will select it\'s value', () => {

        });

        test('**DRAGGING** on an options panel that is scrollable, will scroll the options panel', () => {})

        test('**SCROLLING** on an options panel that is scrollable, will scroll the options panel', () => {})
    });
});
