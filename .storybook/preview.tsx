import { Suspense } from 'react';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { I18nextProvider } from 'react-i18next';
import { useDarkMode } from 'storybook-dark-mode';

import i18n from './i18n';

//export const parameters = { layout: 'fullscreen' };

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
};

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <I18nextProvider i18n={i18n}>
        <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
          <MantineProvider
            theme={{ colorScheme: useDarkMode() ? 'dark' : 'light' }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>{props.children}</NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </I18nextProvider>
    </Suspense>
  );
}

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
