'use client'
import { ActionIcon, Avatar, Group, Popover, Stack, Title } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { Calendar, GitHub, Linkedin, MoreVertical, Sidebar, Twitter } from "react-feather";

interface HeaderProps {
  opened: boolean;
  toggleOpened: () => void;
}

export default function Header({ opened, toggleOpened }: HeaderProps) {
  const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
      return (<Group h="100%" className='header' justify="space-between" m={{base:'xs', lg:'md'}}>
          <Group>
            {!opened && <ActionIcon variant="subtle" size="lg" onClick={toggleOpened}>
                <Sidebar size={24} color='black' />
              </ActionIcon>}
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Title>MustGPT</Title>
            </Link>
          </Group>
          <Group>
            <Group visibleFrom="sm">
              <ActionIcon variant="subtle" size="lg" component="a" href="https://github.com/mustafasarikaya" target="_blank" color='black'>
                <GitHub size={24} />
              </ActionIcon>
              <ActionIcon variant="subtle" size="lg" component="a" href="https://linkedin.com/in/mustafa-sarikaya" target="_blank" color='black'>
                <Linkedin size={24} />
              </ActionIcon>
              <ActionIcon variant="subtle" size="lg" component="a" href="https://twitter.com/mustafa_srkaya" target="_blank" color='black'>
                <Twitter size={24} />
              </ActionIcon>
            </Group>
            <Group hiddenFrom="sm">
              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <ActionIcon variant="subtle" size="lg" color='black'>
                    <MoreVertical size={24} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack align='center'>
                    <ActionIcon variant="subtle" size="lg" component="a" href="https://github.com/mustafasarikaya" target="_blank" color='black'>
                      <GitHub size={24} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg" component="a" href="https://linkedin.com/in/mustafa-sarikaya" target="_blank" color='black'>
                      <Linkedin size={24} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg" component="a" href="https://twitter.com/mustafa_srkaya" target="_blank" color='black'>
                      <Twitter size={24} />
                    </ActionIcon>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Popover width={300} position="bottom" withArrow shadow="md" opened={isAvatarPopoverOpen}>
              <Popover.Target>
                <Avatar
                  radius="xl"
                  size="md"
                  src="/profile-pic.jpeg"
                  className="cursor-pointer"
                  onClick={() => setIsAvatarPopoverOpen(!isAvatarPopoverOpen)}
                />
              </Popover.Target>
              <Popover.Dropdown onClick={() => setIsAvatarPopoverOpen(false)}>
                <div className="flex flex-col font-ropaSans-light text-md gap-y-5 mt-4">

                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-sm font-semibold">HOW TO USE</h2>
                    <h2>
                      Explore my projects and journey using{" "}
                      <span className="italic font-medium">Search</span>
                    </h2>
                    <h2>
                      Send me a message using{" "}
                      <span className="italic font-medium">Gmail</span>
                    </h2>
                    <h2>
                      View more of my work using the{" "}
                      <span className="italic font-medium">Dot-Menu</span>
                    </h2>
                    <h2 className="flex items-center gap-x-1">
                      Book a call using{" "}
                      <span className="italic flex items-center">
                        <Calendar size={18} />
                      </span>
                    </h2>
                  </div>
                </div>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Group>);
    }
  
  