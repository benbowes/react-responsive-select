import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from '../../src/ReactResponsiveSelect';

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" /></g>
  </svg>
);

const checkboxIcon = (
  <span className="checkbox">
    <svg className="checkbox-icon" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 488.878 488.878">
      <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 " /></g>
    </svg>
  </span>
);

const multiSelectOptionMarkup = text => (
  <div>
    {checkboxIcon}
    <span> {text}</span>
  </div>
);

class Form extends Component { // eslint-disable-line

  constructor() {
    super();
    this.reportChange = this.reportChange.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  reportChange(newValue) {
    console.log('reportChange', newValue);
  }

  render() {
    return (
      <form className="form" ref={(r) => { this.form = r; }}>

        <h2>DEMO</h2>

        <h3>Single-select &amp; multi-select modes demo</h3>
        <div className="row row--hero --margin-bottom-4">
          <div>
            <ReactResponsiveSelect
              name="carType1"
              options={[
                { value: 'alfa-romeo', text: 'Alfa Romeo' },
                { value: 'bmw', text: 'BMW' },
                { value: 'fiat', text: 'Fiat' },
                { value: 'subaru', text: 'Subaru' },
                { value: 'suzuki', text: 'Suzuki' },
                { value: 'tesla', text: 'Tesla' },
                { value: 'volvo', text: 'Volvo' },
                { value: 'zonda', text: 'Zonda' },
              ]}
              onSubmit={() => { this.form.submit(); }}
              caretIcon={caretIcon}
              prefix="Car1: "
              noSelectionLabel="Please select"
              onChange={this.reportChange}
            />
            <div className="label">Single-select basic</div>
          </div>
          <div>
            <ReactResponsiveSelect
              name="carType2"
              options={[{
                value: 'null',
                text: 'Any',
                markup: <span>Any</span>,
              }, {
                value: 'bmw',
                text: 'BMW',
                markup: <span><span className="badge" aria-hidden="true">B</span> BMW</span>,
              }, {
                value: 'fiat',
                text: 'Fiat',
                markup: <span><span className="badge" aria-hidden="true">F</span> Fiat</span>,
              }, {
                value: 'subaru',
                text: 'Subaru',
                markup: <span><span className="badge" aria-hidden="true">S</span> Subaru</span>,
              }, {
                value: 'tesla',
                text: 'Tesla',
                markup: <span><span className="badge" aria-hidden="true">T</span> Tesla</span>,
              }]}
              onSubmit={() => { this.form.submit(); }}
              caretIcon={caretIcon}
              prefix="Car2: "
              // selectedValue="tesla"
              onChange={this.reportChange}
            />
            <div className="label">Single-select custom options</div>
          </div>
          <div>
            <ReactResponsiveSelect
              name="carType3"
              options={[{
                value: 'null',
                text: 'Any',
                markup: <span>Any</span>,
              }, {
                value: 'bmw',
                text: 'BMW',
                markup: <span><span className="badge" aria-hidden="true">B</span> BMW</span>,
              }, {
                value: 'fiat',
                text: 'Fiat',
                markup: <span><span className="badge" aria-hidden="true">F</span> Fiat</span>,
              }, {
                value: 'subaru',
                text: 'Subaru',
                markup: <span><span className="badge" aria-hidden="true">S</span> Subaru</span>,
              }, {
                value: 'tesla',
                text: 'Tesla',
                markup: <span><span className="badge" aria-hidden="true">T</span> Tesla</span>,
              }]}
              onSubmit={() => { this.form.submit(); }}
              customLabelRenderer={singleSelectSelectedOption => `You selected ${singleSelectSelectedOption.text}`}
              caretIcon={caretIcon}
              prefix="Car3: "
              selectedValue="bmw"
              onChange={this.reportChange}
            />
            <div className="label">Single-select custom label</div>
          </div>
          <div>
            <ReactResponsiveSelect
              multiselect
              name="carType4"
              options={[ // (Required) an array of options - see above const options
                { text: 'Any', value: 'null', markup: multiSelectOptionMarkup('Any') },
                { text: 'AMC', value: 'amc', markup: multiSelectOptionMarkup('AMC') },
                { text: 'BMW', value: 'bmw', markup: multiSelectOptionMarkup('BMW') },
                { text: 'Delorean', value: 'delorean', markup: multiSelectOptionMarkup('Delorean') },
                { text: 'Fiat', value: 'fiat', markup: multiSelectOptionMarkup('Fiat') },
                { text: 'Ford', value: 'ford', markup: multiSelectOptionMarkup('Ford') },
                { text: 'Mazda', value: 'mazda', markup: multiSelectOptionMarkup('Mazda') },
                { text: 'Oldsmobile', value: 'oldsmobile', markup: multiSelectOptionMarkup('Oldsmobile') },
                { text: 'Subaru', value: 'subaru', markup: multiSelectOptionMarkup('Subaru') },
                { text: 'Tesla', value: 'tesla', markup: multiSelectOptionMarkup('Tesla') },
                { text: 'Toyota', value: 'toyota', markup: multiSelectOptionMarkup('Toyota') },
              ]}
              onSubmit={() => { this.form.submit(); }}
              caretIcon={caretIcon}
              prefix="Car4: "
              onChange={this.reportChange}
            />
            <div className="label">Multi-select</div>
          </div>
        </div>

        <div className="row centered">
          <h3>When inside a &lt;form /&gt;, submit will happen like a standard html form</h3>
          <button type="submit" className="button">Submit page</button><br /><div className="view-console-message"> Check the URL after you submit the page</div>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root'),
);
