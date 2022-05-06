import { GetServerSideProps, NextPage } from 'next';
import { Container, LoadingOverlay, Title } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import RegisterForm, { RegisterFormEntity } from '../../components/RegisterForm/RegisterForm';

async function signUp({ email, password }: { email: string; password: string }) {
  const { user, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  return { user, error };
}

function onGotoLogin() {}

const RegisterPage: NextPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const onSubmit = async ({ email, password }: RegisterFormEntity) => {
    try {
      setIsLoading(true);
      const { error } = await signUp({ email, password });
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      if (error) throw error;
      else {
        setIsRegistered(true);
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        // @ts-ignore
        message: error.error_description || error.message,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm">
      <LoadingOverlay visible={isLoading} />
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        {t('login.register')}
      </Title>
      {isRegistered ? (
        t('login.accountCreated')
      ) : (
        <RegisterForm onRegister={onSubmit} onGoToLogin={onGotoLogin} mt={30} />
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default RegisterPage;
