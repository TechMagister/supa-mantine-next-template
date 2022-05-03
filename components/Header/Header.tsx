import React, { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Divider,
  Burger,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import {
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  PlayerPause,
  Trash,
  SwitchHorizontal,
  ChevronDown,
} from 'tabler-icons-react';
import { MantineLogo } from '../../shared/MantineLogo';

import useStyles from './Header.styles';

interface HeaderTabsProps {
  user: { name: string; image: string };
}

export default function Header({ user }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <MantineLogo />

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />

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
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.name}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            }
          >
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
            <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

            <Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<PlayerPause size={14} />}>Pause subscription</Menu.Item>
            <Menu.Item color="red" icon={<Trash size={14} />}>
              Delete account
            </Menu.Item>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}
