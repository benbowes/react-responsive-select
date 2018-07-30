# React Responsive Select
![Build status](https://api.travis-ci.org/benbowes/react-responsive-select.svg?branch=master)

A customisable, touchable, React single-select / multi-select form control.

Built with keyboard and screen reader accessibility in mind.

## Features

- Single and Multi select modes
- Accessible WAI ARIA compliance
- Touch friendly
- Keyboard friendly
- Similar interaction experience across platforms
- Easy to style

## Demo

https://benbowes.github.io/react-responsive-select/demo/

## Codepen

- Basic implementation example react-responsive-select https://codepen.io/benbowes/pen/gxEdoG
- Multiselect implementation with react-responsive-select https://codepen.io/benbowes/pen/MEoYvd
- Controlled example react-responsive-select https://codepen.io/benbowes/pen/baKoBQ

## Screen reader demo

![Voice over demo gif](./demo/react-responsive-select-voice-over.gif)

---

## Getting started

Install the dependency - https://www.npmjs.com/package/react-responsive-select

`npm install react-responsive-select -D`

Add **ReactResponsiveSelect.js**

And include the CSS file in your project via an import, or by copy/pasting the CSS from:  `../node_modules/react-responsive-select/dist/ReactResponsiveSelect.css`

Example usage:

```js
import React from 'react';
import ReactResponsiveSelect from 'react-responsive-select';

const reportChange = (newValue) => console.log(newValue);

const Form = () => (
  <form ref={r => this.form = r}>
    <ReactResponsiveSelect
      name="make"
      options={[
        { text: 'Any', value: 'null' },
        { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
        { text: 'Ford', value: 'ford', markup: <span>Ford</span> }
      ]}
      prefix="Make:"
      selectedValue="mazda"
      onSubmit={() => { this.form.submit(); }}
      onChange={reportChange}
      caretIcon={<span>+</span>}
    />
  </form>
);
```

A more detailed usage example can be found here:
 https://github.com/benbowes/react-responsive-select/blob/master/demo/src/index.js

---

## Altering styling

The CSS in `./dist/ReactResponsiveSelect.css` is plain css. Include it in your project via an import or copy paste it's contents into your stylesheet.
Customisations can be done via overriding the styles or rewriting the classes.

The class names themselves are not configurable.

To aid in styling the hover/selected states in the options list, I would suggest overriding the class that hides the options temporarily e.g.

```
.rrs__button + .rrs__options {
  /* height: 0;
  visibility: hidden; */
  height: auto;
  visibility: visible;
}
```
---

## Custom labelling

You can hook into the onChange function via the `customLabelRenderer` function prop. This allows you to render a custom label. See the API table for what the `selectedOption` object has in it.

```
<ReactResponsiveSelect
  name="make2"
  options={options}
  onSubmit={() => { this.form.submit(); }}
  // (Optional) format your own label text like this
  customLabelRenderer={selectedOption => `Selected make is ${selectedOption.text} :)`}
/>
```

---

## API

#### Single Select

