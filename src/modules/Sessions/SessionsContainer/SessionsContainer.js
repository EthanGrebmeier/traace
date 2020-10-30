import React from 'react'
import './SessionsContainer.scss'
import down from '../../../images/arrow-down.png'


export default class SessionsContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            header: this.props.header,
            type: this.props.id,
        }
    }

    renderSessions = () => {
        return(
            this.props.sessions
            .map((session) => {
                return(
                    <div className="table-row">
                            <p className="table-header-section name ">{session["name"]}</p>
                            <p className="table-header-section date "> 10/1/20 </p>
                    </div>
                )
            })
            
        )
    }

    render(){
        return(
            <div className={`item-container container sessions-container ${this.props.open ? 'open' : 'closed'}`}>

                <button className="arrow-button header" onClick={this.props.arrowClick} id={`${this.state.type}-button`}>
                    <div className="header-container" id={`${this.state.type}-container`}>
                        <h2 id={`${this.state.type}-header`}> {this.state.header} </h2>
                        
                        <img src={down} alt="downward arrow" className="arrow-down" id={`${this.state.type}-down`} />
                    </div>
                   
                </button>
                
                <div className="sessions-table">
                    <div className="table-header"> 
                        <p className="table-header-section name"> {this.props.name}</p>
                        <p className="table-header-section date"> Date</p>
                    </div>

                    <div className="sessions-content">
                        {this.renderSessions()}
                    </div>
                </div>

                <button className="round-button add-button"> Add New </button>
            </div>
        )
    }
}