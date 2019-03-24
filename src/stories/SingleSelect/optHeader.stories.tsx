// import { action } from '@storybook/addon-actions';
import { /* boolean, text, */withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { wInfo } from '../../utils/wInfo';
import { CaretIcon } from '../components/CaretIcon';

import '../../ReactResponsiveSelect.css';
import '../stories.css';

const stories = storiesOf('Single Select', module);
stories.addDecorator(withKnobs);

stories.add(
    'Option headers (option.optHeader)',
    wInfo()(() => (
        <ReactResponsiveSelect
            name="carType1"
            options={[
                { optHeader: true, text: 'Cars', value: null },
                { value: 'alfa-romeo', text: 'Alfa Romeo' },
                { value: 'bmw', text: 'BMW' },
                { value: 'fiat', text: 'Fiat' },
                { value: 'mazda', text: 'Mazda' },
                { value: 'subaru', text: 'Subaru' },
                { value: 'suzuki', text: 'Suzuki' },
                { value: 'tesla', text: 'Tesla' },
                { value: 'volvo', text: 'Volvo' },
                { value: 'zonda', text: 'Zonda' },
                { optHeader: true, text: 'Scooters', value: null },
                { value: 'honda', text: 'Honda' },
                { value: 'kimco', text: 'Kimco' },
                { value: 'lambretta', text: 'Lambretta' },
                { value: 'suzuki', text: 'Suzuki' },
                { value: 'sym', text: 'Sym' },
                { value: 'vespa', text: 'Vespa' },
            ]}
            onSubmit={(): void => {
                console.log('onSubmit');
            }}
            caretIcon={<CaretIcon />}
            prefix="Vehicle: "
            noSelectionLabel="Please select"
            selectedValue=""
            onChange={(): void => {
                console.log('onChange');
            }}
        />
    )),
);
