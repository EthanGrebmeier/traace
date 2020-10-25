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
        /*
        axios.get(`https://contact-tracing-server.herokuapp.com/api/users/connections/2`).then((res) => {
            console.log(res)
            this.setState({
                friends: res["data"]["connections"],
            })
        })
        */
    }

    renderNotifications = () => {
        return(
            this.state.notifications
            .map((notification) => {
                return(
                    <div className="notifications-row">
                        {notification}
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