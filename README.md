# React Responsive Select

## This is a well tested WIP / ALPHA

![Build status](https://api.travis-ci.org/benbowes/react-responsive-select.svg)

A React custom select control, that is both keyboard accessible like a native `<select/>` on desktop. And also tappable / draggable on touch devices.

## Demo

https://benbowes.github.io/react-responsive-select/demo/

---

## Todos - items coming soon

- how to use documentation
- screen reader accessibility

---

## Usage

More info to come... but if you are interested, check out the `demo.js` file on the root level of the project :)
 https://github.com/benbowes/react-responsive-select/blob/master/demo.js

... and include `./dist/ReactResponsiveSelect.css` to your project.

---

## Touch Device Tests

- tapping on a select will open it's options
- tapping on an option will select it's value
- dragging on an options panel that is scrollable, will scroll the options panel

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
