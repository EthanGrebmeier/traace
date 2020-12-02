import React from 'react'
import Button from './Button'
import './Buttons.scss'

export default class Buttons extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
    }
    render(){
        return(
            <div className="item-container container menu-buttons">
                <Button name="Friends" id="friends" clickFunction={this.props.buttonPress} mainFrame={this.props.mainFrame}/>
                <Button name="Notifications" id="notifications" clickFunction={this.props.buttonPress} mainFrame={this.props.mainFrame} />
                <Button name="More" id="more" clickFunction={this.props.buttonPress} mainFrame={this.props.mainFrame} />
            </div>
        )
    }
}