module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": true,
        "allowUndefined": true,
        "verbose": false
      }],
      'react-native-reanimated/plugin'
    ]
  };
};
