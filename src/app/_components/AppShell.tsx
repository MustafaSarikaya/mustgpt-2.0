'use client'
import { AppShell, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from 'react-feather';
import Header from './Header'
import BlogNavbar from './BlogNavbar'

export default function CollapsibleShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle: toggleOpened }] = useDisclosure();

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
        </Group>
        <BlogNavbar />
      </AppShell.Navbar>
      <AppShell.Main p={0}>
        <Header opened={opened} toggleOpened={toggleOpened} />
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
