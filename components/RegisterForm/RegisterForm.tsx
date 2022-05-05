﻿import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Anchor, Button, Group, Paper, PasswordInput, TextInput } from '@mantine/core';
import { registerFormSchema } from '../../shared/schema/registerForm';

interface RegisterFormProps {
  onSubmit: (form: RegisterFormEntity) => Promise<void>;
  onGoToLogin: () => void;
}

export interface RegisterFormEntity {
  email: string;
  password: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, onGoToLogin }) => {
  const { t } = useTranslation('common');
  const form = useForm<RegisterFormEntity>({
    initialValues: {
      email: '',
      password: '',
    },
    schema: zodResolver(registerFormSchema),
  });
  return (
    <Paper radius="md" p="xl" withBorder>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          required
          label={t('login.fields.email.label')}
          placeholder={t('login.fields.email.placeholder')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          required
          label={t('login.fields.password.label')}
          placeholder={t('login.fields.password.placeholder')}
          {...form.getInputProps('password')}
        />
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => onGoToLogin()}
            size="xs"
          >
            {t('login.alreadyHaveAccount')}
          </Anchor>
          <Button type="submit">{t('login.register')}</Button>
        </Group>
      </form>
    </Paper>
  );
};
export default RegisterForm;