import React from 'react'
import './ActionBar.scss'
import optimizeIcon from '../../assets/icons/optimize.svg'
import debugIcon from '../../assets/icons/debug.svg'
import generateIcon from '../../assets/icons/generate.svg'
import summarizeIcon from '../../assets/icons/summarize.svg'
import translateIcon from '../../assets/icons/translate.svg'
import {useSelector, useDispatch} from "react-redux"
import {userCode} from '../../slices/codeSlice'
import axios from 'axios';
const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const ActionBar = () => {
    const code = useSelector(state => state.code.value);
    const dispatch = useDispatch();
    const optimizeCode = async() => {
        try {
            const resp = await axios.post(APP_SERVER +'/api/ai/optimize', {prompt: code.replace(/\s/g, "")});
            console.log(resp);
            dispatch(userCode(resp.data.text.slice(2)));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='ActionBar'>
            <div className="action-btn" onClick={optimizeCode}>
                <img src={optimizeIcon} alt="Optimize" />
                Optimize
            </div>
            <div className="action-btn">
                <img src={debugIcon} alt="Debug" />
                Debug
            </div>
            <div className="action-btn">
                <img src={generateIcon} alt="Generate" />
                Generate
            </div>
            <div className="action-btn">
                <img src={summarizeIcon} alt="Summarize" />
                Summarize
            </div>
            <div className="action-btn">
                <img src={translateIcon} alt="Translate" />
                Translate
            </div>
        </div>
    )
}

export default ActionBar