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
import rolling_logo from '../../assets/images/rolling.svg'

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const EditorControls = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpened, handlers] = useDisclosure(false);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);


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

  const handleCompile = () => {
    //give me the id of the language from langguageOptions array which is imported from utils
    const lang = languageOptions.find((lang) => lang.value === language);
    console.log("handleCompile");
    setProcessing(true);
    const formData = {
      language_id: lang.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    Axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        setProcessing(false);
        toast.error("Error in compiling code. Please try again!");
        let error = err.response ? err.response.data : err;
        let status = err.response ? err.response.status : err;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await Axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      setProcessing(false);
      console.log("err", err);
    }
  };

  return (
    <div className='Editor-controls'>
      <Modal opened={opened} onClose={close} title="Name your file" centered >
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
            onChange={(e) => setCustomInput(e.target.value)}
          />

          <Textarea
            disabled
            pb={20}
            minRows={15}
            maxRows={15}
            label="Output"
            value={outputDetails !== null
              ? `${atob(outputDetails?.stdout)}`
              : null}
          />
          <Flex justify="space-between" align="center">
            <Button
              onClick={handleCompile}
              style={processing ? { background: 'none', border: '1px solid #306BFF' } : { background: 'linear-gradient(123.28deg, #306BFF 4.69%, #040E3A 289.88%)' }}
              disabled={processing}
            >
              {processing ? <img src={rolling_logo} alt="Processing" width={'24px'} height={'20px'} /> : 'Run'}
            </Button>
            <p>Status: <span>{outputDetails?.status?.description || null}</span></p>
          </Flex>

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