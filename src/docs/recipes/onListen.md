Listening for RRS changes with the "onListen" prop. This example blocks body scolling on small screen when options are open

```jsx
import { Select, CaretIcon, MultiSelectOptionMarkup } from '../../react-responsive-select'; // 'react-responsive-select'

let prevIsOpenValue;

function onListen(isOpen, name, actionType) {
  if (isOpen && prevIsOpenValue !== isOpen) {
    document.body.classList.add('no-scroll-y');
    prevIsOpenValue = isOpen;
  } else if (!isOpen && prevIsOpenValue !== isOpen) {
    document.body.classList.remove('no-scroll-y');
    prevIsOpenValue = isOpen;
  }

  console.log({ isOpen, name, actionType });
}

<form>
  <Select
    onListen={onListen}
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
    onListen={onListen}
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
