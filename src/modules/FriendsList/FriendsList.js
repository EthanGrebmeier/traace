import React from 'react'
import './FriendsList.scss'

import AddFriend from './AddFriend'

import Axios from 'axios'

export default class FriendsList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            friends: [], 
            scene: "friendsList",
            prompt: "Friends List"
        }
    }

    componentDidMount(){
        this.getFriends()
    }

    changeScene = (scene) => {
        if (scene === "friendsList"){
            this.setFriendsList()
        } else {
            this.setNewFriend()
        }
    } 

    setFriendsList = () => {
        this.setState({
            scene: "friendsList",
            prompt: "Friends List"
        })
    }

    setNewFriend = () => {
        this.setState({
            scene: "newFriend",
            prompt: "Add New Friend"
        })
    }

    getFriends = () => {
        Axios.get(`https://contact-tracing-server.herokuapp.com/api/users/connections/${this.props.userID}`).then((res) => {
            console.log(res)
            this.setState({
                friends: res["data"]["connections"],
            })
        })
    }

    removeFriend = (friend) => {
        console.log(friend)
        Axios.post('https://contact-tracing-server.herokuapp.com/api/users/connections/remove', 
        {
            userID: this.props.userID,
            user2: friend["id"]
        }
        ).then(() => {
            this.props.setSnackBar("Friend Removed", "success")
            this.getFriends()
        }) 
    }

    renderFriends = () => {
        if (this.state.scene === "friendsList"){
            return(
                this.state.friends
                .map((friend) => {
                    return(
                        <div className="friends-row" key={`friend-${friend["id"]}`} id={`friend-${friend["id"]}`}>
                                <p className="friend-name">{friend["name"]}</p>
                                <p className="friend-remove" onClick={() => this.removeFriend(friend)}> Remove </p>
                        </div>
                    )
                })
                
            )
        } else {
            return <AddFriend changeScene={this.changeScene} />
        }
        
    }

    render(){
        return(
            <div className="friends">
                <div className="friends-content">
                    <div className="main-header">
                        <h2 className="main-title"> {this.state.prompt} </h2>
                    </div>
                    <div className="friends-list">
                        {this.renderFriends()}
                    </div>

                    <button className={`round-button friends-add-new ${this.state.scene === "friendsList" ? "" : "hide-button"}` } onClick={() => this.changeScene("newFriend")}> Add New </button>

                </div>
            </div>
        )
    }
}