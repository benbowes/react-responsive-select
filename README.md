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
- No global styling


## Getting started

Install the dependency - https://www.npmjs.com/package/react-responsive-select

`npm install react-responsive-select -save-dev`

Example usage:

```
import React from 'react';
import RRS from 'react-responsive-select';
 
const onChange = (newValue) => console.log('onChange', newValue);
const onSubmit = () => console.log('onSubmit');
 
const Form = () => (
  <form>
    <RRS
      name="make"
      options={[
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> }
      ]}
      selectedValue="oldsmobile"
      onSubmit={onSubmit}
      onChange={onChange}
      caretIcon={<CaretIcon />}
    />
  </form>
);
```

## StoryBook Examples & Demo 

https://benbowes.github.io/react-responsive-select/

## API

https://benbowes.github.io/react-responsive-select/?path=/story/info--api

## Screen Reader Demo

https://benbowes.github.io/react-responsive-select/?path=/story/info--screen-reader-demo

## CodeSandbox.io JavaScript Examples

- Single-Select Example: https://codesandbox.io/s/mo8j53wvwp
- Multi-Select Example https://codesandbox.io/s/multiselect-example-reactresponsiveselect-jo9se
- Controlled Example https://codesandbox.io/s/controlled-example-reactresponsiveselect-jcp1n
- Using with Formik Example https://codesandbox.io/s/using-reactresponsiveselect-with-formik-l234rznkl

## TypeScript Examples

- See the StoryBook `*.stories.tsx` files in here: https://github.com/benbowes/react-responsive-select/tree/master/src/stories

## Via CDN

- JS:
[ReactResponsiveSelect.js on unpkg.com](https://unpkg.com/react-responsive-select@latest/dist/ReactResponsiveSelect.js)
- CSS:
[ReactResponsiveSelect.css on unpkg.com](https://unpkg.com/react-responsive-select@latest/dist/ReactResponsiveSelect.css)

The [Codepen examples](https://codepen.io/collection/DrjWEk/) are consuming react-responsive-select via CDN if you'd like a guide.

## Business Rules

Have a read of [README_BUSINESS_RULES.md](./README_BUSINESS_RULES.md)
