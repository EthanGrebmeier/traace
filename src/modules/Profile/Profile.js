import React from 'react'
import './Profile.scss'
import menu from '../../images/menu.png'
import Button from '../Buttons/Button'


export default class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            burgerClicked: false,

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

                    <div className="profile-left-col">
                        {this.timeOfDay()}
                        <h1 className="profile-name">
                            Ethan
                        </h1>
                        <div className="burger-buttons">
                            <Button name="Friends" id="friends" clickFunction={this.props.buttonPress}/>
                            <Button name="Notifications" id="notifications" clickFunction={this.props.buttonPress}/>
                            <Button name="About" id="about" clickFunction={this.props.buttonPress}/>
                        </div>
                    </div>

                    <div className="profile-right-col">
                        <button onClick={this.toggleBurger} className="toggle-burger">
                            <img className="menu-burger" src={menu} alt=""/>
                        </button> 
                    </div>

                </div>
            </div>
            
    )}
}




