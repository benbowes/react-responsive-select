Use `noSelectionLabel` to set the default text. By default the firt option is selected when `noSelectionLabel` is not present.

```jsx
import { Select, CaretIcon, MultiSelectOptionMarkup } from '../../react-responsive-select'; // 'react-responsive-select'

<form>
  <Select
    multiselect={true}
    name="make6"
    selectedValues={[]}
    noSelectionLabel="Please select"
    caretIcon={<CaretIcon />}
    onChange={newValue => console.log(newValue)}
    onSubmit={() => console.log('onSubmit')}
    options={[
      { text: 'Cheap', optHeader: true, value: '' },
      {
        value: 'alfa-romeo',
        text: 'Alfa Romeo',
        markup: <MultiSelectOptionMarkup text="Alfa Romeo" />,
      },
      {
        value: 'fiat',
        text: 'Fiat',
        markup: <MultiSelectOptionMarkup text="Fiat" />,
      },
      {
        value: 'subaru',
        text: 'Subaru',
        markup: <MultiSelectOptionMarkup text="Subaru" />,
      },
      {
        value: 'suzuki',
        text: 'Suzuki',
        markup: <MultiSelectOptionMarkup text="Suzuki" />,
      },
      { text: 'Expensive', value: null, optHeader: true },
      {
        value: 'bmw',
        text: 'BMW',
        markup: <MultiSelectOptionMarkup text="BMW" />,
      },
      {
        value: 'ferrari',
        text: 'Ferrari',
        markup: <MultiSelectOptionMarkup text="Ferrari" />,
      },
      {
        value: 'mercedes',
        text: 'Mercedes',
        markup: <MultiSelectOptionMarkup text="Mercedes" />,
      },
      {
        value: 'tesla',
        text: 'Tesla',
        markup: <MultiSelectOptionMarkup text="Tesla" />,
      },
      {
        value: 'volvo',
        text: 'Volvo',
        markup: <MultiSelectOptionMarkup text="Volvo" />,
      },
      {
        value: 'zonda',
        text: 'Zonda',
        markup: <MultiSelectOptionMarkup text="Zonda" />,
      },
    ]}
  />
</form>;
```
