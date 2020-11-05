import React from 'react'
import Axios from 'axios'

import leftArrow from '../../images/left-arrow.png'

import './NewSession.scss'


export default class NewPlacesSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div className='new-session'>
                <p className="new-session-prompt"> Where did you go?</p>
                <form className="new-session-form">
                    <label className="new-session-input">
                        Date of Visit
                        <input type="date">

                        </input>
                    </label>

                    <label className="new-session-input">
                        Select a Friend
                        <input type="text">
                        </input>
                    </label>

                    <p className="new-session-or"> OR </p>

                    <label className="new-session-input">
                        Input a User's Code
                        <input type="text">
                        </input>
                    </label>

                    <button type="submit" className="square-button accept-button">
                        Submit
                    </button>
                    
                </form>

                <button className="form-back-button" onClick={() => this.props.changeScene("sessions")}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
                </button>
            </div>
        )
    }
}