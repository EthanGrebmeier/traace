import React from 'react'

import Axios from 'axios';

import './Login.scss'

import leftArrow from './images/left-arrow.png'

let submitLogin = (event, email, password, setUser, setSnackBar, setLoginButtonText) => {
    event.preventDefault()
    if (email === ""){
        setSnackBar("Email must not be blank")
    } else if (password === "") {
        setSnackBar("Password must not be blank")
    } else {
        setLoginButtonText("Loading...")
        Axios.post('https://contact-tracing-server.herokuapp.com/api/authenticate/login', {
            username: email,
            password: password
        }).then((res) => {
            setLoginButtonText("Log In")
            let userID = res["data"]["userID"]
            if (userID){
                setUser(res["data"])
            } else {
                setSnackBar(res["data"], "warning")
            }
            
        }).catch(err => {
            setLoginButtonText("Log In")
            setSnackBar("Invalid Username or Password ", "warning")

        })
    }  
}


export default function Login(props){

    let [loginEmail, setLoginEmail] = React.useState("")
    let [loginPassword, setLoginPassword] = React.useState("")
    let [loginButtonText, setLoginButtonText] = React.useState("Log In")

    let loginWithGoogle = () => {
        window.open('http://contact-tracing-server.herokuapp.com/api/authenticate/login/google/',"_self")
    }

    return (
        <div className="login">
            <h1 className="login-header"> Log In </h1>
            <form className="login-form" onSubmit={(event) => submitLogin(event, loginEmail, loginPassword, props.setUser, props.setSnackBar, setLoginButtonText)}>
                <div className="login-form-row login-inputs">
                    <label className="landing-input-container ">
                        Email
                        <input type="text" className="landing-input" onChange={(e) => {setLoginEmail(e.target.value)}}>
                        </input>
                    </label>
                    <label className="landing-input-container">
                        Password
                        <input type="password" className="landing-input" onChange={(e) => {setLoginPassword(e.target.value)}}>
                        </input>
                    </label>
                </div>
                <button submit className="square-button yes submit-login-button">
                    {loginButtonText}
                </button>
            </form>

            { /* <button className="link-button" onClick={() => loginWithGoogle()}> Log In With Google </button> */}

            <button className="back-button" onClick={props.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
            </button>
        </div>
    )
}