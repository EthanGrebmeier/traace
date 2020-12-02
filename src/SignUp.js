import React from 'react'

import './Login.scss'

import leftArrow from './images/left-arrow.png'
import Axios from 'axios';

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
  console.log(email)
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

function checkForCapital(password){
    for (let i = 0; i < password.length; i++){
        let charCode = password.charCodeAt(i)
        if (charCode > 64 && charCode < 90){
            return true
        }
    }
    return false
}

function checkForNumber(password){
    for (let i = 0; i < password.length; i++){
        let charCode = password.charCodeAt(i)
        if (charCode > 47 && charCode < 58){
            return true
        }
    }
    return false
}

function checkSignUpForm(event, firstName, lastName, email, password, confirmPassword, setUser, setSnackBar, setLoginButtonText){
    event.preventDefault()
    if (firstName === "" ){
        setSnackBar("First Name must not be empty")
    } else if (lastName === ""){
        setSnackBar("Last Name must not be empty")
    } else if (email === ""){
        setSnackBar("Email must not be empty")
    } else if (password === ""){
        setSnackBar("Password must not be empty")
    } else if (confirmPassword === ""){
        setSnackBar("Confirm Password must not be empty")
    } else if (!isEmailValid(email)){
        setSnackBar("Please input a valid email")
    } else if (confirmPassword !== password){
        setSnackBar("Password & Confirm Password do not match")
    } else if (password.length < 7){
        setSnackBar("Password must be 7 characters or longer")
    } else if (!checkForCapital(password)){
        setSnackBar("Password must have a capital letter")
    } else if (!checkForNumber(password)){
        setSnackBar("Password must have a number")
    } else {
        registerRequest(firstName, lastName, email, password, setUser, setSnackBar, setLoginButtonText)
    }
}

let registerRequest = (firstName, lastName, email, password, setUser, setSnackBar, setLoginButtonText) => {
    setLoginButtonText("Loading")
    Axios.post('https://contact-tracing-server.herokuapp.com/api/authenticate/register', {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        }).then((res) => {
            setLoginButtonText("Sign Up")
            console.log(res)
            let userID = res["data"]["userID"]
            console.log(userID)
            if (userID){
                setUser(res["data"])
            } else {
                setSnackBar(res["data"], "warning")
            }
            
        }).catch(err => {
            setLoginButtonText("Sign Up")
            console.log(err)
        })
}


export default function SignUp(props){

    let [signUpFirstName, setsignUpFirstName] = React.useState("")
    let [signUpLastName, setSignUpLastName] = React.useState("")
    let [signUpEmail, setsignUpEmail] = React.useState("")
    let [signUpPassword, setSignUpPassword] = React.useState("")
    let [signUpPasswordConfirm, setSignUpPasswordConfirm] = React.useState("")
    let [loginButtonText, setLoginButtonText] = React.useState("Sign Up")

    return (
        <div className="login">
            <h1 className="login-header"> Sign Up </h1>
            <form className="login-form" onSubmit={(event) => checkSignUpForm(event, signUpFirstName, signUpLastName, signUpEmail, signUpPassword, signUpPasswordConfirm, props.setUser, props.setSnackBar, setLoginButtonText)}>
                <div className="login-form-row">
                    <label className="landing-input-container">
                        First Name
                        <input type="text" className="landing-input" onChange={(e) => {setsignUpFirstName(e.target.value)}}>
                        </input>
                    </label>
                    <label className="landing-input-container">
                        Last Name
                        <input type="text" className="landing-input" onChange={(e) => {setSignUpLastName(e.target.value)}}>
                        </input>
                    </label>
                </div>

                <label className="landing-input-container email-row">
                        Email
                        <input type="text" className="landing-input" onChange={(e) => {setsignUpEmail(e.target.value)}}>
                        </input>
                </label>

                <div className="login-form-row">
                    <label className="landing-input-container">
                        Password
                        <input type="password" className="landing-input" onChange={(e) => {setSignUpPassword(e.target.value)}}>
                        </input>
                    </label>
                    <label className="landing-input-container">
                        Confirm Password
                        <input type="password" className="landing-input" onChange={(e) => {setSignUpPasswordConfirm(e.target.value)}}>
                        </input>
                    </label>
                </div>
                <button submit className="square-button yes submit-login-button">
                    {loginButtonText}
                </button>
            </form>

            { /* <button className="link-button"> Register With Google </button> */}

            <button className="back-button" onClick={props.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
            </button>
        </div>
    )
}