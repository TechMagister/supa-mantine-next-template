import { useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import { LoadingOverlay, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import LoginForm, { LoginFormEntity } from '../components/LoginForm';
import { useUser } from '../components/UserProvider';
import routes from '../shared/routes';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
  const { user } = useUser();
  const { t } = useTranslation('common');
  const [isLoading, setLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const router = useRouter();

  const onSubmit = async ({ email }: LoginFormEntity) => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signIn({ email });
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      if (error) throw error;
      setIsModalOpened(true);
    } catch (error) {
      showNotification({
        title: 'Error',
        // @ts-ignore
        message: error.error_description || error.message,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Modal opened={isModalOpened} onClose={() => setIsModalOpened(false)}>
          {t('login.magicLink.postLoginModal')}
        </Modal>
        <LoadingOverlay visible={isLoading} />
        <LoginForm onSubmit={onSubmit} />
      </>
    );
  }

  return (
    (user && (
      <>
        <button type="button" onClick={() => router.replace(routes.LOGOUT)}>
          {t('login.signOut')}
        </button>
        <p>user:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </>
    )) || <></>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default HomePage;
