Use `optHeader` in an option to create a visual grouping of options

```jsx
import { Select, CaretIcon, MultiSelectOptionMarkup } from '../../react-responsive-select'; // 'react-responsive-select'

<form>
  <Select
    multiselect={true}
    name="make6"
    noSelectionLabel="Please select"
    caretIcon={<CaretIcon />}
    onSubmit={() => console.log('Handle form submit here')}
    onChange={newValue => console.log(newValue)}
    options={[
      {
        value: 'any',
        text: 'Any',
        markup: <MultiSelectOptionMarkup text="Any" />,
      },
      {
        text: 'Cheap',
        optHeader: true,
        value: null,
      },
      {
        value: 'citroen',
        text: 'Citroen',
        markup: <MultiSelectOptionMarkup text="Citroen" />,
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
      {
        text: 'Expensive',
        value: null,
        optHeader: true,
      },
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
