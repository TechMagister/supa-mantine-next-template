module.exports = {
  staticDirs: ['../public'],
  stories: ['../**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    {
      name: 'storybook-addon-turbo-build',
      options: { optimizationLevel: 2 },
    },
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next',
    };
    return config;
  },
};
