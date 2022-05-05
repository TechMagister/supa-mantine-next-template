import { ComponentStory } from '@storybook/react';
import RegisterForm from './RegisterForm';

export default {
  title: 'RegisterForm',
  component: RegisterForm,
};

export const Base: ComponentStory<typeof RegisterForm> = (args) => <RegisterForm {...args} />;
