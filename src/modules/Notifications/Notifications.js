import React from 'react'
import './Notifications.scss'
import axios from 'axios'

export default class Notifications extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            notifications: []
        }
    }

    componentDidMount(){
        this.getNotifications()
    }


    getNotifications = () => {
        axios.get(`https://contact-tracing-server.herokuapp.com/api/users/notifications/2`).then((res) => {
            console.log(res)
            this.setState({
                notifications: res["data"]["notifications"],
            })
        })
    }

    getDate = (timeStamp) => {
        let date = new Date(timeStamp)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
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
                            <button className="accept"> Accept </button>
                            <button className="decline"> Decline </button>
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
                            <button className="accept"> Accept </button>
                            <button className="decline"> Decline </button>
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