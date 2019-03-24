const path = require("path");

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../.storybook")
    ],
    use: [
      require.resolve("cache-loader"),
      {
        loader: require.resolve("ts-loader"),
        options: {
          reportFiles: ["../src"]
        }
      },
      require.resolve("react-docgen-typescript-loader"),
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};

// config.module.rules.push({
//   test: /\.(ts|tsx)$/,
//   loader: require.resolve('babel-loader'),
//   options: {
//     presets: [['react-app', { flow: false, typescript: true }]],
//   },
// });
// config.resolve.extensions.push('.ts', '.tsx');
// return config;