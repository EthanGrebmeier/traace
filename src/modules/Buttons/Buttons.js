import React from 'react'
import Button from './Button'
import './Buttons.scss'

export default class Buttons extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className="item-container container menu-buttons">
                <Button name="Friends" id="friends" clickFunction={this.props.buttonPress}/>
                <Button name="Notifications" id="notifications" clickFunction={this.props.buttonPress}/>
                <Button name="About" id="about" clickFunction={this.props.buttonPress}/>
            </div>
        )
    }
}