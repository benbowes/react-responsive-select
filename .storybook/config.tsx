import { addParameters, configure } from '@storybook/react';

// Global configuration
addParameters({
  options: {
    panelPosition: 'right',
    name: 'React Responsive Select',
    url: '/',
    showPanel: false,
    isToolshown: false,
  },
});

function loadStories(): void {
  // Info
  require('../src/stories/Home/home.stories.tsx');

  // SingleSelect
  require('../src/stories/SingleSelect/basic.stories.tsx');
  require('../src/stories/SingleSelect/option-markup.stories.tsx');
  require('../src/stories/SingleSelect/noSelectionLabel.stories.tsx');
  require('../src/stories/SingleSelect/optHeader.stories.tsx');
  require('../src/stories/SingleSelect/customLabelRenderer.stories.tsx');

  // MultiSelect
  require('../src/stories/MultiSelect/noSelectionLabel-w-optHeader.stories.tsx');
  require('../src/stories/MultiSelect/optHeader.stories.tsx');

  // Controlled
  require('../src/stories/Controlled/Controlled.stories.tsx');
}

configure(loadStories, module);
