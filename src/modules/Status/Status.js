import React from 'react'
import './Status.scss'

export default class Status extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    triggerYes = () => {

    }

    triggerNo = () => {

    }


    render(){
        return(
            <div className="item-container container status">
                <h2 className="status-text">
                    Are you still feeling healthy?
                </h2>
                <div className="status-buttons">
                    <button className="status-button round-button yes" onClick={this.triggerYes}> Yes </button>
                    <button className="status-button round-button no" onClick={this.triggerNo} > No </button>
                </div>
            </div>
        )
    }
}