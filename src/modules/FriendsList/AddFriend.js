import React from 'react'
import Axios from 'axios'

import leftArrow from '../../images/left-arrow.png'

import './AddFriend.scss'


export default class NewPeopleSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputCode: "",
        }
    }

    componentDidMount(){

    }

    handleChange = (e) => {
        console.log(this.state.inputCode)
        this.setState({
            inputCode: e.target.value 
        })
    }

    handleBack = () => {
        this.props.changeScene("friendsList")
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.inputCode.length === 9){
            Axios.post('https://contact-tracing-server.herokuapp.com/api/users/connections', {
                userID: this.props.userID,
                friendCode: this.state.inputCode,
            }).then(( res ) => {
                console.log(res)
                if (res["data"] === "Request Sent"){
                    this.props.setSnackBar(res["data"], "success")
                } else {
                    this.props.setSnackBar(res["data"], "warning")
                }
            })
        } else {
            this.props.setSnackBar("Friend Code must be 9 numbers long", "warning")
        }
        
    }

    render(){
        return(
            <div className="new-friend">
                <form className="new-friend-form" onSubmit={this.handleSubmit}>
                    <label className="new-friend-input">
                        Input a Friend Code
                        <input type="text" onChange={this.handleChange} maxLength="9">

                        </input>
                    </label>

                    <button type="submit" className="square-button accept-button">
                        Send Friend Request
                    </button>

                    OR

                    <label>
                        Share your Friend Code: 123-123-123
                        
                    </label>

                    <button className="square-button accept-button">
                        Copy
                    </button>
                </form>

                <button className="form-back-button friends-back-button" onClick={this.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
                </button>
            </div>
        )
    }
}