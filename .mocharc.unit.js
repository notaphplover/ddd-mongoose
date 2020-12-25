const baseMochaConfig = require('./.mocharc');

const mochaConfig = {
  ...baseMochaConfig,
  spec: 'src/**/test/unit/**/*.spec.ts',
};

module.exports = mochaConfig;
