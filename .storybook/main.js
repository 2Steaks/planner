/** @format */

const path = require('path');
  
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register'
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: ['react-require'],
            presets: [['react-app', { flow: false, typescript: true }]],
          }
        }
      ]
    });

    config.resolve.alias = {
      '@project': path.join(__dirname, '../src')
    };
    config.resolve.modules = [...config.resolve.modules, 'src'];
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }
};
