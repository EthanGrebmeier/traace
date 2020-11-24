import React from 'react';
import './Traace.scss';
import axios from 'axios'
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
        axios.defaults.withCredentials = true
        let userID = sessionStorage.getItem("userID")
        let accessToken = sessionStorage.getItem("accessToken")

        if (userID && accessToken){
            this.setState({
                userID: userID,
            })
        }
    }

    setUser = (user) => {
        console.log(user)
        let userID = user["userID"].toString()
        let accessToken = user["accessToken"]
        sessionStorage.setItem("userID", userID)
        sessionStorage.setItem("accessToken", accessToken)
        
        this.setState({
            userID: userID,
        })
    }

    handleLogout = () => {
        console.log("logout")
        sessionStorage.clear()
        this.setState({
            userID: "",
            accessToken: ""
        })
        
    }
    

    render(){
        if (this.state.userID === ""){
            return (
                <Landing setUser={this.setUser} />
            )
        } else {
            return (
                <App userID={this.state.userID} handleLogout={this.handleLogout}/>
            )
        }
        
    }
}