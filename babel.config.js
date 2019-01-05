module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo',"react-native", "module:metro-react-native-babel-preset",
     "module:react-native-dotenv"],
  };
};
