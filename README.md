# React Responsive Select

**Alpha version**  - ![Build status](https://api.travis-ci.org/benbowes/react-responsive-select.svg)

A React custom select that is keyboard accessible on desktop.
And tappable / draggable on touch devices.

<img src="https://media1.giphy.com/media/401CMO1Du5cju/giphy.gif" width="40%" /> <img src="https://media1.giphy.com/media/D4aqbOMrQnHxK/giphy.gif" width="30%" />

## Demo

https://benbowes.github.io/react-responsive-select/demo/

---

## Local Development

##### Setup

`npm i` then `npm start` then visit `http://localhost:3001/demo`

##### Test

`npm test`

##### Coverage

`npm run coverage`

##### Run demo

`npm run demo`

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

## Touch Device Tests

- tapping on a select will open it's options
- tapping on an option will select it's value
- dragging on an options panel that is scrollable, will scroll the options panel

---

## Device tests

#### Destop browsers
- :white_check_mark: Chrome latest
- :white_check_mark: Safari latest
- :white_check_mark: Firefox latest
- :white_check_mark: IE 11.

#### Android
- :white_check_mark: Nexus 5 - Android 4.4 (Chrome)
- ? Samsung Galaxy S3 - Android 4 (Native)

#### iPhone
- :white_check_mark: iPhone 6+ - iOS 9 (Safari)
- :white_check_mark: iPhone 5 - iOS 6 (Safari)

#### iPad
- :white_check_mark: iPad Pro - iOS 10
- :white_check_mark: iPad Air 2 - iOS 9.3
- :white_check_mark: iPad Mini - iOS 7
- :white_check_mark: iPad 3 - iOS 6
- :x: iPad 3 - iOS 5.1
- :x: iPad 2 - iOS 5
