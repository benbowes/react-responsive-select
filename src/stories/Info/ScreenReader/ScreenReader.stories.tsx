import { storiesOf } from '@storybook/react';
import * as React from 'react';

const stories = storiesOf('Info', module);

stories.add(
    'Screen reader demo',
    () => (
        <>
            <h1>Screen Reader Demo</h1>
            <video width="100%" controls={true}>
                <source src="http://media2.giphy.com/media/FiGiRei2ICzzG/giphy.webp" type="video/webp" />
                <source src="https://media.giphy.com/media/WoWhYjqxdOu8TJdegw/giphy.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    ),
);
