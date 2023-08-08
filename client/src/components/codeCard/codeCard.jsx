import React from 'react'
import "./codeCard.scss"
import { MantineProvider, Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid } from '@mantine/core';
// import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons';
import kebab from '../../assets/icons/kebab.svg'

const codeCard = () => {
  return (
    <div>
          <Card  shadow="sm" radius="md" >
      <Card.Section  inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}></Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <img src={kebab} alt="" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item >Edit</Menu.Item>
              <Menu.Item color="red">
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Card.Section mt="sm" maw={260}>
        <Image  src="https://images.unsplash.com/photo-1579263477001-7a703f1974e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" />
      </Card.Section>
      
      <Text mt="sm" color="#306BFF" size="m">
          Fibonacci.js
      </Text>

      <Card.Section inheritPadding mt="sm" pb="md">
      <Group position="apart">
      <Text fz="xs" weight={500}>Edited: today</Text>
      <Text fz="xs" weight={500}>Created at: 22/03/2023</Text>
      </Group>
      </Card.Section>
    </Card>
    </div>
  )
}

export default codeCard