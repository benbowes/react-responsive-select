Using ReactResponsiveSelect with Formik

```jsx
import { Select, CaretIcon, ErrorIcon, MultiSelectOptionMarkup } from '../../react-responsive-select'; // 'react-responsive-select'
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  car: 'lexus',
  bikes: ['bmw'],
};

const validationSchema = Yup.object().shape({
  car: Yup.mixed().notOneOf(['null'], 'Please select a car'),
  bikes: Yup.mixed().test({
    name: 'something-other-than-any-selected',
    message: 'Please select a bike',
    test: value => value.indexOf('null') === -1,
  }),
});

const FormikForm = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 1000);
    }}
  >
    {formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <p>Trigger an error by selecting "Any"</p>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 50%' }}>
            <p>Single Select</p>

            <FormikSingleSelect
              formikProps={formikProps}
              name="car"
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
          </div>

          <div style={{ flex: '1 1 50%' }}>
            <p>Multi Select</p>

            <FormikMultiSelect
              formikProps={formikProps}
              name="bikes"
              options={[
                { value: 'null', text: 'Any', markup: <MultiSelectOptionMarkup text="Any" /> },
                { value: 'bmw', text: 'BMW', markup: <MultiSelectOptionMarkup text="BMW" /> },
                { value: 'honda', text: 'Honda', markup: <MultiSelectOptionMarkup text="Honda" /> },
                { value: 'suzuki', text: 'Suzuki', markup: <MultiSelectOptionMarkup text="Suzuki" /> },
                { value: 'vespa', text: 'Vespa', markup: <MultiSelectOptionMarkup text="Vespa" /> },
              ]}
            />
          </div>
        </div>

        <div>
          <br />
          <button
            type="button"
            className="outline"
            onClick={formikProps.handleReset}
            disabled={formikProps.isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={formikProps.isSubmitting}>
            {formikProps.isSubmitting ? '...' : 'Submit'}
          </button>
        </div>
      </form>
    )}
  </Formik>
);

const FormikSingleSelect = ({ formikProps, name, options, ...otherProps }) => (
  <>
    <Select
      name={name}
      selectedValue={formikProps.values[name]}
      caretIcon={<CaretIcon />}
      disabled={formikProps.isSubmitting}
      onSubmit={formikProps.handleSubmit}
      options={options}
      onChange={({ value, name }) => {
        formikProps.handleChange({ target: { value, name } });
      }}
      {...otherProps}
    />
    <CustomFormikError formikProps={formikProps} name={name} />
  </>
);

const FormikMultiSelect = ({ formikProps, name, options, ...otherProps }) => (
  <>
    <Select
      multiselect={true}
      name={name}
      selectedValues={formikProps.values[name]}
      caretIcon={<CaretIcon />}
      disabled={formikProps.isSubmitting}
      onSubmit={formikProps.handleSubmit}
      options={options}
      onChange={({ altered, options }) => {
        if (altered) {
          formikProps.handleChange({ target: { value: options.map(option => option.value), name } });
        }
      }}
      {...otherProps}
    />
    <CustomFormikError formikProps={formikProps} name={name} />
  </>
);

const CustomFormikError = ({ formikProps, name }) =>
  formikProps.errors[name] && formikProps.touched[name] ? (
    <div className="field-error-message">
      <ErrorIcon /> {formikProps.errors[name]}
    </div>
  ) : null;

<FormikForm />;
```
