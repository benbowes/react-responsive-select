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

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

const multiSelectOptionMarkup = (text) => (
  <div>
    <span className="checkbox">
      <svg className="checkbox-icon" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 488.878 488.878">
        <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 "/></g>
      </svg>
    </span>
    <span> {text}</span>
  </div>
);

class Form extends Component { // eslint-disable-line

  reportChange = this.reportChange.bind(this);

  reportChange(newValue) {
    console.log('reportChange', newValue);
  }

  render() {
    return (
      <form className="form" ref={r => this.form = r}>

        <h2>Single-select &amp; multi-select modes</h2>
        <div className="row row--hero --margin-bottom-4">
          <div>
            <ReactResponsiveSelect
              name="carType1"
              options={[
                { value: 'null', text: 'Any' },
                { value: 'fiat', text: 'Fiat' },
                { value: 'subaru', text: 'Subaru' },
                { value: 'bmw', text: 'BMW' },
                { value: 'tesla', text: 'Tesla' },
                { value: 'fiat', text: 'Fiat' },
                { value: 'subaru', text: 'Subaru' },
                { value: 'bmw', text: 'BMW' },
                { value: 'tesla', text: 'Tesla' }
              ]}
              onSubmit={() => { this.form.submit(); }}
              caretIcon={caretIcon}
              prefix="Car1: "
              selectedValue="subaru"
              onChange={this.reportChange}
            />
            <div className="label">Single-select basic</div>
          </div>
          <div>
            <ReactResponsiveSelect
              name="carType2"
              options={options}
              onSubmit={() => { this.form.submit(); }}
              caretIcon={caretIcon}
              prefix="Car2: "
              selectedValue="tesla"
              onChange={this.reportChange}
            />
            <div className="label">Single-select custom options</div>
          </div>
          <div>
            <ReactResponsiveSelect
              name="carType3"
              options={options}
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
                { text: 'Oldsmobile', value: 'oldsmobile', markup: multiSelectOptionMarkup('Oldsmobile') },
                { text: 'Ford', value: 'ford', markup: multiSelectOptionMarkup('Ford') },
                { text: 'Mazda', value: 'mazda', markup: multiSelectOptionMarkup('Mazda') },
                { text: 'Toyota', value: 'toyota', markup: multiSelectOptionMarkup('Toyota') },
                { text: 'AMC', value: 'amc', markup: multiSelectOptionMarkup('AMC') },
                { text: 'Delorean', value: 'delorean', markup: multiSelectOptionMarkup('Delorean') },
                { text: 'Fiat', value: 'fiat', markup: multiSelectOptionMarkup('Fiat') },
                { text: 'Subaru', value: 'subaru', markup: multiSelectOptionMarkup('Subaru') },
                { text: 'BMW', value: 'bmw', markup: multiSelectOptionMarkup('BMW') },
                { text: 'Tesla', value: 'tesla', markup: multiSelectOptionMarkup('Tesla') }
              ]}
              onSubmit={() => { this.form.submit(); }}
              caretIcon={caretIcon}
              prefix="Car4: "
              onChange={this.reportChange}
            />
            <div className="label">Multi-select</div>
          </div>
        </div>


        <div className="row">
          <h2>Install the dependency</h2>
          <pre>
          <code className="language-bash">$ npm install --save-dev react-responsive-select</code>
          </pre>
          <p className="--margin-bottom-4">Check out the full documentation in the <strong><a title="Github repository link for react-responsive-select" href="https://github.com/benbowes/react-responsive-select">react-responsive-select</a></strong> repo</p>
        </div>

        <div className="row">
          <h2>Basic implementation</h2>

          <div>
            <div className="col">
              <ReactResponsiveSelect
                name="make1"
                options={[
                  { value: 'null', text: 'Any' },
                  { value: 'fiat', text: 'Fiat' },
                  { value: 'subaru', text: 'Subaru' },
                  { value: 'bmw', text: 'BMW' },
                  { value: 'tesla', text: 'Tesla' },
                  { value: 'fiat', text: 'Fiat' },
                  { value: 'subaru', text: 'Subaru' },
                  { value: 'bmw', text: 'BMW' },
                  { value: 'tesla', text: 'Tesla' }
                ]}
                onSubmit={() => { this.form.submit(); }}
                caretIcon={caretIcon}
                prefix="Make1: "
                selectedValue="fiat"
                onChange={this.reportChange}
              />
            </div>

            <div className="view-console-message">View the onChange object via the console</div>
          </div>

<div className="code-block"><pre>
<code className="language-javascript --margin-bottom-4">
{`import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from 'react-responsive-select';

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

export default class Form extends Component {
  render() {
    return (
      <form>

        <ReactResponsiveSelect
          name="make1"
          options={[
            { value: 'null', text: 'Any' },
            { value: 'fiat', text: 'Fiat' },
            { value: 'subaru', text: 'Subaru' },
            ...
          ]}
          onSubmit={() => { console.log("Handle form submit here") }}
          caretIcon={caretIcon}
          prefix="Make1: "
          selectedValue="fiat"
          onChange={() => { console.log("Handle select change here") }}
        />

      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
`}
</code>
</pre></div>
        </div>

