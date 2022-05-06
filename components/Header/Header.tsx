import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { Avatar, Burger, Container, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { NextLink } from '@mantine/next';

import { ChevronDown, Logout } from 'tabler-icons-react';

import { Logo } from '../../shared/Logo';
import routes from '../../shared/routes';
import useStyles from './Header.styles';

interface HeaderTabsProps {
  user: { email?: string };
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderTabsProps) {
  const { t } = useTranslation('common');
  const { classes, cx } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <NextLink href={routes.HOME} title={t('global.home')}>
            <Logo />
          </NextLink>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />

          {user && (
            <Menu
              size={260}
              placement="end"
              transition="pop-top-right"
              className={classes.userMenu}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              control={
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group spacing={7}>
                    <Avatar src={null} alt={user.email} radius="xl" size={20} />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.email}
                    </Text>
                    <ChevronDown size={12} />
                  </Group>
                </UnstyledButton>
              }
            >
              {/*
                <Menu.Item icon={<Heart size={14} color={theme.colors.red[6]} />}>
                Liked posts
              </Menu.Item>
              <Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />}>
                Saved posts
              </Menu.Item>
              <Menu.Item icon={<Message size={14} color={theme.colors.blue[6]} />}>
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
              <Menu.Item icon={<SwitchHorizontal size={14} />}>Change account</Menu.Item>
            */}
              <Menu.Item icon={<Logout size={14} />} onClick={onLogout}>
                {t('login.signOut')}
              </Menu.Item>

              {/*<Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<PlayerPause size={14} />}>Pause subscription</Menu.Item>
              <Menu.Item color="red" icon={<Trash size={14} />}>
                Delete account
            </Menu.Item>*/}
            </Menu>
          )}
        </Group>
      </Container>
    </div>
  );
}
