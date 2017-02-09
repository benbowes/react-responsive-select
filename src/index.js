import 'babel-polyfill'; // For IE 11

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SelectBox from './SelectBox';

const options = [
  { displayText: 'Any', value: 'null' },
  { displayText: 'Fiat', value: 'fiat' },
  { displayText: 'Subaru', value: 'subaru' },
  { displayText: 'BMW', value: 'bmw' },
  { displayText: 'Tesla', value: 'tesla' }
];


class Form extends Component {
  render() {
    return (
      <form ref={r => this.form = r}>
        <h3>Custom Selects</h3>
        <div className="row">
          <div className="colQuarter">

            <SelectBox
              prefix="Make"
              name="make"
              selectedValue="fiat"
              options={options}
              onSubmit={() => { this.form.submit(); }}
            />

          </div>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
