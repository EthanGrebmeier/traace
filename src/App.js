import React from 'react';
import Axios from 'axios';

import close from './images/close.png'
 
import Profile from './modules/Profile/Profile';
import Status from './modules/Status/Status';
import Buttons from './modules/Buttons/Buttons'
import Sessions from './modules/Sessions/Sessions'
import Notifications from './modules/Notifications/Notifications'
import More from './modules/More/More'
import FriendsList from './modules/FriendsList/FriendsList'

import SnackBar from './modules/SnackBar/SnackBar'


export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      mainFrame: "sessions",
      user: {},
      loading: true,
      snackBar: false,
      snackBarMessage: "",
      snackBarStatus: "",
    }
  }

  componentDidMount(){
    Axios.defaults.headers.common['x-access-token'] = sessionStorage.getItem("accessToken")
    console.log(sessionStorage.getItem("accessToken"))
    this.getUser()
  }

  getUser = () => {
    Axios.get(`https://contact-tracing-server.herokuapp.com/api/users/${this.props.userID}`).then((res) => {
      console.log(res)
      this.setState({
        user: res["data"]["user"],
        loading: false,
      })
    })
  }

  buttonPress = (id) => {
    this.setState({
      mainFrame: id
    })
  }

  renderMainFrame = () => {
    switch (this.state.mainFrame){
      case ("sessions"):
        console.log(this.state.user)
        return(
          <Sessions 
            userID={this.state.user["id"]}
            setSnackBar={this.setSnackBar}
          />
        )
      case ("friends"):
        return <FriendsList 
          userID={this.state.user["id"]} 
          setSnackBar={this.setSnackBar}
        />
      case ("notifications"):
        return <Notifications 
          userID={this.state.user.id}
          setSnackBar={this.setSnackBar}
        />
      case ("more"):
        return <More handleLogout={this.props.handleLogout} />
      default:
        return(
          <Sessions userID={this.state.user["id"]}/>
        )
    }
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

  render(){
    if(!this.state.loading){
      return (
        <div className="app-container">
          <div className="top-row">
            
            <Profile buttonPress={this.buttonPress} name={this.state.user["name"]}/>
  
            <Status status={this.state.user.status} userID={this.state.user.id}/>
  
            <Buttons buttonPress={this.buttonPress}/>
      
          </div>
  
          <div className="bottom-row">
            <div className="main-frame container">
              <button className={`close-button ${this.state.mainFrame === "sessions" ? `hide-close` : `show-close`}` } onClick={() => this.buttonPress('sessions')}>
                <img src={close} alt="" className="close-icon"/>
              </button>
              {this.renderMainFrame()}
              {this.renderSnackBar()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <div className="bottom-row">
            <div className="main-frame container">
              <h1> LOADING... </h1>
            </div>
          </div>
        </div>
      )
    }
    
  }
}

