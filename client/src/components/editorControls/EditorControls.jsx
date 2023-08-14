import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import './EditorControls.scss'
import { Modal, Select, Skeleton, Container, TextInput, Button, Flex, Drawer, Textarea } from '@mantine/core';
import { languageOptions } from '../../utils/languages';
import { extensions } from '../../utils/languageExtensions';
import save_logo from '../../assets/icons/save.svg'
import copy_logo from '../../assets/icons/copy.svg'
import run_logo from '../../assets/icons/run.svg'
import { useSelector, useDispatch } from "react-redux"
import { editorLanguage } from '../../slices/codeSlice';
import { addCode } from '../../slices/userSlice';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const EditorControls = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpened, handlers] = useDisclosure(false);


  const code = useSelector(state => state.code.value);
  const language = useSelector(state => state.code.language);

  const handleCreateFile = async () => {
    if (fileName.length <= 0) {
      toast.error("Please write a file name!")
      return;
    }
    const code_id = uuidv4();
    const postObj = {
      code_id: code_id,
      code: code,
      language: language,
      file_name: fileName + extensions[language],
      last_edited: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }
    try {
      const resp = await Axios.post(APP_SERVER + "/api/user/createFile",
        postObj,
        { headers: { Authorization: "Bearer " + Cookies.get('token') } }
      );
      if (resp.status === 200) {
        dispatch(addCode(postObj));
        toast.success("File created successfully!");
        close();
      }
    } catch (err) {
      toast.error("Error in creating file. Please try again!")
      console.log(err);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Copied to clipboard!")
    });
  }

  return (
    <div className='Editor-controls'>
      <Modal opened={opened} onClose={close} title="Name your file" centered >

        {/* <input type="text" onChange={(e)=>setFileName(e.target.value)} placeholder='Enter file name'/> */}
        {/* <button onClick={handleCreateFile}>Save</button> */}
        <TextInput onChange={(e) => setFileName(e.target.value)} placeholder="Enter file name" data-autofocus />
        <br />
        <Button onClick={handleCreateFile} style={{ background: 'linear-gradient(123.28deg, #306BFF 4.69%, #040E3A 289.88%)' }}>Save</Button>
      </Modal>

      <Drawer opened={drawerOpened} onClose={() => handlers.close()} position="right" size="24%">
        
        <Container>

          <Textarea
            data-autofocus
            pb={40}
            minRows={15}
            maxRows={15}
            label="Input"
          />

          <Textarea
            disabled
            pb={20}
            minRows={15}
            maxRows={15}
            label="Output"
          />
          <Button onClick={handleCreateFile} style={{ background: 'linear-gradient(123.28deg, #306BFF 4.69%, #040E3A 289.88%)' }}>Run</Button>
        </Container>

      </Drawer>

      <div className='control-btn' onClick={() => handlers.open()}>
        <img src={run_logo} alt="run" />
        <p></p>
      </div>
      <div className='func-btn' onClick={open}>
        <img src={save_logo} alt="save" />
      </div>
      <div className='func-btn' onClick={copyToClipboard}>
        <img src={copy_logo} alt="copy" />
      </div>
      <Select
        className='language-con'
        defaultValue={languageOptions[0].value}
        onChange={(lang) => dispatch(editorLanguage(lang))}
        transition="scale-y"
        transitionDuration={180}
        transitionTimingFunction="ease"
        placeholder="Select Language"
        data={languageOptions}
        styles={(theme) => ({
          item: {
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor: '#306BFF',
                color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
              },
            },
          },
        })}
      />

    </div>
  )
}

export default EditorControls