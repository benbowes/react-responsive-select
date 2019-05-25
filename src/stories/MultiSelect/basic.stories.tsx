import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ReactResponsiveSelect from '../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../utils/withStoryBookInfo';
import { CaretIcon } from '../components/CaretIcon';
import { MultiSelectOptionMarkup } from '../components/MultiSelectOptionMarkup';

import '../../ReactResponsiveSelect.css';
import '../stories.css';

const stories = storiesOf('Multi Select', module);

stories.add(
    'Basic',
    withStoryBookInfo()(() => (
        <form>
            <ReactResponsiveSelect
                multiselect={true}
                name="make6"
                selectedValues={['fiat']}
                options={[
                    {
                        value: 'any',
                        text: 'Any',
                        markup: <MultiSelectOptionMarkup text="Any" />,
                    },
                    {
                        value: 'fiat',
                        text: 'Fiat',
                        markup: <MultiSelectOptionMarkup text="Fiat" />,
                    },
                    {
                        value: 'subaru',
                        text: 'Subaru',
                        markup: <MultiSelectOptionMarkup text="Subaru" />,
                    },
                    {
                        value: 'suzuki',
                        text: 'Suzuki',
                        markup: <MultiSelectOptionMarkup text="Suzuki" />,
                    },
                    {
                        value: 'bmw',
                        text: 'BMW',
                        markup: <MultiSelectOptionMarkup text="BMW" />,
                    },
                    {
                        value: 'ferrari',
                        text: 'Ferrari',
                        markup: <MultiSelectOptionMarkup text="Ferrari" />,
                    },
                    {
                        value: 'mercedes',
                        text: 'Mercedes',
                        markup: <MultiSelectOptionMarkup text="Mercedes" />,
                    },
                    {
                        value: 'tesla',
                        text: 'Tesla',
                        markup: <MultiSelectOptionMarkup text="Tesla" />,
                    },
                    {
                        value: 'volvo',
                        text: 'Volvo',
                        markup: <MultiSelectOptionMarkup text="Volvo" />,
                    },
                    {
                        value: 'zonda',
                        text: 'Zonda',
                        markup: <MultiSelectOptionMarkup text="Zonda" />,
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
        </form>
    )),
);
