const { createDefaultConfig } = require("@open-wc/testing-karma");
const merge = require("deepmerge");

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      frameworks: ["mocha", "chai"],
      client: {
        mocha: { ui: "tdd" },
      },
      files: [
        {
          pattern: config.grep ? config.grep : "src/Test/Home_test.js",
          type: "module",
        },
      ],
      reporters: ["progress"],
      port: 9876, // karma web server port
      colors: true,
      logLevel: config.LOG_INFO,
      browsers: [
        "ChromeHeadless",
      ],
      autoWatch: false,
      concurrency: Infinity,
      // See the karma-esm docs for all options
      esm: {
        nodeResolve: true,
      },
    })
  );
  return config;
};
