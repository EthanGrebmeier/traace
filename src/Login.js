import React from 'react'

import Axios from 'axios';

import './Login.scss'

import leftArrow from './images/left-arrow.png'

let submitLogin = (event, email, password, setUser, setSnackBar) => {
    event.preventDefault()
    if (email === ""){
        setSnackBar("Email must not be blank")
    } else if (password === "") {
        setSnackBar("Password must not be blank")
    } else {
        Axios.post('https://contact-tracing-server.herokuapp.com/api/authenticate/login', {
            username: email,
            password: password
        }).then((res) => {
            console.log(res)
            let userID = res["data"]["userID"]
            console.log(userID)
            if (userID){
                setUser(res["data"])
            } else {
                setSnackBar(res["data"], "warning")
            }
            
        }).catch(err => {
            
            console.log(err)
        })
    }  
}


export default function Login(props){

    let [loginEmail, setLoginEmail] = React.useState("")
    let [loginPassword, setLoginPassword] = React.useState("")

    return (
        <div className="login">
            <h1 className="login-header"> Log In </h1>
            <form className="login-form" onSubmit={(event) => submitLogin(event, loginEmail, loginPassword, props.setUser, props.setSnackBar)}>
                <div className="login-form-row">
                    <label className="landing-input-container">
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
                    Log In
                </button>
            </form>
            <button className="link-button"> Log In With Google </button>

            <button className="back-button" onClick={props.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
            </button>
        </div>
    )
}