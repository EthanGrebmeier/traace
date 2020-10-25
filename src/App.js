import React, {useState} from 'react';
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
      mainFrame: "sessions"
    }
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

          <Status/>

          <Buttons buttonPress={this.buttonPress}/>
    
        </div>

        <div className="bottom-row">
          <div className="main-frame container">
            <div className={`close-bar ${this.state.mainFrame === "sessions" ? `hide-bar` : `show-bar`}`}> 
              <button className={`close-button` } onClick={() => this.buttonPress('sessions')}>
                <img src={close} alt="" className="close-icon"/>
              </button>
            </div>
            {this.renderMainFrame()}
          </div>
        </div>
      </div>
    );
  }
}

