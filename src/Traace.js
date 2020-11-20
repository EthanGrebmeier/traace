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

    setUserID = (userID) => {
        userID = userID.toString()
        console.log("TOP LEVEL")
        console.log(userID)
        this.setState({
            userID: userID
        })
    }
    

    render(){
        if (this.state.userID === ""){
            return (
                <Landing setUserID={this.setUserID} />
            )
        } else {
            return (
                <App userID={this.state.userID}/>
            )
        }
        
    }
}