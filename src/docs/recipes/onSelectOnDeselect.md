For a multi-select you can see what value changed via the function props:

`onSelect` and `onDeselect`

For a single-select you can see what value changed via the function prop:

`onSelect`

```jsx
import { Select, CaretIcon, MultiSelectOptionMarkup } from '../../react-responsive-select'; // 'react-responsive-select'

function onSelect(selectedValue) {
  console.log({ selectedValue });
}

function onDeselect(deselectedValue) {
  console.log({ deselectedValue });
}

<form>
  <Select
    onSelect={onSelect}
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
    onSubmit={() => console.log('onSubmit')}
    caretIcon={<CaretIcon />}
    selectedValue="subaru"
  />
  <Select
    multiselect={true}
    onSelect={onSelect}
    onDeselect={onDeselect}
    name="make6"
    selectedValues={['fiat']}
    options={[
      { value: 'any', text: 'Any', markup: <MultiSelectOptionMarkup text="Any" /> },
      { value: 'fiat', text: 'Fiat', markup: <MultiSelectOptionMarkup text="Fiat" /> },
      { value: 'subaru', text: 'Subaru', markup: <MultiSelectOptionMarkup text="Subaru" /> },
      { value: 'suzuki', text: 'Suzuki', markup: <MultiSelectOptionMarkup text="Suzuki" /> },
    ]}
    caretIcon={<CaretIcon />}
    onSubmit={() => console.log('onSubmit')}
  />
</form>;
```
