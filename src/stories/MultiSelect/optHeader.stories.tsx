import { /*boolean, text, */withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { wInfo } from '../../utils/wInfo';
import { CaretIcon } from '../components/CaretIcon';
import { MultiSelectOptionMarkup } from '../components/MultiSelectOptionMarkup';

import '../../ReactResponsiveSelect.css';
import '../stories.css';

const stories = storiesOf('Multi Select', module);
stories.addDecorator(withKnobs);

stories.add(
    'optHeader',
    wInfo()(() => (
        <ReactResponsiveSelect
            multiselect={true}
            name="make6"
            selectedValues={['fiat']}
            options={[
                {
                    value: 'any',
                    text: 'Any',
                    markup: MultiSelectOptionMarkup('Any'),
                },
                {
                    text: 'Cheap',
                    optHeader: true,
                    value: null,
                },
                {
                    value: 'fiat',
                    text: 'Fiat',
                    markup: MultiSelectOptionMarkup('Fiat'),
                },
                {
                    value: 'subaru',
                    text: 'Subaru',
                    markup: MultiSelectOptionMarkup('Subaru'),
                },
                {
                    value: 'suzuki',
                    text: 'Suzuki',
                    markup: MultiSelectOptionMarkup('Suzuki'),
                },
                {
                    text: 'Expensive',
                    value: null,
                    optHeader: true,
                },
                {
                    value: 'bmw',
                    text: 'BMW',
                    markup: MultiSelectOptionMarkup('BMW'),
                },
                {
                    value: 'ferrari',
                    text: 'Ferrari',
                    markup: MultiSelectOptionMarkup('Ferrari'),
                },
                {
                    value: 'mercedes',
                    text: 'Mercedes',
                    markup: MultiSelectOptionMarkup('Mercedes'),
                },
                {
                    value: 'tesla',
                    text: 'Tesla',
                    markup: MultiSelectOptionMarkup('Tesla'),
                },
                {
                    value: 'volvo',
                    text: 'Volvo',
                    markup: MultiSelectOptionMarkup('Volvo'),
                },
                {
                    value: 'zonda',
                    text: 'Zonda',
                    markup: MultiSelectOptionMarkup('Zonda'),
                },
            ]}
            onSubmit={(): void => {
                console.log('Handle form submit here');
            }}
            caretIcon={<CaretIcon />}
            onChange={(newValue: any): void => {
                console.log(newValue);
            }}
        />
    )),
);
