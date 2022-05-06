import { ComponentStory } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
};
export const Primary: ComponentStory<typeof Header> = (args) => <Header {...args} />;
Primary.args = {
  user: { email: 'test@mail.en' },
};
