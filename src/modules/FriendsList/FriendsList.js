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
            prompt: "Friends List",
            removedFriend: {}
        }
    }

    componentDidMount(){
        this.changeScene("friendsList")
    }

    changeScene = (scene) => {
        if (scene === "friendsList"){
            this.setFriendsList()
        } else if (scene === "newFriend"){
            this.setNewFriend()
        } else if (scene === "removeFriend"){
            this.setRemoveFriend()
        } else {
            this.setLoading()
        }
    } 

    setFriendsList = () => {
        this.changeScene("loading")
        this.getFriends().then((res) => {
            this.setState({
                friends: res["data"]["connections"],
                scene: "friendsList",
                prompt: "Friends List"
            })
        })
    }

    setNewFriend = () => {
        this.setState({
            scene: "newFriend",
            prompt: "Add New Friend"
        })
    }

    setRemoveFriend = (friend) => {
        this.setState({
            scene: "removeFriend",
            prompt: "Remove Friend",
            removedFriend: friend
        })
    }

    setLoading = () => {
        this.setState({
            scene: "loading",
            prompt: " "
        })
    }

    getFriends = () => {
        return Axios.get(`https://contact-tracing-server.herokuapp.com/api/users/connections/${this.props.userID}`)
    }

    removeFriend = () => {
        console.log(this.state.removedFriend)
        this.setLoading()
        Axios.post('https://contact-tracing-server.herokuapp.com/api/users/connections/remove', 
        {
            userOneID: this.props.userID,
            userTwoID: this.state.removedFriend["id"]
        }
        ).then(() => {
            this.props.setSnackBar("Friend Removed", "success")
            this.changeScene("friendsList")
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
                                <p className="friend-remove" onClick={() => this.setRemoveFriend(friend)}> Remove </p>
                        </div>
                    )
                })
                
            )
        } else if (this.state.scene === "newFriend"){
            return <AddFriend changeScene={this.changeScene} />
        } else if (this.state.scene === "removeFriend"){
            return (
            <div className="remove-confirm">
                <h1> Would you like to remove <span className="underlined"> {this.state.removedFriend["name"]}</span> from your friends list? </h1>
                <div className="remove-confirm-buttons">
                    <button className="square-button yes" onClick={() => this.removeFriend()}> 
                        Confirm
                    </button>
                    <button className="square-button no" onClick={this.setFriendsList}>
                        Decline
                    </button>
                </div>
                
            </div>
            )
        } else {
            return (
                <div className="loading">
                    <h1>
                        Loading Friends...
                    </h1>
                </div>
            )
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