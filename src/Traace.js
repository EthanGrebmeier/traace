import React from 'react';
import {withRouter} from 'react-router-dom';
import './Traace.scss';
import Axios from 'axios'
import Landing from './Landing'
import App from './App'


class Traace extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userID: "",
        }
    }

    componentDidMount(){
        Axios.defaults.withCredentials = true
        let storedUserID = localStorage.getItem("userID") 
        let userID;
        if (this.props) {
            userID = this.props.match.params.userID

        }
        
        if (storedUserID){

            this.setState({
                userID: storedUserID
            })
        } else if (userID){
            this.setState({
                userID: userID
            })
        }
    }

    setUser = (user) => {

        let userID = user["userID"].toString()
        localStorage.setItem("userID", userID)
        this.setState({
            userID: userID,
        })
    }

    handleLogout = () => {
        console.log("logout")

        localStorage.removeItem("userID")
        Axios.post(`${process.env.server_url || ""}api/authenticate/logout`, {userID: this.state.userID})

        this.setState({
            userID: ""
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

export default withRouter(Traace)