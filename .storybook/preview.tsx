import { useDarkMode } from 'storybook-dark-mode';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Suspense } from 'react';

export const parameters = { layout: 'fullscreen' };

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
