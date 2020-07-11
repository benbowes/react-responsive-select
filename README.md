# react-responsive-select-next

![Build status](https://api.travis-ci.org/benbowes/react-responsive-select-next.svg?branch=master)

The in-progess, and **next** version of react-responsive-select [https://www.npmjs.com/package/react-responsive-select]

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
- No global styling

## Getting started

Install the dependency - https://www.npmjs.com/package/react-responsive-select-next

`npm install react-responsive-select-next -save-dev`

Example usage:

```jsx
import React from 'react';
import { Select, CaretIcon } from 'react-responsive-select-next';

// for default styles...
import 'react-responsive-select-next/dist/react-responsive-select.css';

const onChange = newValue => console.log('onChange', newValue);
const onSubmit = () => console.log('onSubmit');

const Form = () => (
  <form>
    <Select
      name="make"
      options={[
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> },
      ]}
      selectedValue="oldsmobile"
      onSubmit={onSubmit}
      onChange={onChange}
      caretIcon={<CaretIcon />}
    />
  </form>
);
```

## Examples & Demo

https://benbowes.github.io/react-responsive-select-next/

## API

https://benbowes.github.io/react-responsive-select-next/#/API

## Screen Reader Demo

https://benbowes.github.io/react-responsive-select-next/#/Screen%20reader%20demo

## CodeSandbox.io JavaScript Examples

Coming soon...

<!-- - Single-Select Example: https://codesandbox.io/s/mo8j53wvwp
- Multi-Select Example https://codesandbox.io/s/multiselect-example-reactresponsiveselect-jo9se
- Controlled Example https://codesandbox.io/s/controlled-example-reactresponsiveselect-jcp1n
- Using with Formik Example https://codesandbox.io/s/using-reactresponsiveselect-with-formik-l234rznkl -->

## Business Rules

Have a read of [README_BUSINESS_RULES.md](./README_BUSINESS_RULES.md)
