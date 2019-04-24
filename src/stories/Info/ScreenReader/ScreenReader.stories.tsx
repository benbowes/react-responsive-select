import { storiesOf } from '@storybook/react';
import * as React from 'react';

const stories = storiesOf('Info', module);

stories.add(
    'Screen Reader Demo',
    () => (
        <>
            <h2>SCREEN READER DEMO</h2>
            <img src="/react-responsive-select-voice-over.gif" alt="Screen reader demo gif" />
        </>
    ),
);
