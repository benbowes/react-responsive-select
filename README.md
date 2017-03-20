# React Responsive Select

## This is a well tested WIP / ALPHA

![Build status](https://api.travis-ci.org/benbowes/react-responsive-select.svg)

A React custom select control, that is both keyboard accessible like a native `<select/>` on desktop. And also tappable / draggable on touch devices.

## Demo

https://benbowes.github.io/react-responsive-select/demo/

---

## In Progress

- How to use documentation
- Screen reader accessibility

---

## Getting started

Install the dependency

`npm install react-responsive-select`

Include the css file in your project. `./dist/ReactResponsiveSelect.css`

And add **ReactResponsiveSelect.js**

Example usage:

```js
import ReactResponsiveSelect from 'ReactResponsiveSelect';

class Form extends Component {

  this.reportChange = this.reportChange.bind(this);

  reportChange(newValue) {
    console.log(newValue);
  }

  render() {
    return (
      <form ref={r => this.form = r}>

        <ReactResponsiveSelect
          caretIcon={<i className="caret fa fa-car" aria-hidden="true" />}
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
```

A more detailed usage example can be found here:
 https://github.com/benbowes/react-responsive-select/blob/master/demo.js

---

## API

<table width="100%">
  <tr>
    <td><b>prop</b></td>
    <td><b>type</b></td>
    <td><b>description</b></td>
    <td><b>required</b></td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name to send with the selected option value on form submit</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array of objects</td>
    <td><p>`[{
        text: "Fiat",
        value: "fiat",
        markup: <span>Fiat</span>
        }]`</p><p>`text` (Required) display value for select and the default for option label</p><p>`value` (Required) value that is submitted</p><p>`markup` (Optional) JSX markup used as the option label. Allows for the use of badges and icons...</p><p>Note: `text` is used as the option label when `markup` is not present</p></td>
    <td>Required</td>
  </tr>
  <tr>
    <td>onSubmit</td>
    <td>Function</td>
    <td>Some function submits your form</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>Function</td>
    <td><p>Listen for changes on select option change</p>
    <p>returns `{ altered: true||false, name: option.name, value: option.value, text: option.text, markup: JSX Object }`</p>
    </td>
    <td></td>
  </tr>
  <tr>
    <td>caretIcon</td>
    <td>JSX</td>
    <td>Add a dropdown icon by using JSX markup</td>
    <td></td>
  </tr>
  <tr>
    <td>selectedValue</td>
    <td>String</td>
    <td>Pre-select an option with this value - should match an existing `option.value`, or if omitted the first item will be selected</td>
    <td></td>
  </tr>
  <tr>
    <td>prefix</td>
    <td>String</td>
    <td>Prefix for the select label</td>
    <td></td>
  </tr>
</table>

---

## Touch Device Tests

- **TAPPING** on a select will open it's options
- **TAPPING** on an option will select it's value
- **DRAGGING** on an options panel that is scrollable, will scroll the options panel

---

## Desktop Keyboard Accessibility Tests

##### When not focused
- Select Input receives focus when **TABBED** to

##### When focused and closed
- hitting **TAB** key should blur Select Input
- hitting **DOWN** key should open the options panel and signify selected item
- hitting **UP** key should open the options panel and signify selected item
- hitting **SPACE** key should open the options panel and signify selected item
- hitting **ENTER** key should submit the form

##### When focused and open
- hitting **TAB** key should not blur Select Input
- hitting **DOWN** key should signify selected item and decrement down the options panel - signifying next potential selection
- hitting **UP** key should signify selected item and increment up the options panel - signifying next potential selection
- hitting **ENTER** key should select the current signified option and close the options panel
- hitting **SPACE** key should select the current signified option and close the options panel
- hitting **ESC** key should close the options panel and keep current selection

##### When not focused
- Select Input receives focus when **TABBED** to

---
