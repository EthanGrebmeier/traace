import React from 'react'
import './FriendsList.scss'
import axios from 'axios'

export default class FriendsList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            friends: []
        }
    }

    componentDidMount(){
        this.getFriends()
    }


    getFriends = () => {
        axios.get(`https://contact-tracing-server.herokuapp.com/api/users/connections/2`).then((res) => {
            console.log(res)
            this.setState({
                friends: res["data"]["connections"],
            })
        })
    }

    renderFriends = () => {
        return(
            this.state.friends
            .map((friend) => {
                return(
                    <div className="friends-row">
                            <p className="friend-name ">{friend["name"]}</p>
                            <p className="friend-remove "> Remove </p>
                    </div>
                )
            })
            
        )
    }

    render(){
        return(
            <div className="friends">
                <div className="friends-content">
                    <div className="main-header">
                        <h2 className="main-title"> Friends List </h2>
                    </div>
                    <div className="friends-list">
                        {this.renderFriends()}
                    </div>

                    <button className="round-button friends-add-new" onClick={() => console.log("Add New")}> Add New </button>

                </div>
            </div>
        )
    }
}