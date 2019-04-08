// import { action } from '@storybook/addon-actions';
// import { /* boolean, text, */withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { wInfo } from '../../utils/wInfo';
import { CaretIcon } from '../components/CaretIcon';

import '../../ReactResponsiveSelect.css';
import '../stories.css';

const stories = storiesOf('Single Select', module);
// stories.addDecorator(withKnobs);

stories.add(
  'Basic',
  wInfo()(() => (
    <ReactResponsiveSelect
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
      onSubmit={(): void => {
        console.log('onSubmit');
      }}
      caretIcon={<CaretIcon />}
      prefix="Car1: "
      selectedValue="subaru"
      onChange={(): void => {
        console.log('onChange');
      }}
    />
  )),
);