<table width="100%">
  <tr>
    <td><b>prop</b></td>
    <td><b>type</b></td>
    <td><b>description</b></td>
  </tr>
  <tr>
    <td>name (required)</td>
    <td>String</td>
    <td>The name to send with the selected option value(s) on form submit</td>
  </tr>
  <tr>
    <td>options (required)</td>
    <td>Array of objects</td>
    <td><p><code>[{
        text: "Fiat",
        value: "fiat",
        markup: &lt;span&gt;Fiat&lt;/span&gt;
        disabled: true;
        }]</code></p><p><code>text:</code> (Required) display value for the select and the default for the option label</p><p><code>value:</code> (Required) value that is submitted</p><p><code>markup:</code> (Optional) JSX markup used as the option label. Allows for the use of badges and icons...</p><p><code>disabled:</code> (Optional) disable option - option cannot be selected and is greyed</p><p>Note: <code>text</code> is used as the option label when <code>markup</code> is not present</p></td>
  </tr>
  <tr>
    <td>onSubmit</td>
    <td>Function</td>
    <td>Some function that submits your form</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>Function</td>
    <td><p>Listen for changes on selected option change</p>
    <p>returns <code>{ altered: true||false, name: select.name, value: option.value, text: option.text, markup: JSX Object }</code></p><p>Note: <code>altered</code> signifies whether a select has been changed from it's original value.</p>
    </td>
  </tr>
  <tr>
    <td>caretIcon</td>
    <td>JSX</td>
    <td>Add a dropdown icon by using JSX markup</td>
  </tr>
  <tr>
    <td>selectedValue</td>
    <td>String</td>
    <td>Pre-select an option with this value - should match an existing <code>option.value</code>, or if omitted the first item will be selected</td>
  </tr>
  <tr>
    <td>prefix</td>
    <td>String</td>
    <td>Prefix for the select label</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Boolean</td>
    <td>Disables the select control</td>
  </tr>
  <tr>
    <td>noSelectionLabel</td>
    <td>string</td>
    <td>A custom label to be used when nothing is selected. When used, the first option is not automatically selected</td>
  </tr>
  <tr>
    <td>customLabelRenderer</td>
    <td>Function</td>
    <td><p>Allows you to format your own select label</p><p>The customLabelRenderer function returns an option object e.g. <code>{ name: select.name, value: option.value, text: option.text, markup: JSX Object }</code></p>
    <p>To use this feature you need to return some JSX; using values from the above object to create your own custom label.</p>
    <p>See the example in the [singleselect demo](https://github.com/benbowes/react-responsive-select/blob/master/demo/src/index.js#L144). </p>
    </td>
  </tr>
</table>

#### Multi Select

Same as Single Select API but with the following amendments

<table width="100%">
  <tr>
    <td>multiselect</td>
    <td>Boolean</td>
    <td>Makes the select control handle multiple selections. Check the implementation example here: https://benbowes.github.io/react-responsive-select/demo/</td>
  </tr>
  <tr>
    <td>selectedValues</td>
    <td>Array of String values</td>
    <td>Pre-select several options with this value - should match against an existing <code>option.value</code>, or if omitted, the first item will be selected.
    e.g. <code>selectedValues={['mazda','ford']}</code>
    </td>
  </tr>
  <tr>
    <td>customLabelRenderer</td>
    <td>Function</td>
    <td><p>Allows you to format your own select label</p><p>The customLabelRenderer function returns an array option objects e.g. <code>[{ name: select.name, value: option.value, text: option.text, markup: JSX Object }]</code></p>
    <p>To use this feature you need to return some JSX; using values from the above object to create your own custom label.</p>
    <p>See the example in the [multiselect demo](https://github.com/benbowes/react-responsive-select/blob/master/demo/src/index.js#L589-L591).</p>
    </td>
  </tr>
</table>

## CDN

JS:
https://unpkg.com/react-responsive-select@latest/dist/ReactResponsiveSelect.js

CSS:
https://unpkg.com/react-responsive-select@latest/dist/ReactResponsiveSelect.css

The [Codepen examples](https://codepen.io/collection/DrjWEk/) are consuming react-responsive-select via CDN if you'd like a guide.

## Babel Preset Env Targets

```
{
  "chrome": "62",
  "android": "4.2",
  "edge": "13",
  "firefox": "56",
  "ie": "11",
  "ios": "10",
  "safari": "10"
}
```

## React Responsive Select 2.x => 3.x upgrade guide

See: https://github.com/benbowes/react-responsive-select/releases/tag/3.0.0

## React Responsive Select 3.x => 4.x

Upgraded from React 15.x to React 16.x

## Interaction Tests

For information about how this select control works on desktop and mobile see the Interaction tests readme [README_INTERACTION_TESTS.md](https://github.com/benbowes/react-responsive-select/blob/master/README_INTERACTION_TESTS.md)
