import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from './src/ReactResponsiveSelect';

const options = [{
  value: 'null',
  text: 'Any',
  markup: <span>Any</span>
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

class Form extends Component {
  constructor() {
    super();
    this.reportChange = this.reportChange.bind(this);
  }

  reportChange(v) {
    console.log(v);
  }

  render() {
    return (
      <form ref={r => this.form = r}>
        <div className="row">
          <div className="col-1-4">
            <ReactResponsiveSelect
              dropdownIcon={<i className="rrs__icon fa fa-angle-down" aria-hidden="true"></i>}
              // prefix="Make:"
              name="make"
              // selectedValue="mazda"
              options={[
                { text: 'Any', value: 'null' },
                { text: 'Oldsmobile', value: 'oldsmobile' },
                { text: 'Ford', value: 'ford' },
                { text: 'Mazda', value: 'mazda' },
                { text: 'Toyota', value: 'toyota' },
                { text: 'AMC', value: 'amc' },
                { text: 'Delorean', value: 'delorean' },
                { text: 'Fiat', value: 'fiat' },
                { text: 'Subaru', value: 'subaru' },
                { text: 'BMW', value: 'bmw' },
                { text: 'Tesla', value: 'tesla' }
              ]}
              onChange={this.reportChange}
              onSubmit={() => { this.form.submit(); }}
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              dropdownIcon={<i className="rrs__icon fa fa-angle-down" aria-hidden="true"></i>}
              prefix="Make:"
              name="make"
              selectedValue="fiat"
              options={options}
              onChange={this.reportChange}
              onSubmit={() => { this.form.submit(); }}
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              dropdownIcon={<i className="rrs__icon fa fa-angle-down" aria-hidden="true"></i>}
              prefix="Make:"
              name="make"
              selectedValue="fiat"
              options={options}
              onChange={this.reportChange}
              onSubmit={() => { this.form.submit(); }}
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              dropdownIcon={<i className="rrs__icon fa fa-angle-down" aria-hidden="true"></i>}
              prefix="Make:"
              name="make"
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
