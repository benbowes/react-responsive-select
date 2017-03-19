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

const caretIcon = (
  <svg className="dropdown-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

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
              caretIcon={caretIcon}
              name="make"
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
              // prefix="Make:"
              // selectedValue="mazda"
            />
          </div>
          <div className="col-1-4">
            <ReactResponsiveSelect
              caretIcon={caretIcon}
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
              caretIcon={caretIcon}
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
              caretIcon={caretIcon}
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
