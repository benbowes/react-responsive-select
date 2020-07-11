# Business Rules

## Single-Select Desktop Keyboard

##### When not focused

- Select Input receives focus when **TABBED** to.

##### When focused and closed

- hitting **TAB** key should blur Select Input.

- hitting **DOWN** key should open the options panel and highlight **SELECTED ITEM**.

- hitting **UP** key should open the options panel and highlight **SELECTED ITEM**.

- hitting **SPACE** key should open the options panel and highlight **SELECTED ITEM**.

- hitting **ENTER** key should submit the form.

- hitting **a-z or 0-9** keys in quick succession (250ms) should open the options panel and highlight first item that starts with key pressed character/s (must be a **FOCUSSABLE ITEM**).

##### When focused and open

- hitting **TAB** key should not blur the Select Input.

- hitting **DOWN** key should decrement down the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the bottom of the options list is reached, it cycles the next potential selection up to the top of the list. It cycles infinitely.

- hitting **UP** key should increment up the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the top of the options list is reached, it cycles the next potential selection to the bottom of the list. It cycles infinitely.

- hitting **a-z or 0-9** keys in quick succession (250ms) should highlight first item that starts with key pressed character/s (must be a **FOCUSSABLE ITEM**).

- hitting **ENTER** key should select the current highlighted option and close the options panel, but not blur the Select Input.

- hitting **SPACE** key should select the current highlighted option and close the options panel, but not blur the Select Input.

- hitting **ESC** key should close the options panel and keep the user's last selection, or the initial selection, but not blur the Select Input.

---

## Single-Select Clickable/Touch Device, As above with these ammendments

- **TAPPING** on a select will open it's options.

- **CLICKING** on a select will open it's options.

- **TAPPING** on an option will select it's value.

- **CLICKING** on an option will select it's value.

- **DRAGGING** on an options panel that is scrollable, will scroll the options panel.

- **SCROLLING** on an options panel that is scrollable, will scroll the options panel.

---

## Multi-Select Desktop Keyboard

#### When not focused

- Select Input receives focus when **TABBED** to.

#### When focused and closed

- hitting **TAB** key should blur Select Input.

- hitting **DOWN** key should open the options panel and highlight **SELECTED ITEM**.

- hitting **UP** key should open the options panel and highlight **SELECTED ITEM**.

- hitting **SPACE** key should open the options panel and highlight **SELECTED ITEM**.

- hitting **ENTER** key should submit the form.

- hitting **a-z or 0-9** keys in quick succession (250ms) should open the options panel and highlight first option that starts with key pressed character/s (must be a **FOCUSSABLE ITEM**).

#### When focused and open

- hitting **TAB** key should close options panel but retain focus on the select.

- hitting **DOWN** key should decrement down the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the bottom of the options list is reached, it cycles the next potential selection up to the top of the list. It cycles infinitely.

- hitting **UP** key should increment up the options panel - highlighting next potential selection (must be a **FOCUSSABLE ITEM**). When the top of the options list is reached, it cycles the next potential selection to the bottom of the list. It cycles infinitely.

- hitting **a-z or 0-9** keys in quick succession (250ms) should highlight first item that starts with key pressed character/s (must be a **FOCUSSABLE ITEM**).

- hitting **ENTER** key should select/unselect the current highlighted option.

- hitting **SPACE** key should select/unselect the current highlighted option.

- hitting **ESC** key should close the options panel and keep the user's last selection, or the initial selection, but not blur the Select Input.

---

## Multi-Select Clickable/Touch Device, As above with these ammendments

- **TAPPING** on a select will open it's options.

- **CLICKING** on a select will open it's options.

- **TAPPING** on an option will check/uncheck it's value.

- **CLICKING** on an option will check/uncheck it's value.

- **DRAGGING** on an options panel that is scrollable, will scroll the options panel.

- **SCROLLING** on an options panel that is scrollable, will scroll the options panel.

---

##### Terms definition

- **SELECTED ITEM** is the item set with selectedValue or the first **FIRST AVAILABLE OPTION**.

- **FIRST AVAILABLE OPTION** is the first option in the options list that is selectable. E.g:

  - Is not an option header.
  - Is not disabled.

- **FOCUSSABLE ITEM** is an option in the options list that is foccussable. E.g:
  - Is not an option header.
  - Is not disabled.
