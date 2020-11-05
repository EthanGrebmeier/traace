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
        Axios.get(`https://contact-tracing-server.herokuapp.com/api/users/connections/${this.props.userID}`).then((res) => {
            console.log("SESSION FRIENDS")
            console.log(res)
            let friends = [
                {
                    id: 1,
                    name: "Kiley Brennan"
                },
                {
                    id: 2,
                    name: "Kieran Mckenna"
                },
                {
                    id: 3,
                    name: "Owen Grebmeier"
                },
                {
                    id: 4,
                    name: "Shawn White"
                },
                {
                    id: 5,
                    name: "Tony Grebmeier"
                },
                {
                    id: 6,
                    name: "Amber Grebmeier"
                },
                {
                    id: 7,
                    name: "Toby Fox"
                },
                {
                    id: 8,
                    name: "Oscar Bluth"
                },
            ]
            let friendsValues = []
            for (let friend in friends){
                friendsValues.push({
                    name: friends[friend].name,
                    value: friend
                })
            }
            console.log(friendsValues)

            this.setState({
                friends: friends,
                friendsValues: friendsValues
            })
        }) 
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
    
            console.log(`Reccomendation: ${recommendation.name}`)
            if (recommendation == ""){
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
        console.log(event.target.value)
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
        if(this.state.date !== ""){
            this.setState({confirm: true})
        } else {
           
        }
        
        event.preventDefault()
    }

    handleConfirm = () => {

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
                            value={0}
                            name="friend" 
                            search 
                            printOptions="on-focus"
                            emptyMessage="No Friends Found"
                        />
                    </label>

                    <label className="new-session-input">
                        Date of Visit
                        <input type="date" onChange={this.handleDateChange}>

                        </input>
                    </label>

                    <button type="submit" className="square-button accept-button">
                        Submit
                    </button>
                </form>
            )
        } else {
            return (
                <form className="new-session-form">
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

                <button className="form-back-button" onClick={this.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
                </button>
            </div>
        )
    }
}