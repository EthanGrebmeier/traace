import React from 'react';
import Axios from 'axios';
import './Traace.scss';

import Landing from './Landing'
import App from './App'


export default class Traace extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userID: "",

        }
    }

    componentDidMount(){
        let userID = sessionStorage.getItem("userID")
        if (userID){
            this.setState({
                userID: userID
            })
        }
    }

    setUserID = (userID) => {
        userID = userID.toString()
        sessionStorage.setItem("userID", userID)

        this.setState({
            userID: userID
        })
    }

    handleLogout = () => {
        console.log("logout")
        sessionStorage.clear()
        this.setState({
            userID: ""
        })
        
    }
    

    render(){
        if (this.state.userID === ""){
            return (
                <Landing setUserID={this.setUserID} />
            )
        } else {
            return (
                <App userID={this.state.userID} handleLogout={this.handleLogout}/>
            )
        }
        
    }
}