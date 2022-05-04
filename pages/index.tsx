import { LoadingOverlay, Modal } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { useUser } from '../components/UserProvider';
import LoginForm, { LoginFormEntity } from '../components/LoginForm';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
  const { user } = useUser();
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
          Check your email for the login link!
        </Modal>
        <LoadingOverlay visible={isLoading} />
        <LoginForm onSubmit={onSubmit} />
      </>
    );
  }

  return (
    (user && (
      <>
        <button type="button" onClick={() => router.replace('/api/auth/logout')}>
          Sign out
        </button>
        <p>user:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </>
    )) || <></>
  );
};

export default HomePage;
