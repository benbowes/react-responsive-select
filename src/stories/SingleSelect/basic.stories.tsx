import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../utils/withStoryBookInfo';
import { CaretIcon } from '../components/CaretIcon';

import '../../ReactResponsiveSelect.css';
import '../stories.css';

const stories = storiesOf('Single Select', module);

stories.add(
  'Basic',
  withStoryBookInfo()(() => (
    <form>
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
    </form>
  )),
);
