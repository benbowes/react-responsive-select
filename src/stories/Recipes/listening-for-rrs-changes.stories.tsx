import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../utils/withStoryBookInfo';
import { CaretIcon } from '../components/CaretIcon';

import '../../ReactResponsiveSelect.css';
import '../stories.css';
import './listening-for-rrs-changes.css';

let prevIsOpenValue;

function onListen(isOpen: boolean, name: string, actionType: string): void {
  console.log(`
    isOpen: ${isOpen}
    name: ${name}
    type: ${actionType}
  `);

  if (isOpen && prevIsOpenValue !== isOpen) {
    document.body.classList.add('no-scroll-y');
    prevIsOpenValue = isOpen;
  } else if (!isOpen && prevIsOpenValue !== isOpen) {
    document.body.classList.remove('no-scroll-y');
    prevIsOpenValue = isOpen;
  }
}

storiesOf('Recipes', module).add(
  `Listening for RRS changes with the "report" prop - check console output & body class`,
  withStoryBookInfo()(() => (
      <ReactResponsiveSelect
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
        onSubmit={(): void => {
          console.log('onSubmit');
        }}
        caretIcon={<CaretIcon />}
        prefix="Car1: "
        selectedValue="subaru"
      />
  )),
);
