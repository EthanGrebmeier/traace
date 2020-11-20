import React from 'react'
import './Profile.scss'
import Button from '../Buttons/Button'


export default class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            burgerClicked: false,
            firstName: this.props.name.split(" ")[0],
        }
    }


    getNameSize = (name) => {
        if(name.length < 6){
            return "profile-name profile-name-large"
        } else if (name.length < 9) {
            return "profile-name profile-name-medium"
        } else {
            return "profile-name profile-name-small"
        }
    }

    toggleBurger = () => {
        let currentBurger = this.state.burgerClicked
        this.setState({
            burgerClicked: !currentBurger
        })
    }


    timeOfDay = () => {
        let date = new Date()
        let hour = date.getHours()

        if( hour < 5){
            return (
                <h2 className="profile-greeting">
                    Good Evening,
                </h2>
            )
        } else if( hour < 12){
            return (
                <h2 className="profile-greeting">
                    Good Morning,
                </h2>
            )
        } else if(hour < 17){
            return (
                <h2 className="profile-greeting">
                    Good Afternoon,
                </h2>
            )
        } else if(hour < 24){
            return (
                <h2 className="profile-greeting">
                    Good Evening,
                </h2>
            )
        }
    } 

    render(){
        return (
            <div className={`item-container container profile ${this.state.burgerClicked ? 'burger-opened' : 'burger-closed'}`}>
                <div className="profile-content">

                    {this.timeOfDay()}
                    <h1 className={this.getNameSize(this.state.firstName)}>
                        {this.state.firstName}
                    </h1>

                    <div className="burger-buttons">
                        <Button name="Friends" id="friends" clickFunction={this.props.buttonPress}/>
                        <Button name="Notifications" id="notifications" clickFunction={this.props.buttonPress}/>
                        <Button name="More" id="more" clickFunction={this.props.buttonPress}/>
                    </div>

                </div>
                <button onClick={this.toggleBurger} className={`toggle-burger ${this.state.burgerClicked ? 'toggle-burger-clicked' : ''}`}>
                    <div className="menu-burger">
                        <div className="burger-bar" id="burger-bar-one"></div>
                        <div className="burger-bar" id="burger-bar-two" ></div>
                        <div className="burger-bar" id="burger-bar-three"></div>
                    </div>
                    
                </button> 
            </div>
            
    )}
}




