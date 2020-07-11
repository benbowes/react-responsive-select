Selecting something in the first select will reset the second select.

```jsx
import { Select, CaretIcon } from '../../react-responsive-select'; // 'react-responsive-select'

const DATA = [
  { year: 2000, quarters: [1, 2, 3, 4] },
  { year: 2001, quarters: [1, 2, 3] },
  { year: 2002, quarters: [2, 3] },
  { year: 2004, quarters: [1, 4] },
  { year: 2005, quarters: [1, 2, 3, 4] },
];

const ControlledExample = () => {
  const filteredYears = DATA.map(item => ({
    text: `${item.year}`,
    value: `${item.year}`,
  }));

  const extractQuarters = quarters =>
    quarters.map(quarter => ({
      text: `${quarter}`,
      value: `${quarter}`,
    }));

  const [years, setYears] = React.useState(filteredYears);

  const [quarters, setQuarters] = React.useState(extractQuarters(DATA[0].quarters));

  const [selectedYear, setSelectedYear] = React.useState(DATA[0].year.toString());

  const [selectedQuarter, setSelectedQuarter] = React.useState(DATA[0].quarters[0].toString());

  const onChangeYear = newValue => {
    const selectedYearDataFragment = DATA.find(item => item.year.toString() === newValue.value);

    setSelectedYear(newValue.value);
    setSelectedQuarter(selectedYearDataFragment.quarters[0].toString());
    setQuarters(extractQuarters(selectedYearDataFragment.quarters));
  };

  const onChangeQuarter = newValue => {
    setSelectedQuarter(newValue.value);
  };

  return (
    <form className="form">
      <div className="form__item">
        <label htmlFor="rrs-year-menu">Year</label>
        <Select
          selectedValue={selectedYear}
          name="year"
          options={years}
          onChange={onChangeYear}
          caretIcon={<CaretIcon />}
        />
      </div>
      <div className="form__item">
        <label htmlFor="rrs-year-menu">Financial quarter</label>
        <Select
          key={selectedYear} // Added key, will reset this RRS when selectedYear changes
          selectedValue={selectedQuarter}
          name="quarters"
          options={quarters}
          onChange={onChangeQuarter}
          caretIcon={<CaretIcon />}
        />
      </div>
    </form>
  );
};

<ControlledExample />;
```
