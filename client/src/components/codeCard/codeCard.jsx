import React from 'react'
import "./codeCard.scss"
import { Card, Group, Text, Menu, ActionIcon, Image, Center } from '@mantine/core';
import kebab from '../../assets/icons/kebab.svg'
import Axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
import { deleteCode } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { editorLanguage, userCode } from '../../slices/codeSlice';
import { useNavigate } from 'react-router-dom';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const codeCard = ({ code }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileDelete = async (code_id) => {
    try {
      const resp = await Axios.delete(APP_SERVER + "/api/user/deleteFile/" + code_id, {
        headers: { Authorization: "Bearer " + Cookies.get('token') }
      })
      dispatch(deleteCode(code?.code_id))
      toast.success("File deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  const handleCardClick = async () => {
    try {
      dispatch(editorLanguage(code?.language));
      dispatch(userCode(code?.code));
      navigate("/app/playground");
    } catch (error) {
      toast.error("Smth went wrong!");
    }
  }

  return (
    <div>
      <Card shadow="sm" radius="md" withBorder miw={265}>
        <Card.Section inheritPadding py="xs" miw={250} withBorder>
          <Group position="apart" withBorder>
            <Text weight={500}></Text>
            <Menu withinPortal position="bottom-end" shadow="sm"> 
              <Menu.Target>
                <ActionIcon>
                  <img src={kebab} alt="" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item color="red" onClick={() => handleFileDelete(code?.code_id)}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>

        <div onClick={handleCardClick} className='card-below'>

          <Center mt="sm" withBorder>
            <Image src={`https://img.icons8.com/ios/64/306BFF/${code?.language}.png`} width={200} height={80} fit="contain" withPlaceholder />
          </Center>

          <Text mt="sm" color="#306BFF" size="xl" weight={500}>
            {code?.file_name}
          </Text>

          <Card.Section inheritPadding mt="sm" pb="md">
            <Text fz="xs" weight={500}>Edited at: {DateTime.fromISO(code?.last_edited).toLocaleString(DateTime.DATE_MED)}</Text>
            <Text fz="xs" weight={500}>Created at: {DateTime.fromISO(code?.created_at).toLocaleString(DateTime.DATE_MED)}</Text>
          </Card.Section>
        </div>
      </Card>
    </div>
  )
}

export default codeCard