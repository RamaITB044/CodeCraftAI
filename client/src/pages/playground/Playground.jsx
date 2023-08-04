import React from 'react'
import './Playground.scss'
import { Grid, Skeleton, Container } from '@mantine/core';
import ActionBar from '../../components/actionBar/ActionBar';
import CodeEditor from '../../components/codeEditor/CodeEditor';

const child = <Skeleton height={200} radius="md" animate={true} />;

const Playground = () => {
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

                        </div>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}

export default Playground