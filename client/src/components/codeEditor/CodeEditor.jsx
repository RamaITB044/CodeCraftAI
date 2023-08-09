import React, { useState } from 'react'
import './CodeEditor.scss'
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from 'react-redux'
import { userCode } from '../../slices/codeSlice';

const CodeEditor = () => {
    const [value, setvalue] = useState("hello");
    
    const dispatch = useDispatch();
    const code = useSelector(state => state.code.value);
    const language = useSelector(state => state.code.language);

    const handleEditorChange = (value) => {
        console.log(value)
        dispatch(userCode(value))
    }

    const options = {
        fontSize: 16,
    }

    return (
        <div className='CodeEditor'>
            <Editor
                height="calc(100vh - 125px)"
                options={options}
                width={'100%'}
                value={code}
                theme='vs-dark'
                language={language}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditor