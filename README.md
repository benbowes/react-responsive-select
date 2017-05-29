# React Responsive Select

![Build status](https://api.travis-ci.org/benbowes/react-responsive-select.svg?branch=master)

A React custom select control, that is both keyboard accessible like a native `<select/>` on desktop. And also tappable / draggable on touch devices.

## Demo

It has some implementation examples

https://benbowes.github.io/react-responsive-select/demo/

---

## Getting started

Install the dependency

`npm install react-responsive-select --save-dev`

Include the css file in your project. `./dist/ReactResponsiveSelect.css`

And add **ReactResponsiveSelect.js**

Example usage:

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from 'react-responsive-select';

class Form extends Component {

  reportChange(newValue) {
    console.log(newValue);
  }

  render() {
    return (
      <form ref={r => this.form = r}>

        <ReactResponsiveSelect
          caretIcon={<span style={{float:'right'}}>+</span>}
          name="make"
          options={[
            { text: 'Any', value: 'null' },
            { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
            { text: 'Ford', value: 'ford', markup: <span>Ford</span> }
          ]}
          onChange={this.reportChange}
          onSubmit={() => { this.form.submit(); }}
          prefix="Make:"
          selectedValue="mazda"
        />

      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
```

A more detailed usage example can be found here:
 https://github.com/benbowes/react-responsive-select/blob/master/demo.js

---

## Altering styling

The CSS in `./dist/ReactResponsiveSelect.css` is plain css. Include it in your project via an import or copy/paste it's contents into your stylesheet.
Customisations can be done via overriding the styles or rewriting the classes.

Note: The class names are not configurable.

To aid in styling the hover/selected states in the options list I would suggest overriding the class that hides the options temporarily e.g.

```
.rrs__select-container > .rrs__options-container {
  /* height: 0;
  visibility: hidden; */
  height: auto;
  visibility: visible;
}
```
---

## Custom labeling

As of version `0.2.0` you can hook into the onChange function via the `customLabelRenderer` function prop. This allows you to render a custom label. See the API table for what the `selectedOption` object has in it.

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
        }]</code></p><p><code>text</code> (Required) display value for the select and the default for the option label</p><p><code>value</code> (Required) value that is submitted</p><p><code>markup</code> (Optional) JSX markup used as the option label. Allows for the use of badges and icons...</p><p>Note: <code>text</code> is used as the option label when <code>markup</code> is not present</p></td>
  </tr>
  <tr>
    <td>onSubmit</td>
    <td>Function</td>
    <td>Some function submits your form</td>
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
    <td>customLabelRenderer</td>
    <td>Function</td>
    <td><p>Allows you to format your own select label</p><p>The customLabelRenderer function returns <code>{ name: select.name, value: option.value, text: option.text, markup: JSX Object }</code></p>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <td>multiselect (MultiSelect mode)</td>
    <td>Boolean</td>
    <td>Makes the selectbox handle multiple selections. Check the implementation example here: https://benbowes.github.io/react-responsive-select/demo/</td>
  </tr>
  <tr>
    <td>selectedValues (MultiSelect mode)</td>
    <td>Array of String values</td>
    <td>Pre-select several options with this value - should match against existing <code>option.value</code>, or if omitted the first item will be selected.
    e.g. <code>selectedValues={['mazda','ford']}</code>
    </td>
  </tr>
</table>

## Interaction Tests

For information about how this select control works on desktop and mobile see the Interaction tests readme [README_INTERACTION_TESTS.md]( https://github.com/benbowes/react-responsive-select/README_INTERACTION_TESTS.md)
---
