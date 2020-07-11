Listening for RRS changes with the "onListen" prop. This example blocks body scolling on small screen when options are open

```jsx
import { Select, CaretIcon } from '../../react-responsive-select'; // 'react-responsive-select'

let prevIsOpenValue;

function onListen(isOpen, name, actionType) {
  if (isOpen && prevIsOpenValue !== isOpen) {
    document.body.classList.add('no-scroll-y');
    prevIsOpenValue = isOpen;
  } else if (!isOpen && prevIsOpenValue !== isOpen) {
    document.body.classList.remove('no-scroll-y');
    prevIsOpenValue = isOpen;
  }
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
    prefix="Car1: "
    selectedValue="subaru"
  />
</form>;
```
