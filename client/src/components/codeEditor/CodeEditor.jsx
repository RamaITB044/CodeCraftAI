import React, { useState } from 'react'
import './CodeEditor.scss'
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
    const [value, setvalue] = useState("hello");

    const handleEditorChange = (value) => {
        setCode(value);
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
                value={value}
                theme='vs-dark'
            />
        </div>
    )
}

export default CodeEditor