'use client'
import { AppShell, Group, Skeleton, Title, Text, ActionIcon, Avatar, Popover, Stack} from '@mantine/core';
import { useDisclosure, useHeadroom, useHover } from '@mantine/hooks';
import { GitHub, Linkedin, Twitter, Calendar, Sidebar, MoreVertical } from 'react-feather';
import Header  from './Header'
import Home from '../Home/page'

export default function CollapsibleShell() {
  const [opened, { toggle: toggleOpened }] = useDisclosure();
  const { hovered: avatarHovered, ref: avatarRef } = useHover();
  const { hovered: dropdownHovered, ref: dropdownRef } = useHover();

  return (
    <AppShell
      layout="alt"
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened} }}
      padding={{base: 0, sm: 'md'}}
    >
      <AppShell.Navbar p="md">
        <Group>
          {opened && (
            <ActionIcon variant="subtle" size="lg" onClick={toggleOpened}>
              <Sidebar size={24} color='black' />
            </ActionIcon>
          )}
          <Text>Navbar</Text>
        </Group>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Header   opened={opened} toggleOpened={toggleOpened} />
       
        <Home />
      </AppShell.Main>
    </AppShell>
  );
}
