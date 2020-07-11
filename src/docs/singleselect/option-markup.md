`option.markup` allows you to add JSX into your options. In the below example, there are badges - any JSX will do.

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
