import Axios from 'axios'
import React from 'react'
import './Status.scss'

export default class Status extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            status: this.props.status,
            frame: 'question',
            newStatus: ''
        }
    }

    handleChange = (e) => {

        this.setState({newStatus: e.target.value})
    }

    triggerYes = () => {
        // trigger third panel
        this.setState({
            frame: 'text'
        })
    }

    triggerNo = () => {
        // trigger second panel
        let status

        if(this.props.status === 'healthy'){
            status = 'positive'
        } else {
            status = 'healthy'
        }

        this.setState({
            frame: 'update',
            newStatus: status
        })
    }

    triggerUpdate = () => {
        // POST STATUS UPDATE 
        if(this.state.newStatus !== this.props.status){
            Axios.post(`${process.env.server_url || ""}api/users/status`, {
                "status": this.state.newStatus,
                "userID": this.props.userID
            }).then( (res) => {

            })
        }
        this.setState({
            frame: 'text'
        })
    }

    getStatus = (status) => {
        if(status === 'healthy'){
            return 'healthy?'
        } else if (status === 'positive'){
            return 'symptoms?'
        } else if (status === 'unwell'){
            return 'unwell?'
        }
    }

    renderQuestion = () => {
        return(
            <div className="item-container container status">
                <h2 className="status-text">
                    Are you still feeling {this.getStatus(this.props.status)}
                </h2>
                <div className="status-buttons">
                    <button className="status-button round-button yes" onClick={this.triggerYes}> Yes </button>
                    <button className="status-button round-button no" onClick={this.triggerNo} > No </button>
                </div>
            </div>
        )
    }

    renderUpdate = () => {
        return (
            <div className="item-container container status">
                <h2 className="status-text">
                    How are you feeling?
                </h2>
                <div className="status-options">
                    <select className="status-select" value={this.state.newStatus} onChange={this.handleChange}>
                        <option value="healthy"> I'm feeling healthy</option> 
                        <option value="positive"> I tested positive for Covid-19</option>
                    </select>
                    <div className="status-buttons">
                        <button className="status-button round-button yes" onClick={this.triggerUpdate}> Update </button>
                    </div>
                </div>
                
            </div>
        )
    }

    renderText = () => {
        if ((this.props.status === 'healthy' && this.state.newStatus === 'positive') || (this.state.newStatus === '' && this.props.status === 'positive'))  {
            return (
                <div className="item-container container status text">
                    <h2 className="status-text ">
                        We're sorry to hear that.
                    </h2>
                    <h2 className="status-text ">
                        Feel better soon!
                    </h2>
                </div>
            )
        } else if(this.state.newStatus === '' && this.props.status === 'healthy') {
            return (
                <div className="item-container container status text">
                    <h2 className="status-text ">
                        That's great to hear! 
                    </h2>
                    <h2 className="status-text ">
                        Keep up the good work.
                    </h2>
                </div>
            )
        } else if (this.props.status === 'positive' && this.state.newStatus === 'healthy'){
            return (
                <div className="item-container container status text">
                    <h2 className="status-text ">
                        That's great! 
                    </h2>
                    <h2 className="status-text ">
                        Glad you're feeling better
                    </h2>
                </div>
            )
        } else if (this.state.newStatus === 'positive'){
            return (
                <div className="item-container container status text">
                    <h2 className="status-text ">
                        We're sorry to hear that.
                    </h2>
                    <h2 className="status-text ">
                        Feel better soon!
                    </h2>
                </div>
            )
        } else{
            return (
                <div className="item-container container status text">
                    <h2 className="status-text ">
                        That's great to hear! 
                    </h2>
                    <h2 className="status-text ">
                        Keep up the good work.
                    </h2>
                </div>
            )
        }
    }

    render(){
        if (this.state.frame === 'question'){
            return(
                this.renderQuestion()
            )
        } else if (this.state.frame === 'update'){
            return(
                this.renderUpdate()
            )
        } else if (this.state.frame === 'text'){
            return(
                this.renderText()
            )
        }
        
    }
}