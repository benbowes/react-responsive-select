const path = require('path');

module.exports = {
  title: 'React Responsive Select',
  theme: {
    sidebarWidth: 280,
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper.tsx'),
  },
  pagePerSection: true,
  exampleMode: 'expand',
  sections: [
    {
      name: 'React-Responsive-Select',
      content: 'src/docs/home.md',
    },
    {
      name: 'API',
      content: 'src/docs/api.md',
    },
    {
      name: 'Screen reader demo',
      content: 'src/docs/screen-reader-demo.md',
    },
    {
      name: 'Single Select',
      pagePerSection: true,
      exampleMode: 'expand',
      sectionDepth: 1,
      sections: [
        {
          name: 'Basic',
          content: 'src/docs/singleselect/basic.md',
        },
        {
          name: 'Disabled',
          content: 'src/docs/singleselect/disabled.md',
        },
        {
          name: 'option.markup',
          content: 'src/docs/singleselect/option-markup.md',
        },
        {
          name: 'option.optHeader',
          content: 'src/docs/singleselect/optHeader.md',
        },
        {
          name: 'customLabelRenderer',
          content: 'src/docs/singleselect/customLabelRenderer.md',
        },
        {
          name: 'noSelectionLabel',
          content: 'src/docs/singleselect/noSelectionLabel.md',
        },
      ],
    },
    {
      name: 'Multi Select',
      pagePerSection: true,
      sectionDepth: 1,
      sections: [
        {
          name: 'Basic',
          content: 'src/docs/multiselect/basic.md',
        },
        {
          name: 'Disabled',
          content: 'src/docs/multiselect/disabled.md',
        },
        {
          name: 'noSelectionLabel',
          content: 'src/docs/multiselect/noSelectionLabel.md',
        },
        {
          name: 'option.optHeader',
          content: 'src/docs/multiselect/optHeader.md',
        },
      ],
    },
    {
      name: 'Recipes',
      pagePerSection: true,
      sectionDepth: 1,
      sections: [
        {
          name: 'Controlled example 1',
          content: 'src/docs/recipes/controlled-example-1.md',
        },
        {
          name: 'Controlled example 2',
          content: 'src/docs/recipes/controlled-example-2.md',
        },
        {
          name: 'Formik example',
          content: 'src/docs/recipes/formik.md',
        },
        {
          name: 'Listening for changes',
          content: 'src/docs/recipes/onListen.md',
        },
      ],
    },
  ],
  // Custom webpack - only for Styleguidist
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.styleguidist.json' },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
};
