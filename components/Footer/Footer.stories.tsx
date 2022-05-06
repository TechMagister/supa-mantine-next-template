import { ComponentStory } from '@storybook/react';

import Footer from './Footer';

export default {
  title: 'Footer',
  component: Footer,
};

export const Base: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;
Base.args = {
  data: [
    {
      title: 'About',
      links: [
        {
          label: 'Features',
          link: '#',
        },
        {
          label: 'Pricing',
          link: '#',
        },
        {
          label: 'Support',
          link: '#',
        },
        {
          label: 'Forums',
          link: '#',
        },
      ],
    },
    {
      title: 'Project',
      links: [
        {
          label: 'Contribute',
          link: '#',
        },
        {
          label: 'Media assets',
          link: '#',
        },
        {
          label: 'Changelog',
          link: '#',
        },
        {
          label: 'Releases',
          link: '#',
        },
      ],
    },
    {
      title: 'Community',
      links: [
        {
          label: 'Join Discord',
          link: '#',
        },
        {
          label: 'Follow on Twitter',
          link: '#',
        },
        {
          label: 'Email newsletter',
          link: '#',
        },
        {
          label: 'GitHub discussions',
          link: '#',
        },
      ],
    },
  ],
};
