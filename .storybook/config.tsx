import { setOptions } from '@storybook/addon-options';
import { configure } from '@storybook/react';

/*

  Global configuration

*/

setOptions({
  addonPanelInRight: true,
  name: 'React Responsive Select',
});

// function loadStories(): void {
//   const requireContext = require.context('../src/stories', true, /.stories.tsx$/);
//   requireContext.keys().forEach((filename: string) => requireContext(filename));
// }

// configure((loadStories), module);

// automatically import all files ending in *.stories.tsx
const req = require.context('../src/stories', true, /\.stories\.tsx$/);

function loadStories(): void {
  req.keys().forEach(req);
}

configure(loadStories, module);