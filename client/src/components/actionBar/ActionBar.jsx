import React from 'react'
import './ActionBar.scss'
import optimizeIcon from '../../assets/icons/optimize.svg'
import debugIcon from '../../assets/icons/debug.svg'
import generateIcon from '../../assets/icons/generate.svg'
import summarizeIcon from '../../assets/icons/summarize.svg'
import translateIcon from '../../assets/icons/translate.svg'

const ActionBar = () => {
    return (
        <div className='ActionBar'>
            <div className="action-btn">
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