Use `optHeader` in an option to create a visual grouping of options

```jsx
import { Select, CaretIcon } from '../../react-responsive-select'; // 'react-responsive-select'

<form>
  <Select
    name="carType1"
    options={[
      { value: 'any', text: 'Any' },
      { optHeader: true, text: 'Cars' },
      { value: 'alfa-romeo', text: 'Alfa Romeo' },
      { value: 'bmw', text: 'BMW' },
      { value: 'fiat', text: 'Fiat' },
      { value: 'mazda', text: 'Mazda' },
      { value: 'subaru', text: 'Subaru' },
      { value: 'suzuki', text: 'Suzuki' },
      { value: 'tesla', text: 'Tesla' },
      { value: 'volvo', text: 'Volvo' },
      { value: 'zonda', text: 'Zonda' },
      { optHeader: true, text: 'Scooters' },
      { value: 'honda', text: 'Honda' },
      { value: 'kimco', text: 'Kimco' },
      { value: 'lambretta', text: 'Lambretta' },
      { value: 'suzuki', text: 'Suzuki' },
      { value: 'sym', text: 'Sym' },
      { value: 'vespa', text: 'Vespa' },
    ]}
    caretIcon={<CaretIcon />}
    prefix="Vehicle: "
    noSelectionLabel="Please select"
    selectedValue=""
    onChange={newValue => console.log('onChange', newValue)}
    onSubmit={() => console.log('onSubmit')}
  />
</form>;
```
