import React from 'react'
import './Playground.scss'
import { Grid, Skeleton, Container } from '@mantine/core';
import ActionBar from '../../components/actionBar/ActionBar';
import CodeEditor from '../../components/codeEditor/CodeEditor';
import EditorControls from '../../components/editorControls/EditorControls';
import {useSelector} from 'react-redux'
import Chat from '../../components/chat/Chat';
import { motion } from 'framer-motion';

const Playground = () => {
    const code = useSelector(state => state.code.value);
    const runCode = ()=>{
        console.log(code)
    }


    return (
        <motion.div
        className="Playground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
            <Container fluid="true">
                <Grid>
                    <Grid.Col xs={9}>
                        <div className='card' id='editor'>
                            <CodeEditor/>
                            <ActionBar/>
                        </div>
                    </Grid.Col>

                    <Grid.Col xs={3}>
                        <div className='card' id='right-side'>
                            <EditorControls />
                            <Chat/>
                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
        </motion.div>
    )
}

export default Playground