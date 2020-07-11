Using ReactResponsiveSelect with Formik

```jsx
import { Select, CaretIcon, ErrorIcon, MultiSelectOptionMarkup } from '../../react-responsive-select'; // 'react-responsive-select'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

<Formik
  initialValues={{
    car: 'lexus',
    bikes: ['bmw'],
  }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    }, 2000);
  }}
  validationSchema={Yup.object().shape({
    car: Yup.mixed().notOneOf(['null'], 'Please select a car'),
    bikes: Yup.mixed().test({
      name: 'something-other-than-any-selected',
      message: 'Please select a bike',
      test: value => value.indexOf('null') === -1,
    }),
  })}
>
  {formikProps => (
    <form onSubmit={formikProps.handleSubmit}>
      <p>Trigger an error by selecting "Any"</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{ flex: '1 1 50%' }}
          className={formikProps.errors.car && formikProps.touched.car ? 'has-error' : ''}
        >
          <p>Single Select</p>
          <Select
            name="car"
            selectedValue={formikProps.values.car}
            caretIcon={<CaretIcon />}
            disabled={formikProps.isSubmitting}
            onSubmit={formikProps.handleSubmit}
            onChange={({ value, name }) => {
              formikProps.handleChange({ target: { value, name } });
            }}
            options={[
              { value: 'null', text: 'Any' },
              { value: 'alfa-romeo', text: 'Alfa Romeo' },
              { value: 'bmw', text: 'BMW' },
              { value: 'fiat', text: 'Fiat' },
              { value: 'lexus', text: 'Lexus' },
              { value: 'morgan', text: 'Morgan' },
              { value: 'subaru', text: 'Subaru' },
            ]}
          />
          {formikProps.errors.car && formikProps.touched.car && (
            <div className="field-error-message">
              <ErrorIcon /> {formikProps.errors.car}
            </div>
          )}
        </div>

        <div
          style={{ flex: '1 1 50%' }}
          className={formikProps.errors.bikes && formikProps.touched.bikes ? 'has-error' : ''}
        >
          <p>Multi Select</p>
          <Select
            multiselect={true}
            name="bikes"
            selectedValues={formikProps.values.bikes}
            caretIcon={<CaretIcon />}
            disabled={formikProps.isSubmitting}
            onSubmit={formikProps.handleSubmit}
            onChange={({ altered, options }) => {
              if (altered) {
                formikProps.handleChange({ target: { value: options.map(option => option.value), name: 'bikes' } });
              }
            }}
            options={[
              {
                value: 'null',
                text: 'Any',
                markup: <MultiSelectOptionMarkup text="Any" />,
              },
              {
                value: 'bmw',
                text: 'BMW',
                markup: <MultiSelectOptionMarkup text="BMW" />,
              },
              {
                value: 'honda',
                text: 'Honda',
                markup: <MultiSelectOptionMarkup text="Honda" />,
              },
              {
                value: 'motoguzzi',
                text: 'Moto Guzzi',
                markup: <MultiSelectOptionMarkup text="Moto Guzzi" />,
              },
              {
                value: 'suzuki',
                text: 'Suzuki',
                markup: <MultiSelectOptionMarkup text="Suzuki" />,
              },
              {
                value: 'vespa',
                text: 'Vespa',
                markup: <MultiSelectOptionMarkup text="Vespa" />,
              },
            ]}
          />
          {formikProps.errors.bikes && formikProps.touched.bikes && (
            <div className="field-error-message">
              <ErrorIcon /> {formikProps.errors.bikes}
            </div>
          )}
        </div>
      </div>

      <br />

      <div>
        <button type="button" className="outline" onClick={formikProps.handleReset} disabled={formikProps.isSubmitting}>
          Reset
        </button>

        <button type="submit" disabled={formikProps.isSubmitting}>
          {formikProps.isSubmitting ? '...' : 'Submit'}
        </button>
      </div>
    </form>
  )}
</Formik>;
```
