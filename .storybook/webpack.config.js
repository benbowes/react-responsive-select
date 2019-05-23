const path = require("path");

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,

    include: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../.storybook")
    ],

    use: [
      {
        loader: require.resolve("cache-loader")
      },
      {
        loader: require.resolve("ts-loader"),
        options: { reportFiles: ["../src"] }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      },
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
