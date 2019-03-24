import { withInfo } from '@storybook/addon-info';

const wInfoStyle = {};

export const wInfo = (text?: string): any => (
  withInfo({
    inline: true,
    source: true,
    styles: wInfoStyle,
    text,
  })
);
