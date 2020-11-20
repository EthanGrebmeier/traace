import React from 'react';
import Axios from 'axios';

import Login from './Login'
import SignUp from './SignUp'

import SnackBar from './modules/SnackBar/SnackBar'

import './Landing.scss'


export default class Landing extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            scene: "landing",
            snackBar: false,
            snackBarMessage: "",
            snackBarType: "",
        }
    }

    handleBack = () => {
        this.setScene("landing")
    }


    setScene = (scene) => {
        console.log(scene)
        switch (scene) {
            case "landing":
                this.setLanding()
                break
            case "learnMore":
                this.setLearnMore()
                break
            case "login":
                this.setLogin()
                break
            case "signUp":
                this.setSignUp()
                break
            default: 
                this.setLanding()
        }

    }

    setLanding = () => {
        this.setState({
            scene: "landing"
        })
    }

    setLogin = () => {
        console.log("hi")
        this.setState({
            scene: "login"
        })
    }

    setSignUp = () => {
        this.setState({
            scene: "signUp"
        })
    }

    setLearnMore = () => {
        this.setState({
            scene: "learnMore"
        })
    }

    setSnackBar = (message, type) => {
        this.setState({
            snackBar: true,
            snackBarMessage: message,
            snackBarType: type
        })
      }
    
      renderSnackBar = () => {
          return <SnackBar 
                  message={this.state.snackBarMessage} 
                  status={this.state.snackBarType} 
                  onClick={() => {this.setState({snackBar: false})}} 
                  in={this.state.snackBar}
                  />
      }

    renderLanding = () => {
        switch (this.state.scene) {
            case "landing":
                return (
                    <div className="item-container container landing">
                        <h1 className="welcome"> Welcome to</h1>
                        <h1 className="traace-logo"> Traace</h1>
                        <p className="welcome-description"> A Coronavirus contact tracing application</p>
                        <button className="link-button"> Learn More </button>
                        <div className="login-button-bar">
                            <button className="square-button log-in-button yes" onClick={() => this.setScene("login")}> Log In </button>
                            <button className="square-button sign-up-button yes" onClick={() => this.setScene("signUp")}> Sign Up </button>
                        </div>
                        {this.renderSnackBar()}
                    </div>
                )
            case "login":
                return (
                    <div className="item-container container landing">
                        <Login handleBack={this.handleBack} setSnackBar={this.setSnackBar} setUserID={this.props.setUserID} />
                        {this.renderSnackBar()}
                    </div>
                )
            case "signUp":
                return (
                    <div className="item-container container landing">
                        <SignUp handleBack={this.handleBack} setSnackBar={this.setSnackBar} setUserID={this.props.setUserID} />
                        {this.renderSnackBar()}
                    </div>
                )
            default: 
                return (
                        <div className="item-container container landing">
                            <h1 className="welcome"> Welcome to</h1>
                            <h1 className="traace-logo"> Traace</h1>
                            <p className="welcome-description"> A Coronavirus contact tracing application</p>
                            <button className="learn-more-button"> Learn More </button>
                            <div className="login-button-bar">
                                <button className="square-button log-in-button yes" onClick={() => this.setScene("login")}> Log In </button>
                                <button className="square-button sign-up-button yes" onClick={() => this.setScene("signUp")}> Sign Up </button>
                            </div>
                            {this.renderSnackBar()}
                        </div>
                    )
        }
    }
    

    render(){
        return (
            <div className="app-container">
                {this.renderLanding()}
                
            </div>
        )
    }
}