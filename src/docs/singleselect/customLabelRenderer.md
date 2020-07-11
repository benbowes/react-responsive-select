Allows you to format your own custom select label.

The customLabelRenderer function returns an option object. To use this feature, you need to construct and return some JSX using the below param

```jsx static noeditor
{
    value: option.value,
    text: option.text,
    name: The name prop you gave RRS
}
```

```jsx
import { Select, CaretIcon } from '../../react-responsive-select'; // 'react-responsive-select'

const Badge = ({ text }) => (
  <span>
    <span className="badge" aria-hidden="true">
      {text[0]}
    </span>
    <span> {text}</span>
  </span>
);

<form>
  <Select
    customLabelRenderer={selectedOption => <span>🎉 You selected 👉{selectedOption.text}</span>}
    name="make2"
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
    prefix="Make2: "
    selectedValue="fiat"
    onChange={newValue => console.log('onChange', newValue)}
    onSubmit={() => console.log('onSubmit')}
  />
</form>;
```
