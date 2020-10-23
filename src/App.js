import React, {useState} from 'react';
import './App.scss';

import close from './images/close.png'
 
import Profile from './modules/Profile/Profile';
import Status from './modules/Status/Status';
import Buttons from './modules/Buttons/Buttons'
import Sessions from './modules/Sessions/Sessions'

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

  renderClose = () => {
    switch (this.state.mainFrame){
      case ("sessions"):
        return(
          <div className="main-close-bar">
            
          </div>
        )
      default:
        return(
          <div className="main-close-bar">
            <button className="close-main-button">
              <img className="close-image" alt=""/>
            </button>
          </div>
        )
    }
  }

  renderMainFrame = () => {
    switch (this.state.mainFrame){
      case ("sessions"):
        return(
          <Sessions/>
        )
      case ("friends"):
        return <FriendsList/>
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
          {this.renderMainFrame()}
        </div>
      </div>
    );
  }
}

