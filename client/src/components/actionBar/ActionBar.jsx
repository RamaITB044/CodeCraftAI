import React from 'react'
import './ActionBar.scss'
import optimizeIcon from '../../assets/icons/optimize.svg'
import debugIcon from '../../assets/icons/debug.svg'
import generateIcon from '../../assets/icons/generate.svg'
import summarizeIcon from '../../assets/icons/summarize.svg'
import translateIcon from '../../assets/icons/translate.svg'
import { useSelector, useDispatch } from "react-redux"
import { userCode } from '../../slices/codeSlice'
import { updateCredits } from '../../slices/userSlice'
import axios from 'axios';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;
const didToken = Cookies.get('token');

const ActionBar = () => {
    const code = useSelector(state => state.code.value);
    const creditsLeft = useSelector(state => state.user?.value?.credits?.value) - 1;
    const dispatch = useDispatch();

    const execute = async (operation) => {
        try {
            const resp = await axios.post(APP_SERVER + '/api/ai/' + operation, { prompt: code.replace(/\s/g, "") }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            dispatch(updateCredits({creditsLeft, operation}));
            dispatch(userCode(resp.data.text.slice(2)));
        } catch (error) {
            console.log(error);
        }
    }

    const executeWithToast = async (operation) => {
        let loadingMessage;
        let successMessage;
        if (operation === 'optimize') {
            loadingMessage = 'Optimizing your code...';
            successMessage = 'Code optimization done!'
        } else if (operation === 'debug') {
            loadingMessage = 'Debugging your code...';
            successMessage = 'Code debugging done!'
        } else if (operation === 'generate') {
            loadingMessage = 'Generating your code...';
            successMessage = 'Code generation done!'
        } else if (operation === 'summarize') {
            loadingMessage = 'Summarizing your code...';
            successMessage = 'Code summarization done!'
        } else {
            loadingMessage = 'Executing operation...';
            successMessage = 'Operation executed!'
        }

        return toast.promise(
            execute(operation),
            {
                loading: loadingMessage,
                success: (data) => successMessage,
                error: (err) => `Something went wrong!`,
            },
            {
                style: {
                    minWidth: '250px',
                    borderRadius: '5px',
                    border: '1px solid #306BFF',
                    background: '#333',
                    color: '#BFBFBF',
                },
                success: {
                    duration: 5000,
                    icon: '🔥',
                },
            }
        );
    };

    return (
        <div className='ActionBar'>
            <div className="action-btn" onClick={() => executeWithToast("optimize")}>
                <img src={optimizeIcon} alt="Optimize" />
                Optimize
            </div>
            <div className="action-btn" onClick={() => executeWithToast("debug")}>
                <img src={debugIcon} alt="Debug" />
                Debug
            </div>
            <div className="action-btn" onClick={() => executeWithToast("generate")}>
                <img src={generateIcon} alt="Generate" />
                Generate
            </div>
            <div className="action-btn" onClick={() => executeWithToast("summarize")}>
                <img src={summarizeIcon} alt="Summarize" />
                Summarize
            </div>
            {/* <div className="action-btn">
                <img src={translateIcon} alt="Translate" />
                Translate
            </div> */}
        </div>
    )
}

export default ActionBar