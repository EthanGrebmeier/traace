import React from 'react';
import './Traace.scss';
import Axios from 'axios'
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
        Axios.defaults.withCredentials = true
        let storedUserID = localStorage.getItem("userID")
        console.log("storedUserID")
        console.log(storedUserID)
        if (storedUserID){
            console.log(true)
            this.setState({
                userID: storedUserID
            })
        }
    }

    setUser = (user) => {
        console.log(user)
        let userID = user["userID"].toString()
        localStorage.setItem("userID", userID)
        this.setState({
            userID: userID,
        })
    }

    handleLogout = () => {
        console.log("logout")
        localStorage.removeItem("userID")
        
        this.setState({
            userID: ""
        })

        Axios.post('https://contact-tracing-server.herokuapp.com/api/authenticate/logout')
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