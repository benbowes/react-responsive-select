import * as React from 'react';
import { render, act, cleanup, fireEvent } from '@testing-library/react';
import { BASIC_OPTIONS, MULTISELECT_OPTIONS } from '../__mocks__/options';
import { Select } from '../';

/**
 *  **SELECTED ITEM** is the item set with selectedValue or the first **FIRST AVAILABLE OPTION**.
 *
 *  **FIRST AVAILABLE OPTION** is the first option in the options list that is selectable. E.g:
 *   - Is not an option header.
 *   - Is not disabled.
 *
 *  **FOCUSSABLE ITEM** is an option in the options list that is foccussable. E.g:
 *   - Is not an option header.
 *   - Is not disabled
 */

afterEach(cleanup);

describe('Keyboard MultiSelect', () => {
  describe('When not focused', () => {
    test('Select Input receives focus when **TABBED** to', () => {
      // TODO: FOCUS/BLUR NOT TESTED
    });
  });

  describe('When focused and closed', () => {
    test('hitting **TAB** key should blur Select Input', () => {
      // TODO: FOCUS/BLUR NOT TESTED
    });

    test('hitting **DOWN** key should open the options panel and highlight **SELECTED ITEM**', () => {
      const wrapper = render(<Select multiselect name="cars" selectedValues={['zonda']} options={BASIC_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption9 = wrapper.getByTestId('rrs-option_cars_9');

      // Focus
      act(() => select.focus());

      // Hit down key
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Select is open
      expect(select.classList.contains('rrs')).toEqual(true);
      expect(select.classList.contains('rrs--options-visible')).toEqual(true);

      // Zonda is selected
      expect(rrsOption9.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption9.classList.contains('rrs__option--selected')).toEqual(true);
      expect(rrsOption9.classList.contains('rrs__option--next-selection')).toEqual(true);
    });

    test('hitting **UP** key should open the options panel and highlight **SELECTED ITEM**', () => {
      const wrapper = render(<Select multiselect name="cars" selectedValues={['zonda']} options={BASIC_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption9 = wrapper.getByTestId('rrs-option_cars_9');

      // Focus
      act(() => select.focus());

      // Hit up key
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });

      // Select is open
      expect(select.classList.contains('rrs')).toEqual(true);
      expect(select.classList.contains('rrs--options-visible')).toEqual(true);

      // Zonda is selected
      expect(rrsOption9.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption9.classList.contains('rrs__option--selected')).toEqual(true);
      expect(rrsOption9.classList.contains('rrs__option--next-selection')).toEqual(true);
    });

    test('hitting **SPACE** key should open the options panel and highlight **SELECTED ITEM**', () => {
      const wrapper = render(<Select multiselect name="cars" selectedValues={['zonda']} options={BASIC_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption9 = wrapper.getByTestId('rrs-option_cars_9');

      // Focus
      act(() => select.focus());

      // Hit space key
      fireEvent.keyDown(select, { key: 'Space', keyCode: 32 });

      // Select is open
      expect(select.classList.contains('rrs')).toEqual(true);
      expect(select.classList.contains('rrs--options-visible')).toEqual(true);

      // Zonda is selected
      expect(rrsOption9.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption9.classList.contains('rrs__option--selected')).toEqual(true);
      expect(rrsOption9.classList.contains('rrs__option--next-selection')).toEqual(true);
    });

    test('hitting **ENTER** key should submit the form', () => {
      const submitSpy = jest.fn();
      const wrapper = render(
        <Select multiselect name="cars" onSubmit={submitSpy} selectedValues={['zonda']} options={BASIC_OPTIONS} />
      );

      const select = wrapper.getByTestId('cars');

      // Focus
      act(() => select.focus());

      // Hit enter key
      fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

      // onSubmit prop was called
      expect(submitSpy).toHaveBeenCalled();
    });

    test('hitting **a-z or 0-9** keys in quick succession (250ms) should open the options panel and highlight first item that starts with key pressed character/s (must be a **FOCUSSABLE ITEM**)', () => {
      jest.useFakeTimers();

      const wrapper = render(<Select multiselect name="cars" options={BASIC_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption4 = wrapper.getByTestId('rrs-option_cars_4');

      // Focus
      act(() => select.focus());

      // Hit `f` and `i` key
      fireEvent.keyDown(select, { key: 'f', keyCode: 70 });
      fireEvent.keyDown(select, { key: 'i', keyCode: 73 });

      jest.runTimersToTime(250);

      // `fiat` option was found and highlighted
      expect(rrsOption4.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption4.classList.contains('rrs__option--next-selection')).toEqual(true);
    });
  });

  describe('When focused and open', () => {
    test('hitting **TAB** key should not blur the Select Input', () => {
      // TODO: FOCUS/BLUR NOT TESTED
    });

    test('hitting **DOWN** key should decrement down the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the bottom of the options list is reached, it cycles the next potential selection up to the top of the list. It cycles infinitely', () => {
      const wrapper = render(<Select multiselect name="cars" options={MULTISELECT_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');

      // Focus
      act(() => select.focus());

      // Open panel
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Start moving down the options... continue till cycled back to 4th option
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Expect `BMW` to be highlighted
      expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
    });

    test('hitting **UP** key should increment up the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the top of the options list is reached, it cycles the next potential selection to the bottom of the list. It cycles infinitely', () => {
      const wrapper = render(<Select multiselect name="cars" options={MULTISELECT_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');

      // Focus
      act(() => select.focus());

      // Open panel
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });

      // Start moving down the options... continue till cycled back to 4th option (0 index)
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });

      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });

      // Expect `BMW` to be highlighted
      expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
    });

    test('hitting **a-z or 0-9** keys in quick succession (250ms) should highlight first item that starts with key pressed character/s  (must be a **FOCUSSABLE ITEM**)', () => {
      jest.useFakeTimers();

      const wrapper = render(<Select multiselect name="cars" options={MULTISELECT_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsOption3 = wrapper.getByTestId('rrs-option_cars_3');

      // Focus
      act(() => select.focus());

      // Open panel
      fireEvent.keyDown(select, { key: 'Up', keyCode: 38 });

      // Hit `f` and `i` key
      fireEvent.keyDown(select, { key: 'f', keyCode: 70 });
      fireEvent.keyDown(select, { key: 'i', keyCode: 73 });

      jest.runTimersToTime(250);

      // `fiat` option was found and highlighted
      expect(rrsOption3.classList.contains('rrs__option')).toEqual(true);
      expect(rrsOption3.classList.contains('rrs__option--next-selection')).toEqual(true);
    });

    test('hitting **ENTER** key should select the current highlighted option and close the options panel, but not blur the Select Input', () => {
      const submitSpy = jest.fn();
      const wrapper = render(<Select multiselect name="cars" onSubmit={submitSpy} options={MULTISELECT_OPTIONS} />);

      const select = wrapper.getByTestId('cars');
      const rrsLabel = wrapper.getByTestId('rrs-label_cars');

      // Focus
      act(() => select.focus());

      // Open panel
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Choose Fiat by keypressing Down
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Select it
      fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

      // Should have updated label with new selection
      expect(String(rrsLabel.textContent).trim()).toEqual('Fiat');

      // Should not have called onSubmit
      expect(submitSpy).not.toHaveBeenCalled();

      // TODO: FOCUS/BLUR NOT TESTED
    });

    test("hitting **ESC** key should close the options panel and keep the user's last selection, or the initial selection, but not blur the Select Input", () => {
      const submitSpy = jest.fn();
      const wrapper = render(
        <Select
          multiselect
          name="cars"
          selectedValues={['subaru']}
          onSubmit={submitSpy}
          options={MULTISELECT_OPTIONS}
        />
      );

      const select = wrapper.getByTestId('cars');
      const rrsLabel = wrapper.getByTestId('rrs-label_cars');

      // Focus
      act(() => select.focus());

      // Open panel
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Choose Fiat by keypressing Down 3 times
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });
      fireEvent.keyDown(select, { key: 'Down', keyCode: 40 });

      // Change mind about selecting this option by hitting Escape key
      fireEvent.keyDown(select, { key: 'Escape', keyCode: 27 });

      // Should NOT have updated label with new selection
      expect(String(rrsLabel.textContent).trim()).toEqual('Subaru');

      // Should not have called onSubmit
      expect(submitSpy).not.toHaveBeenCalled();

      // TODO: FOCUS/BLUR NOT TESTED
    });
  });

  describe('Mouse/Touch Device', () => {
    test("**TAPPING** on a select will open it's options", () => {});

    test("**CLICKING** on a select will open it's options", () => {});

    test("**TAPPING** on an option will select it's value", () => {});

    test("**CLICKING** on an option will select it's value", () => {});

    test('**DRAGGING** on an options panel that is scrollable, will scroll the options panel', () => {});

    test('**SCROLLING** on an options panel that is scrollable, will scroll the options panel', () => {});
  });
});