        <div className="row">
          <h2>Custom option markup implementation</h2>

          <div>
            <div className="col">
              <ReactResponsiveSelect
                name="make2"
                options={options}
                onSubmit={() => { this.form.submit(); }}
                caretIcon={caretIcon}
                prefix="Make2: "
                selectedValue="fiat"
                onChange={this.reportChange}
              />
            </div>

            <div className="view-console-message">View the onChange object via the console</div>
          </div>

<div className="code-block"><pre>
<code className="language-javascript --margin-bottom-4">
{`import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from 'react-responsive-select';

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

export default class Form extends Component {
  render() {
    return (
      <form>

        <ReactResponsiveSelect
          name="make2"
          options={[
              value: 'null',
              text: 'Any',
              markup: <span>Any</span>
            }, {
              value: 'fiat',
              text: 'Fiat',
              markup: <span><span className="badge" aria-hidden="true">F</span> Fiat</span>
            }, {
              value: 'subaru', // (Required) form submitted value
              text: 'Subaru',// (Required) Text displayed in the closed select's label - also used as the option label if no markup is supplied
              markup: <span><span className="badge" aria-hidden="true">S</span> Subaru</span> // (Optional) option label if you want to add your own markup. Note "text" is used in select label
            },
            ...
          ]}
          onSubmit={() => { console.log("Handle form submit here") }}
          caretIcon={caretIcon}
          prefix="Make2: "
          selectedValue="fiat"
          onChange={() => { console.log("Handle select change here") }}
        />

      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
`}
</code>
</pre></div>
        </div>

        <div className="row">
          <h2>Custom label and options implementation</h2>

          <div>
            <div className="col">
              <ReactResponsiveSelect
                name="make3"
                options={options}
                onSubmit={() => { this.form.submit(); }}
                caretIcon={caretIcon}
                customLabelRenderer={singleSelectSelectedOption => `Selected make is ${singleSelectSelectedOption.text} :)`} // (Optional) format your own label text like this
                selectedValue="fiat"
                onChange={this.reportChange}
              />
            </div>

            <div className="view-console-message">View the onChange object via the console</div>
          </div>

<div className="code-block"><pre>
<code className="language-javascript --margin-bottom-4">
{`import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from 'react-responsive-select';

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

export default class Form extends Component {
  render() {
    return (
      <form>

        <ReactResponsiveSelect
          name="make3"
          customLabelRenderer={selectedOption => { console.log(selectedOption); }} // return a string to format your own label text
          options={[
              value: 'null',
              text: 'Any',
              markup: <span>Any</span>
            }, {
              value: 'fiat',
              text: 'Fiat',
              markup: <span><span className="badge" aria-hidden="true">F</span> Fiat</span>
            }, {
              value: 'subaru', // (Required) form submitted value
              text: 'Subaru',// (Required) Text displayed in the closed select's label - also used as the option label if no markup is supplied
              markup: <span><span className="badge" aria-hidden="true">S</span> Subaru</span> // (Optional) option label if you want to add your own markup. Note "text" is used in select label
            },
            ...
          ]}
          onSubmit={() => { console.log("Handle form submit here") }}
          caretIcon={caretIcon}
          prefix="Make3:"
          selectedValue="fiat"
          onChange={() => { console.log("Handle select change here") }}
        />

      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
`}
</code>
</pre></div>

        </div>

        <div className="row">
          <h2>MultiSelect mode implementation</h2>

          <div>
            <div className="col">
              <ReactResponsiveSelect
                multiselect
                name="make4" // (Required) the value to submit
                options={[ // (Required) an array of options - see above const options
                  { text: 'Any', value: 'null', markup: multiSelectOptionMarkup('Any') },
                  { text: 'Oldsmobile', value: 'oldsmobile', markup: multiSelectOptionMarkup('Oldsmobile') },
                  { text: 'Ford', value: 'ford', markup: multiSelectOptionMarkup('Ford') },
                  { text: 'Mazda', value: 'mazda', markup: multiSelectOptionMarkup('Mazda') },
                  { text: 'Toyota', value: 'toyota', markup: multiSelectOptionMarkup('Toyota') },
                  { text: 'AMC', value: 'amc', markup: multiSelectOptionMarkup('AMC') },
                  { text: 'Delorean', value: 'delorean', markup: multiSelectOptionMarkup('Delorean') },
                  { text: 'Fiat', value: 'fiat', markup: multiSelectOptionMarkup('Fiat') },
                  { text: 'Subaru', value: 'subaru', markup: multiSelectOptionMarkup('Subaru') },
                  { text: 'BMW', value: 'bmw', markup: multiSelectOptionMarkup('BMW') },
                  { text: 'Tesla', value: 'tesla', markup: multiSelectOptionMarkup('Tesla') }
                ]}
                onSubmit={() => { this.form.submit(); }} // (Required) form submit function
                caretIcon={caretIcon} // (Optional) add you own icon by using markup here
                prefix="Make4: "
                selectedValues={['mazda','ford']}  // (Optional) pre-select an option with this `value`, or if ommited the first item will be selected
                onChange={this.reportChange} // (Optional) listen for changes in a select
              />
            </div>

