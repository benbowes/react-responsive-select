```jsx noeditor
import { Select, CaretIcon, MultiSelectOptionMarkup, CheckboxIcon } from '../react-responsive-select'; // 'react-responsive-select'

const Badge = ({ text }) => (
  <span>
    <span className="badge" aria-hidden="true">
      {text[0]}
    </span>
    <span> {text}</span>
  </span>
);

<>
  <div className="home">
    <div>
      <h2 className="subh1">
        A customisable, touchable, <b>React select</b> / <b>multi-select</b> form component.
        <br />
        Built with keyboard and screen reader accessibility in mind.
      </h2>
    </div>
    <div className="row">
      <h2>FEATURES</h2>
      <ul className="features-list">
        <li className="features-list__item">
          <span className="features-list__checkIcon">
            <CheckboxIcon />
          </span>
          <h4>Single and Multi select modes</h4>
        </li>
        <li className="features-list__item">
          <span className="features-list__checkIcon">
            <CheckboxIcon />
          </span>
          <h4>Accessible WAI ARIA compliance</h4>
        </li>
        <li className="features-list__item">
          <span className="features-list__checkIcon">
            <CheckboxIcon />
          </span>
          <h4>Touch friendly</h4>
        </li>
        <li className="features-list__item">
          <span className="features-list__checkIcon">
            <CheckboxIcon />
          </span>
          <h4>Keyboard friendly</h4>
        </li>
        <li className="features-list__item">
          <span className="features-list__checkIcon">
            <CheckboxIcon />
          </span>
          <h4>Similar interaction experience across platforms</h4>
        </li>
        <li className="features-list__item">
          <span className="features-list__checkIcon">
            <CheckboxIcon />
          </span>
          <h4>Easy to style</h4>
        </li>
      </ul>
    </div>
    <h2>DEMO</h2>
    <h3>Single-select &amp; multi-select modes</h3>
    <div className="row row--hero --margin-bottom-4">
      <div>
        <Select
          name="carType1"
          options={[
            { value: 'null', text: 'Any' },
            { value: 'alfa-romeo', text: 'Alfa Romeo' },
            { value: 'bmw', text: 'BMW' },
            { value: 'fiat', text: 'Fiat' },
            { value: 'subaru', text: 'Subaru' },
            { value: 'suzuki', text: 'Suzuki' },
            { value: 'tesla', text: 'Tesla' },
            { value: 'volvo', text: 'Volvo' },
            { value: 'zonda', text: 'Zonda' },
          ]}
          caretIcon={<CaretIcon />}
          prefix="Car1: "
          onChange={newValue => console.log('onChange', newValue)}
          onSubmit={() => console.log('onSubmit')}
        />
        <div className="label">Single-select basic</div>
      </div>
      <div>
        <Select
          name="carType2"
          options={[
            {
              value: 'null',
              text: 'Any',
              markup: <span>Any</span>,
            },
            {
              value: 'bmw',
              text: 'BMW',
              markup: <Badge text="BMW" />,
            },
            {
              value: 'fiat',
              text: 'Fiat',
              markup: <Badge text="Fiat" />,
            },
            {
              value: 'subaru',
              text: 'Subaru',
              markup: <Badge text="Subaru" />,
            },
            {
              value: 'tesla',
              text: 'Tesla',
              markup: <Badge text="Tesla" />,
            },
          ]}
          caretIcon={<CaretIcon />}
          prefix="Car2: "
          selectedValue="tesla"
          onSubmit={() => console.log('onSubmit')}
          onChange={newValue => console.log('onChange', newValue)}
        />
        <div className="label">Single-select custom options</div>
      </div>
      <div>
        <Select
          name="carType3"
          onSelect={selectedOption => console.log('onSelect', selectedOption)}
          options={[
            {
              value: 'null',
              text: 'Any',
              markup: <span>Any</span>,
            },
            {
              value: 'bmw',
              text: 'BMW',
              markup: <Badge text="BMW" />,
            },
            {
              value: 'fiat',
              text: 'Fiat',
              markup: <Badge text="Fiat" />,
            },
            {
              value: 'subaru',
              text: 'Subaru',
              markup: <Badge text="Subaru" />,
            },
            {
              value: 'tesla',
              text: 'Tesla',
              markup: <Badge text="Tesla" />,
            },
          ]}
          customLabelRenderer={selectedOption => <span>🎉 You selected 👉{selectedOption.text}</span>}
          caretIcon={<CaretIcon />}
          prefix="Car3: "
          selectedValue="bmw"
          onSubmit={() => console.log('onSubmit')}
          onChange={newValue => console.log('onChange', newValue)}
        />
        <div className="label">Single-select custom label</div>
      </div>
      <div>
        <Select
          multiselect={true}
          onDeselect={deselectedOption => console.log('onDeselect', deselectedOption)}
          onSelect={selectedOption => console.log('onSelect', selectedOption)}
          name="carType4"
          options={[
            // (Required) an array of options - see above const options
            {
              text: 'Any',
              value: 'null',
              markup: <MultiSelectOptionMarkup text="Any" />,
            },
            {
              text: 'AMC',
              value: 'amc',
              markup: <MultiSelectOptionMarkup text="AMC" />,
            },
            {
              text: 'BMW',
              value: 'bmw',
              markup: <MultiSelectOptionMarkup text="BMW" />,
            },
            {
              text: 'Delorean',
              value: 'delorean',
              markup: <MultiSelectOptionMarkup text="Delorean" />,
            },
            {
              text: 'Fiat',
              value: 'fiat',
              markup: <MultiSelectOptionMarkup text="Fiat" />,
            },
            {
              text: 'Ford',
              value: 'ford',
              markup: <MultiSelectOptionMarkup text="Ford" />,
            },
            {
              text: 'Mazda',
              value: 'mazda',
              markup: <MultiSelectOptionMarkup text="Mazda" />,
            },
            {
              text: 'Oldsmobile',
              value: 'oldsmobile',
              markup: <MultiSelectOptionMarkup text="Oldsmobile" />,
            },
            {
              text: 'Subaru',
              value: 'subaru',
              markup: <MultiSelectOptionMarkup text="Subaru" />,
            },
            {
              text: 'Tesla',
              value: 'tesla',
              markup: <MultiSelectOptionMarkup text="Tesla" />,
            },
            {
              text: 'Toyota',
              value: 'toyota',
              markup: <MultiSelectOptionMarkup text="Toyota" />,
            },
          ]}
          caretIcon={<CaretIcon />}
          prefix="Car4: "
          onChange={newValue => console.log('onChange', newValue)}
          onSubmit={() => console.log('onSubmit')}
        />
        <div className="label">Multi-select</div>
      </div>
    </div>

    <div className="logo-links">
      <h2>LINKS</h2>
      <ul>
        <li>
          <span className="logo-links__link">NPM: </span>
          <a title="View on NPM" className="npm-link" href="https://www.npmjs.com/package/react-responsive-select">
            https://www.npmjs.com/package/react-responsive-select
          </a>
        </li>
        <li>
          <span className="logo-links__link">Github: </span>
          <a title="View on Github" className="github-link" href="https://github.com/benbowes/react-responsive-select/">
            https://github.com/benbowes/react-responsive-select/
          </a>
        </li>
      </ul>
    </div>
  </div>
</>;
```
