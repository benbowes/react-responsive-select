# react-responsive-select

![Build status](https://api.travis-ci.org/benbowes/react-responsive-select.svg?branch=master)

A customisable, touchable, React single-select / multi-select form control.

Built with keyboard and screen reader accessibility in mind.

## Features

- Single and Multi select modes
- Accessible WAI ARIA compliance
- Touch friendly
- Keyboard friendly
- Similar interaction experience across platforms
- Custom label rendering
- Custom option markup
- Option headers
- Mimics keyboard functionality where possible (sans multiselect)
- Easy slot-in to your design system
- It's about 25kb

## Getting started

Install the dependency - https://www.npmjs.com/package/react-responsive-select

`npm install react-responsive-select --save-dev`

Example usage (Single Select):

```jsx
import React from 'react';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';

// for default styles...
import 'react-responsive-select/dist/react-responsive-select.css';

const Form = () => (
  <form>
    <Select
      name="carType1"
      modalCloseButton={<ModalCloseButton />}
      options={[
        { value: 'null', text: 'Any' },
        { value: 'alfa-romeo', text: 'Alfa Romeo' },
        { value: 'bmw', text: 'BMW' },
        { value: 'fiat', text: 'Fiat' },
        { value: 'subaru', text: 'Subaru' },
        { value: 'suzuki', text: 'Suzuki' },
        { value: 'tesla', text: 'Tesla' },
        { value: 'volvo', text: 'Volvo' },
        { value: 'zonda', text: 'Zonda' },
      ]}
      caretIcon={<CaretIcon />}
      prefix="Car1: "
      selectedValue="subaru"
      onChange={newValue => console.log('onChange', newValue)}
      onSubmit={() => console.log('onSubmit')}
    />
  </form>
);
```

Example usage (Multi Select):

```jsx
import React from 'react';
import { Select, CaretIcon, MultiSelectOptionMarkup, ModalCloseButton } from 'react-responsive-select';

// for default styles...
import 'react-responsive-select/dist/react-responsive-select.css';

const Form = () => (
  <form>
    <Select
      multiselect={true}
      name="make6"
      selectedValues={['fiat']}
      modalCloseButton={<ModalCloseButton />}
      options={[
        {
          value: 'any',
          text: 'Any',
          markup: <MultiSelectOptionMarkup text="Any" />,
        },
        {
          value: 'fiat',
          text: 'Fiat',
          markup: <MultiSelectOptionMarkup text="Fiat" />,
        },
        {
          value: 'subaru',
          text: 'Subaru',
          markup: <MultiSelectOptionMarkup text="Subaru" />,
        },
        {
          value: 'suzuki',
          text: 'Suzuki',
          markup: <MultiSelectOptionMarkup text="Suzuki" />,
        },
      ]}
      caretIcon={<CaretIcon />}
      onChange={(...rest) => console.log(rest)}
      onSubmit={() => console.log('onSubmit')}
    />
  </form>
);
```

## Examples & Demo

https://benbowes.github.io/react-responsive-select/

## API

https://benbowes.github.io/react-responsive-select/#/API

## Screen Reader Demo

https://benbowes.github.io/react-responsive-select/#/Screen%20reader%20demo

## Business Rules

Have a read of [README_BUSINESS_RULES.md](./README_BUSINESS_RULES.md)

## Upgrade from v6 - v7

From version 7.0.0 on, you will need to use a `key` prop to update react-responsive-select's internal state. More on that here: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key

There are some examples in the recipe section here: https://benbowes.github.io/react-responsive-select/
