import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../utils/withStoryBookInfo';
import { CaretIcon } from '../components/Icons';

import '../../ReactResponsiveSelect.css';
import '../stories.css';

const stories = storiesOf('Single Select', module);

stories.add(
    'Option headers (option.optHeader)',
    withStoryBookInfo()(() => (
        <form>
            <ReactResponsiveSelect
                name="carType1"
                options={[
                    { value: 'any', text: 'Any' },
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
        </form>
    )),
);
