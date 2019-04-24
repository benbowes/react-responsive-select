import { withInfo } from '@storybook/addon-info';

export const withStoryBookInfo = (text?: string): any => (
  withInfo({
    inline: true,
    source: true,
    text,
  })
);
