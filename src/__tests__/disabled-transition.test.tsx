import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Select } from '../';

const options = [{ value: 'apple', text: 'Apple' }, { value: 'orange', text: 'Orange' }];
afterEach(cleanup);

describe('disabled prop updates', () => {
  test.each([false, true])('ignores an open option after disabling (multiselect=%s)', multiselect => {
    const onChange = jest.fn();
    const props = { name: 'fruit', options, multiselect, selectedValue: 'apple', selectedValues: ['apple'], onChange };
    const wrapper = render(<Select {...props} />);
    fireEvent.mouseDown(wrapper.getByTestId('fruit'));
    wrapper.rerender(<Select {...props} disabled />);
    expect(wrapper.container.querySelector('.rrs__button')!.getAttribute('aria-disabled')).toBe('true');
    fireEvent.mouseDown(wrapper.getByTestId('rrs-option_fruit_1'));
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.getByTestId('rrs-label_fruit').textContent!.trim()).toBe('Apple');
    wrapper.rerender(<Select {...props} disabled={false} />);
    fireEvent.mouseDown(wrapper.getByTestId('rrs-option_fruit_1'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('ignores an armed keyboard option after disabling', () => {
    const onChange = jest.fn();
    const props = { name: 'fruit', options, selectedValue: 'apple', onChange };
    const wrapper = render(<Select {...props} />);
    const select = wrapper.getByTestId('fruit');
    fireEvent.mouseDown(select);
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    wrapper.rerender(<Select {...props} disabled />);
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.getByTestId('rrs-label_fruit').textContent!.trim()).toBe('Apple');
  });
});