            <div className="view-console-message">View the onChange object via the console</div>
          </div>

<div className="code-block"><pre>
<code className="language-javascript --margin-bottom-4">
{`import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from 'react-responsive-select';

const multiSelectOptionMarkup = (text) => (
  <div>
    <span className="checkbox">
      <svg className="checkbox-icon" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 488.878 488.878">
        <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 "/></g>
      </svg>
    </span>
    <span> {text}</span>
  </div>
);

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

export default class Form extends Component {
  render() {
    return (
      <form>

        <ReactResponsiveSelect
          multiselect
          name="make4"
          options={[
            { text: 'Any', value: 'null', markup: multiSelectOptionMarkup('Any') },
            { text: 'Oldsmobile', value: 'oldsmobile', markup: multiSelectOptionMarkup('Oldsmobile') },
            { text: 'Ford', value: 'ford', markup: multiSelectOptionMarkup('Ford') },
            ...
          ]}
          onSubmit={() => { console.log("Handle form submit here") }}
          caretIcon={caretIcon}
          prefix="Make4:"
          selectedValues={['mazda','ford']}
          onChange={() => { console.log("Handle select change here") }}
        />

      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
`}
</code>
</pre></div>

        </div>

        <div className="row">
          <h2>MultiSelect mode implementation with custom renderer</h2>

          <div>
            <div className="col">
              <ReactResponsiveSelect
                multiselect
                name="make5" // (Required) the value to submit
                options={[ // (Required) an array of options - see above const options
                  { text: 'Any', value: 'null', markup: multiSelectOptionMarkup('Any') },
                  { text: 'Oldsmobile', value: 'oldsmobile', markup: multiSelectOptionMarkup('Oldsmobile') },
                  { text: 'Ford', value: 'ford', markup: multiSelectOptionMarkup('Ford') },
                  { text: 'Mazda', value: 'mazda', markup: multiSelectOptionMarkup('Mazda') },
                  { text: 'Toyota', value: 'toyota', markup: multiSelectOptionMarkup('Toyota') },
                  { text: 'AMC', value: 'amc', markup: multiSelectOptionMarkup('AMC') },
                  { text: 'Delorean', value: 'delorean', markup: multiSelectOptionMarkup('Delorean') },
                  { text: 'Fiat', value: 'fiat', markup: multiSelectOptionMarkup('Fiat') },
                  { text: 'Subaru', value: 'subaru', markup: multiSelectOptionMarkup('Subaru') },
                  { text: 'BMW', value: 'bmw', markup: multiSelectOptionMarkup('BMW') },
                  { text: 'Tesla', value: 'tesla', markup: multiSelectOptionMarkup('Tesla') }
                ]}
                onSubmit={() => { this.form.submit(); }} // (Required) form submit function
                caretIcon={caretIcon} // (Optional) add you own icon by using markup here
                customLabelRenderer={multiSelectSelectedOptions => {
                  return multiSelectSelectedOptions.options
                    && multiSelectSelectedOptions.options.length
                    && multiSelectSelectedOptions.options.map(v => v.text).join(', ');
                }} // (Optional) format your own label text like this
                selectedValues={['mazda','ford']}  // (Optional) pre-select an option with this `value`, or if ommited the first item will be selected
                onChange={this.reportChange} // (Optional) listen for changes in a select
              />
            </div>

            <div className="view-console-message">View the onChange object via the console</div>
          </div>


<div className="code-block"><pre>
<code className="language-javascript --margin-bottom-4">
{`import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactResponsiveSelect from 'react-responsive-select';

const multiSelectOptionMarkup = (text) => (
  <div>
    <span className="checkbox">
      <svg className="checkbox-icon" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 488.878 488.878">
        <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 "/></g>
      </svg>
    </span>
    <span> {text}</span>
  </div>
);

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

export default class Form extends Component {
  render() {
    return (
      <form>

        <ReactResponsiveSelect
          multiselect
          name="make5" // (Required) the value to submit
          options={[ // (Required) an array of options - see above const options
            { text: 'Any', value: 'null', markup: multiSelectOptionMarkup('Any') },
            { text: 'Oldsmobile', value: 'oldsmobile', markup: multiSelectOptionMarkup('Oldsmobile') },
            { text: 'Ford', value: 'ford', markup: multiSelectOptionMarkup('Ford') },
            ...
          ]}
          onSubmit={() => { console.log("Handle form submit here") }}
          caretIcon={caretIcon} // (Optional) add you own icon by using markup here
          customLabelRenderer={multiSelectSelectedOptions => { console.log(multiSelectSelectedOptions); }} // return a string to format your own label text
          selectedValues={['mazda','ford']}  // (Optional) pre-select an option with this value, or if ommited the first item will be selected
          onChange={() => { console.log("Handle select change here") }}
        />

      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
`}
</code>
</pre></div>

        </div>

        <div className="row centered">
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
