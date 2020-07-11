```jsx
import { Select, CaretIcon, ModalCloseButton } from '../../react-responsive-select'; // 'react-responsive-select'

<form>
  <Select
    name="carType1"
    modalCloseButton={<ModalCloseButton />}
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
    selectedValue="subaru"
    onChange={newValue => console.log('onChange', newValue)}
    onSubmit={() => console.log('onSubmit')}
  />
</form>;
```
