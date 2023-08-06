import React from 'react'
import './Playground.scss'
import { Grid, Skeleton, Container } from '@mantine/core';
import ActionBar from '../../components/actionBar/ActionBar';
import CodeEditor from '../../components/codeEditor/CodeEditor';
import EditorControls from '../../components/editorControls/EditorControls';
import {useSelector} from 'react-redux'

const Playground = () => {
    const code = useSelector(state => state.code.value);
    const runCode = ()=>{
        console.log(code)
    }


    return (
        <div className='Playground'>
            <Container fluid="true">
                <Grid>
                    <Grid.Col xs={9}>
                        <div className='card' id='editor'>
                            <CodeEditor/>
                            <ActionBar/>
                        </div>
                    </Grid.Col>

                    <Grid.Col xs={3}>
                        <div className='card'>
                            {/* <button onClick={runCode}>
                                Run
                            </button> */}
                            <EditorControls/>
                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}

export default Playground