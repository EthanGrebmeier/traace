import React from 'react';
import Axios from 'axios';
import './App.scss';

import close from './images/close.png'
 
import Profile from './modules/Profile/Profile';
import Status from './modules/Status/Status';
import Buttons from './modules/Buttons/Buttons'
import Sessions from './modules/Sessions/Sessions'
import Notifications from './modules/Notifications/Notifications'
import About from './modules/About/About'
import FriendsList from './modules/FriendsList/FriendsList'


export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      mainFrame: "sessions",
      user: {}
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = () => {
    Axios.get(`https://contact-tracing-server.herokuapp.com/api/users/${2}`).then((res) => {
      console.log(res)
      this.setState({
        user: res["data"]["user"]
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
        return(
          <Sessions/>
        )
      case ("friends"):
        return <FriendsList/>
      case ("notifications"):
        return <Notifications/>
      case ("about"):
        return <About/>
      default:
        return(
          <Sessions/>
        )
    }
  }

  render(){
    return (
      <div className="app-container">
        <div className="top-row">
          
          <Profile buttonPress={this.buttonPress}/>

          <Status status={this.state.user.status} userID={this.state.user.id}/>

          <Buttons buttonPress={this.buttonPress}/>
    
        </div>

        <div className="bottom-row">
          <div className="main-frame container">
            <button className={`close-button ${this.state.mainFrame === "sessions" ? `hide-close` : `show-close`}` } onClick={() => this.buttonPress('sessions')}>
              <img src={close} alt="" className="close-icon"/>
            </button>
            {this.renderMainFrame()}
          </div>
        </div>
      </div>
    );
  }
}

