# Interaction Tests

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
- hitting **a-z or 0-9** key should highlight first item that starts with this character

##### When focused and open
- hitting **TAB** key should not blur Select Input
- hitting **DOWN** key should signify selected item and decrement down the options panel - signifying next potential selection
- hitting **UP** key should signify selected item and increment up the options panel - signifying next potential selection
- hitting **ENTER** key should select the current signified option and close the options panel
- hitting **SPACE** key should select the current signified option and close the options panel
- hitting **ESC** key should close the options panel and keep current selection
- hitting **a-z or 0-9** key should highlight first item that starts with this character

##### When not focused
- Select Input receives focus when **TABBED** to
