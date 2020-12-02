import React from 'react'
import './SnackBar.scss'

import {Transition} from 'react-transition-group'

import close from '../../images/close.png'

const duration = 150

const defaultStyle = {
    transition: `bottom ${duration}ms`,
    bottom: '-20px'
  }

const transitionStyles = {
    entering: { bottom: '-20px' },
    entered:  { bottom: '8px' },
    exiting:  { bottom: '-14px' },
    exited:  { bottom: '-20px', display: 'none' },
}

export default function SnackBar(props){
    return (
        <Transition in={props.in} timeout={duration}>
            {state => (
                <div style={{...defaultStyle, ...transitionStyles[state]}} className={`snackbar-container ${props.status}`}>
                    <p className="snackbar-text">
                        {props.message}
                    </p>
                    <button className="snackbar-close" onClick={props.onClick}>
                        <img src={close} alt="" className="close-img" />
                    </button>
                </div>

            )}
            
        </Transition>
    )
}