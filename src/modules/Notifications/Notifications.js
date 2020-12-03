import React from 'react'
import './Notifications.scss'
import axios from 'axios'
import Axios from 'axios'

export default class Notifications extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            notifications: [],
            scene: "loading"
        }
    }

    componentDidMount(){
        this.getNotifications()
    }


    getNotifications = () => {
        this.setState({
            scene: "loading"
        })
        axios.get(`${process.env.server_url || ""}api/users/notifications/${this.props.userID}`).then((res) => {
            this.setState({
                notifications: res["data"]["notifications"],
                scene: "notifications"
            })
        })
    }

    getDate = (timeStamp) => {
        let date = new Date(timeStamp)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    acceptFriendRequest = (notification) => {
        Axios.post(`${process.env.server_url || ""}api/users/connections/accept`, {
            userID: this.props.userID,
            userTwoID: notification["user1"]
        }).then((res)=> {
            if (res["data"] === "Connection established!"){
                let first = notification["name"].split(" ")[0]
                this.props.setSnackBar(`${first} is now your friend`, "success")
            } else {
                this.props.setSnackBar(res["data"], "warning")
            }

            this.getNotifications()
            
        })
    }

    declineFriendRequest = (notification) => {
        Axios.post(`${process.env.server_url || ""}api/users/connections/decline`, {
            userID: this.props.userID,
            userTwoID: notification["user1"]
        }).then(()=> {
            this.props.setSnackBar(`Friend request declined`, "critical")
            this.getNotifications()
        }).catch(()=>{
            this.props.setSnackBar(`Something went wrong`, "critical")
        })
    }

    acceptSessionRequest = (notification) => {
        Axios.post(`${process.env.server_url || ""}api/sessions/people/accept`, {
            userID: this.props.userID,
            sessionID: notification["id"]
        }).then((res)=> {
            if (res["data"] === "Session Added"){
                this.props.setSnackBar(`Session Added`, "success")
            } else {
                this.props.setSnackBar(res["data"], "warning")
            }
            
            this.getNotifications()
        })
    }

    declineSessionRequest = (notification) => {
        Axios.post(`${process.env.server_url || ""}api/sessions/people/decline`, {
            sessionID: notification["id"]
        }).then(()=> {
            this.props.setSnackBar(`Session request declined`, "critical")
            this.getNotifications()
        })
    }

    renderNotification = (notification) => {
        switch (notification.notificationType) {
            case "peopleWarning":
                if (notification.type === "positive") {
                    return(
                        <div className="notification">
                            <div className="notifications-people-warning">
                                <span className="notifications-name"> {notification.name} </span> has tested positive for Covid-19
                            </div>
                        </div>
                    )
                } else if (notification.type === "unwell"){
                    return(
                        <div className="notification">
                            <div className="notifications-people-warning">
                                <span className="notifications-name"> {notification.name} </span> is feeling unwell
                            </div>
                        </div>
                    )
                }
                break
            case "friendRequest":
                return (
                    <div className="notification">
                        <div className="notifications-friend-request">
                            <span className="notifications-name"> {notification.name} </span> sent you a friend request
                        </div>
                        <div className="notifications-buttons">
                            <button className="square-button accept" onClick={() => this.acceptFriendRequest(notification)}> Accept </button>
                            <button className="square-button decline" onClick={() => this.declineFriendRequest(notification)}> Decline </button>
                        </div>
                    </div>
                )
            case "sessionRequest":
                return (
                    <div className="notification">
                        <div className="notifications-session-request">
                            <span className="notifications-name"> {notification.name} </span> says that they were with you on {this.getDate(notification.timestamp)}
                        </div>
                        <div className="notifications-buttons">
                            <button className="square-button accept" onClick={() => this.acceptSessionRequest(notification)}> Accept </button>
                            <button className="square-button decline" onClick={() => this.declineSessionRequest(notification)}> Decline </button>
                        </div>
                    </div>
                )
            case "locationWarning":
                return (
                    <div className="notification">
                        <div className="notifications-place-warning">
                            Traace has been notified that someone who visited <span className="notifications-name"> {notification.name} </span> at the same time as you on {this.getDate(notification.date)} has tested positive for Covid-19
                        </div>
                    </div>
                )
            default:
                break 
        }
    }

    renderNotifications = () => {
        return(
            this.state.notifications
            .map((notification) => {
                return(
                    <div className="notifications-row">
                        {this.renderNotification(notification)}
                    </div>
                )
            })
        )
    }

    render(){
        if (this.state.scene === "loading"){
            return (
            <div className="loading">
                <h1> Loading... </h1>
            </div>
            )
        } else {
            return(
                <div className="notifications">
                    <div className="notifications-content">
                        <div className="main-header">
                            <h2 className="main-title"> Notifications </h2>
                        </div>
                        <div className="notifications-list">
                            {this.renderNotifications()}
                        </div>
    
                    </div>
                </div>
            )
        }
        
    }
}