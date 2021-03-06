import React from 'react'
import Axios from 'axios'
import SelectSearch from 'react-select-search';

import leftArrow from '../../images/left-arrow.png'

import './NewSession.scss'


export default class NewPeopleSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            friends: [],
            friendsValues: [],
            selectedFriendIndex: 0,
            date: "",
            confirm: false,
        }
    }

    componentDidMount(){
        Axios.get(`${process.env.server_url || ""}api/users/connections/${this.props.userID}`).then((res) => {
            let friends = res["data"]["connections"]
            let friendsValues = []
            for (let friend in friends){
                friendsValues.push({
                    name: friends[friend].name,
                    value: friend
                })
            }

            this.setState({
                friends: friends,
                friendsValues: friendsValues
            })
        }) 
    }

    getMinDate = () => {
        let twoWeeks = new Date()
        twoWeeks.setDate(twoWeeks.getDate() - 14)
        return `${twoWeeks.getUTCFullYear()}-${twoWeeks.getUTCMonth() + 1}-${twoWeeks.getUTCDate()}`
    }

    getMaxDate = () => {
        let today = new Date()
        today.setDate(today.getDate())

        return `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`
    }


    searchFriends = (event) => {
        let value = event.target.value.toLowerCase()


        let recommendation = ""

        if (value === "" || value === " "){
            this.setState({
                friendWholeString: event.target.value,
                recommendedFriend: {}
            })
        } else {
            for (let friend in this.state.friends){
                if (this.state.friends[friend].name.toLowerCase().includes(value)){
                    recommendation = this.state.friends[friend]
                }
            }
    
            if (recommendation === ""){
                this.setState({
                    friendWholeString: event.target.value

                })
            } else {
                this.setState({
                    friendWholeString: event.target.value,
                    recommendedFriend: recommendation
                })
            }
            
        }
    }

    handleDateChange = (event) => {

        this.setState({
            date: event.target.value
        })
    } 

    handleFriendSelect = (value) => {
        this.setState({
            selectedFriendIndex: value
        })
        
    }

    renderPeopleSeen = () => {

        // STRETCH GOAL
        return (
            <div className="people-seen">
                {
                    Object.keys(this.state.selectedFriends)
                }
            </div>
        )
    }

    handleBack = () => {
        if(this.state.confirm){
            this.setState({
                confirm: false
            })
        } else {
            this.props.changeScene("sessions")
        }
    }

    handleSubmit = (event) => {
        if(this.state.date === ""){
            this.props.setSnackBar("Please enter a date", "warning")
            
        } else if (this.state.friends.length === 0){
            this.props.setSnackBar("Please select a friend", "warning")
        } else if(new Date(this.state.date).setHours(0) > new Date().setHours(23)) {
            this.props.setSnackBar("Date can't be in the future", "warning")
        } else {
            this.setState({confirm: true})
        }
        
        event.preventDefault()
    }

    handleConfirm = (event) => {
        // ADD SESSION STUFF LATER

        Axios.post(`${process.env.server_url || ""}api/sessions/people`, {
            userID: this.props.userID,
            userTwoID: this.state.friends[this.state.selectedFriendIndex]["id"],
            date: this.state.date,
        }).then( res => {

            if (res.status === 200){
                this.props.getSessions()
                this.props.setSnackBar("Success!", "success")
                this.props.changeScene("sessions")
            } else {
                this.props.setSnackBar("Something went wrong", "critical")
            }
        }).catch( (err) => {
            this.props.setSnackBar("Something Went Wrong", "critical")
        } )
        
        event.preventDefault()
    }

    renderFormConfirm = () => {
        if (!this.state.confirm){
            return(
                <form className="new-session-form" onSubmit={this.handleSubmit}>
                    <label className="new-session-input">
                        Select a Friend
                        <SelectSearch 
                            options={this.state.friendsValues} 
                            onChange={this.handleFriendSelect}
                            value={this.state.selectedFriendIndex}
                            name="friend" 
                            search 
                            printOptions="on-focus"
                            emptyMessage="No Friends Found"
                        />
                    </label>

                    <label className="new-session-input">
                        Date of Visit
                        <input type="date" min={this.getMinDate()} max={this.getMaxDate()} onChange={this.handleDateChange} value={this.state.date}>

                        </input>
                    </label>

                    <button type="submit" className="square-button accept-button">
                        Submit
                    </button>

                    
                    
                </form>
            )
        } else {
            return (
                <form className="new-session-form" onSubmit={this.handleConfirm}>
                    <div className="confirm">
                        <p className="confirm-text">
                            {this.state.friends[this.state.selectedFriendIndex]["name"]}
                        </p>
                        <p className="confirm-text">
                            on
                        </p>
                        <p className="confirm-text">
                            {this.state.date}
                        </p>
                    </div>
                    

                    <button className="square-button accept-button">
                        Confirm
                    </button>
                </form>
            )
        }
        
    }

    render(){
        return(
            <div className='new-session'>
                <p className="new-session-prompt"> Who did you see?</p>

                {this.renderFormConfirm()}

                <button className="form-back-button session-back" onClick={this.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
                </button>
            </div>
        )
    }
}