import {StrictMode, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getUser, supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-js';

import { ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { getCookie, setCookies } from 'cookies-next';

import Footer from '../components/Footer/Footer';
import { UserProvider } from '../components/UserProvider';
import HeaderContainer from '../containers/HeaderContainer';
import {TITLE} from "../shared/config";

function MyApp(props: AppProps & { colorScheme: ColorScheme; user?: User }) {
  const { Component, pageProps, user } = props;
  const { pathname } = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <StrictMode>
      <Head>
        <title>{TITLE}</title>
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
              <Footer data={[]} />
            </UserProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </StrictMode>
  );
}

MyApp.getServerSideProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  const { user } = await getUser(ctx);
  return {
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
    user,
  };
};

export default appWithTranslation(MyApp);
