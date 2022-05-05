import { Button, Container, Paper, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';

export interface LoginFormEntity {
  email?: string;
}

interface LoginFormProps {
  onSubmit: (form: LoginFormEntity) => Promise<void>;
}

const schema = z.object({
  email: z.string().email(),
});

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation('common');
  const form = useForm<LoginFormEntity>({
    initialValues: {
      email: '',
    },
    schema: zodResolver(schema),
  });
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        {t('login.welcome')}
      </Title>
      {/*
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
              Create account
            </Anchor>
          </Text>
        */}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onRegister={form.onSubmit(onSubmit)}>
          <TextInput
            label={t('login.fields.email.label')}
            placeholder={t('login.fields.email.placeholder')}
            required
            {...form.getInputProps('email')}
          />
          {/*<Group position="apart" mt="md">
            <Checkbox label="Remember me" />

              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>

          </Group>*/}
          <Button fullWidth mt="xl" type="submit">
            {t('login.signIn')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
