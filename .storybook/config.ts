import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

// Global configuration
addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'React Responsive Select',
      brandUrl: 'https://github.com/benbowes/react-responsive-select',
      brandImage: null,
    }),
    panelPosition: 'right',
    showPanel: false,
    isToolshown: false,
    enableShortcuts: false,
  },
});

function loadStories(): void {
  // Info
  require('../src/stories/Info/Home/Home.stories.tsx');
  require('../src/stories/Info/ScreenReader/ScreenReader.stories.tsx');
  require('../src/stories/Info/API/API.stories.tsx');

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

  // Recipes
  require('../src/stories/Recipes/listening-for-rrs-changes.stories.tsx');
}

configure(loadStories, module);
