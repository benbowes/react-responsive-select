import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from './src/ReactResponsiveSelect';

const options = [{
  value: 'null', // (Required) form submitted value
  text: 'Any', // (Required) Text displayed in the closed select's label - also used as the option label if no markup is supplied
  markup: <span>Any</span> // (Optional) option label if you want to add your own markup. Note `text` is always used in select label
}, {
  value: 'fiat',
  text: 'Fiat',
  markup: <span><span className="badge" aria-hidden="true">F</span> Fiat</span>
}, {
  value: 'subaru',
  text: 'Subaru',
  markup: <span><span className="badge" aria-hidden="true">S</span> Subaru</span>
}, {
  value: 'bmw',
  text: 'BMW',
  markup: <span><span className="badge" aria-hidden="true">B</span> BMW</span>
}, {
  value: 'tesla',
  text: 'Tesla',
  markup: <span><span className="badge" aria-hidden="true">T</span> Tesla</span>
}];

// By default no caret icon is supplied - any valid markup will do
const caretIcon = (
  <svg className="dropdown-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

class Form extends Component {

  reportChange = this.reportChange.bind(this);

  reportChange(newValue) {
    console.log(newValue);
  }

  render() {
    return (
      <form ref={r => this.form = r}>
        <div className="row">
          <div className="col-1-4">
            <ReactResponsiveSelect
              caretIcon={caretIcon} // (Optional) add you own icon by using markup here
              prefix="Make1:" // (Optional) Prefix for the select label. e.g `Make: SomeOptionText`
              name="make1" // (Required) the value to submit
              selectedValue="mazda"  // (Optional) pre-select an option with this `value`, or if ommited the first item will be selected
              options={[ // (Required) an array of options - see above const options
                { text: 'Any', value: 'null' },
                { text: 'Oldsmobile', value: 'oldsmobile' },
                { text: 'Ford', value: 'ford' },
                { text: 'Mazda', value: 'mazda' },
                { text: 'Toyota', value: 'toyota' },
                { text: 'AMC', value: 'amc' },
                { text: 'Delorean', value: 'delorean', markup: <span><span className="badge" aria-hidden="true">D</span> Delorean</span> },
                { text: 'Fiat', value: 'fiat' },
                { text: 'Subaru', value: 'subaru' },
                { text: 'BMW', value: 'bmw' },
                { text: 'Tesla', value: 'tesla' }
              ]}
              onChange={this.reportChange} // (Optional) listen for changes in a select
              onSubmit={() => { this.form.submit(); }} // (Required) form submit function
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              caretIcon={caretIcon}
              prefix="Make2:"
              name="make2"
              selectedValue="fiat"
              options={options}
              onChange={this.reportChange}
              onSubmit={() => { this.form.submit(); }}
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              caretIcon={caretIcon}
              prefix="Make3:"
              name="make3"
              selectedValue="fiat"
              options={options}
              onChange={this.reportChange}
              onSubmit={() => { this.form.submit(); }}
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              caretIcon={caretIcon}
              prefix="Make4:"
              name="make4"
              selectedValue="fiat"
              options={options}
              onChange={this.reportChange}
              onSubmit={() => { this.form.submit(); }}
            />
          </div>
        </div>
        <br/>
        <div className="row">
          <button type="submit" className={'button'}>Submit form</button>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
