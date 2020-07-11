```jsx
import { Select, CaretIcon, MultiSelectOptionMarkup, ModalCloseButton } from '../../react-responsive-select'; // 'react-responsive-select'

<form>
  <Select
    multiselect={true}
    name="make6"
    selectedValues={['fiat']}
    modalCloseButton={<ModalCloseButton />}
    options={[
      {
        value: 'any',
        text: 'Any',
        markup: <MultiSelectOptionMarkup text="Any" />,
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
    caretIcon={<CaretIcon />}
    onChange={newValue => console.log(newValue)}
    onSubmit={() => console.log('onSubmit')}
  />
</form>;
```
