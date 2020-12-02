import React from 'react'

import leftArrow from './images/left-arrow.png'

import './LearnMore.scss'

export default function LearnMore(props){
    return (
        <div className="learn-more">
            <div className="learn-more-content">
                <h1 className="learn-more-header"> Learn More </h1>

                <p>
                    Traace is a contact tracing application for Covid-19
                </p>

                <p>
                    Simply sign up, and start recording the places that you've visited, and people that you've seen!
                </p>

                <p>
                    We will be sure to notify you when you've potentially come in contact with someone that has tested positive for Covid-19
                </p>
            </div>
            

            <button className="back-button learn-more-close" onClick={props.handleBack}>
                    X
            </button>
        </div>
    )
}