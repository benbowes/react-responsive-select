import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from '../../src/ReactResponsiveSelect';

// By default no caret icon is supplied - any valid jsx markup will do
// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"></path></g>
  </svg>
);

const checkboxIcon = (
  <span className="checkbox">
    <svg className="checkbox-icon" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 488.878 488.878">
      <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 "></polygon></g>
    </svg>
  </span>
);

const multiSelectOptionMarkup = (text) => (
  <div>
    {checkboxIcon}
    <span> {text}</span>
  </div>
);

const singleSelectOptions = [
  { value: 'null', text: 'Any' },
  { value: 'alfa-romeo', text: 'Alfa Romeo' },
  { value: 'bmw', text: 'BMW' },
  { value: 'fiat', text: 'Fiat' },
  { value: 'lexus', text: 'Lexus' },
  { value: 'morgan', text: 'Morgan' },
  { value: 'subaru', text: 'Subaru' }
];

const multiSelectOptions = [
  { value: 'null', text: 'Any', markup: multiSelectOptionMarkup('Any') },
  { value: 'alfa-romeo', text: 'Alfa Romeo', markup: multiSelectOptionMarkup('Alfa Romeo') },
  { value: 'bmw', text: 'BMW', markup: multiSelectOptionMarkup('BMW') },
  { value: 'fiat', text: 'Fiat', markup: multiSelectOptionMarkup('Fiat') },
  { value: 'lexus', text: 'Lexus', markup: multiSelectOptionMarkup('Lexus') },
  { value: 'morgan', text: 'Morgan', markup: multiSelectOptionMarkup('Morgan') },
  { value: 'subaru', text: 'Subaru', markup: multiSelectOptionMarkup('Subaru') }
];

/* eslint-disable react/no-multi-comp */
class Form extends Component {
  state = {
    selectedValue: 'null',
    initialSelectedValue: 'null',
    selectedValues: ['bmw','fiat'],
    initialSelectedValues: ['bmw','fiat'],
    isSingleSelect: true,
    isDisabled: false
  };

  handleSubmit = this.handleSubmit.bind(this);
  handleSingleSelectChange = this.handleSingleSelectChange.bind(this);
  handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
  handleSelectOption = this.handleSelectOption.bind(this);
  handleSelectOptions = this.handleSelectOptions.bind(this);
  handleSelectTypeChange = this.handleSelectTypeChange.bind(this);
  handleDisabledChange = this.handleDisabledChange.bind(this);

  handleSelectOption(e) {
    const firstLetter = e.target.value.charAt(0);
    const found = singleSelectOptions.filter(v => v.value.charAt(0) === firstLetter)[0];
    const foundValue = found
      ? found.value
      : '';

    this.setState({ selectedValue: foundValue });
  }

  handleSelectOptions(e) {
    if (e.target.value.length === 0) return;

    const firstLetters = e.target.value.split(',');
    const foundValues = multiSelectOptions
      .filter((v) => firstLetters.some(letter => v.value.charAt(0) === letter.charAt(0)))
      .map(v => v.value);

    this.setState({ selectedValues: foundValues.reverse() });
  }

  handleSingleSelectChange(newValue) {
    const formValue = {
      [newValue.name]: {
        text: newValue.text,
        value: newValue.value,
        altered: newValue.altered
      },
      selectedValue: newValue.value
    };

    // Merge new value over top of existing value
    this.setState(
      { ...this.state, ...formValue },
      () => console.log('handleChange()', this.state)
    );
  }

  getMultiSelectValue(newValue) {
    return {
      [newValue.options[0].name]: {
        options: [...newValue.options],
        altered: newValue.altered
      }
    };
  }

  handleMultiSelectChange(newValue) {
    const formValue = this.getMultiSelectValue(newValue);
    console.log(newValue);
    // Merge new value over top of existing value
    this.setState({
      ...this.state,
      ...formValue,
      selectedValues: newValue.options.map(v => v.value)
    });
  }

  handleSelectTypeChange(e) {
    this.setState({ isSingleSelect: (e.target.value === 'single-select') });
  }

  handleDisabledChange(e) {
    this.setState({ isDisabled: (e.target.checked) });
  }

  handleSubmit() {
    console.log('handleSubmit()', this.state);
  }

  render() {
    const {
      selectedValue, initialSelectedValue, selectedValues, initialSelectedValues, isSingleSelect, isDisabled
    } = this.state;

    return (
      <div>
        <form>

          {isSingleSelect &&
          <div>
            <ReactResponsiveSelect
              name="make1"
              disabled={isDisabled}
              options={singleSelectOptions}
              caretIcon={caretIcon}
              prefix="Make1: "
              altered={initialSelectedValue !== selectedValue}
              selectedValue={this.state.selectedValue}
              onChange={this.handleSingleSelectChange}
              onSubmit={this.handleSubmit}
            />
            <input
              className="controlling-input"
              type="text"
              name="firstLetter"
              placeholder="Select option via first letter"
              onKeyUp={(e) => this.handleSelectOption(e)}
            />
          </div>
          }

          {!isSingleSelect &&
          <div>
            <ReactResponsiveSelect
              multiselect
              disabled={isDisabled}
              name="make2"
              altered={initialSelectedValues.join('_') !== selectedValues.join('_')}
              options={multiSelectOptions}
              caretIcon={caretIcon}
              prefix="Make2: "
              selectedValues={selectedValues}
              onChange={this.handleMultiSelectChange}
              onSubmit={this.handleSubmit}
            />
            <input
              className="controlling-input"
              type="text"
              name="firstLetters"
              placeholder="Select options via comma-delimited first letters e.g. a,s,f"
              onKeyUp={(e) => this.handleSelectOptions(e)}
            />
          </div>
          }

              <label>
                <input checked={isSingleSelect} onChange={this.handleSelectTypeChange} type="radio" name="selectType" value="single-select" />
                Single Select
              </label>
              <label>
                <input checked={!isSingleSelect} onChange={this.handleSelectTypeChange} type="radio" name="selectType" value="multi-select" />
                Multi Select
            </label>
<label>
          <input checked={isDisabled} onChange={this.handleDisabledChange} type="checkbox" name="disabled" value="is-disabled" />
          Disabled
          </label>

        </form>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
