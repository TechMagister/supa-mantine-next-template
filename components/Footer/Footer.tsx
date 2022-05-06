import React from 'react';

import { useTranslation } from 'next-i18next';

import { ActionIcon, Container, Group, Text } from '@mantine/core';

import { BrandInstagram, BrandTwitter, BrandYoutube } from 'tabler-icons-react';

import { Logo } from '../../shared/Logo';
import config from '../../shared/config';
import useStyles from './Footer.styles';

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

export default function Footer({ data }: FooterLinksProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
          <Text size="xs" color="dimmed" className={classes.description}>
            {t('footer.phrase')}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 {config.BRAND}. {t('footer.allRightReserved')}
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
