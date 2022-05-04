import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, Container } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getUser, supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useRouter } from 'next/router';
import { User } from '@supabase/supabase-js';

import { UserProvider } from '../components/UserProvider';
import HeaderContainer from '../containers/HeaderContainer';

export default function App(props: AppProps & { colorScheme: ColorScheme; user?: User }) {
  const { Component, pageProps, user } = props;
  const { pathname } = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <UserProvider supabaseClient={supabaseClient} pathname={pathname} user={user}>
              <HeaderContainer />
              <Container>
                <Component {...pageProps} />
              </Container>
            </UserProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  const { user } = await getUser(ctx);
  return {
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
    user,
  };
};
