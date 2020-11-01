import React from 'react'
import Axios from 'axios'

import './NewSession.scss'


export default class NewSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        Axios.get(`https://contact-tracing-server.herokuapp.com/api/users/connections/${this.props.userID}`).then((res) => {
            console.log("SESSION FRIENDS")
            console.log(res)
        })
    }

    render(){
        return(
            <div className='new-session'>
                <p className="new-session-prompt"> Who did you see?</p>
                <form className="new-session-form">

                    <label className="new-session-select">
                        Select from your Friends
                        <select>

                        </select>
                    </label>

                    <label className="new-session-input">
                        Date of Visit
                        <input type="date">

                        </input>
                    </label>

                    <button type="submit">
                        Submit
                    </button>
                    
                </form>
            </div>
        )
    }
}