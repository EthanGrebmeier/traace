import React from 'react'
import Axios from 'axios'

import SearchLocationInput from '../SearchLocationInput/SearchLocationInput'

import leftArrow from '../../images/left-arrow.png'

import './NewSession.scss'

export default class NewPeopleSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: "",
            confirm: false,
            location: "",
            timeIn: "",
            timeOut: "",

        }
    }

    componentDidMount(){

    }

    getMinDate = () => {
        let twoWeeks = new Date()
        twoWeeks.setDate(twoWeeks.getDate() - 14)
        return `${twoWeeks.getUTCFullYear()}-${twoWeeks.getUTCMonth() + 1}-${twoWeeks.getUTCDate()}`
    }

    getMaxDate = () => {
        let today = new Date()
        today.setDate(today.getDate())
        return `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`
    }

    getFormattedTime = (time) => {
        let date = new Date()
        let timeSplit = time.split(":")
        date.setHours(timeSplit[0])
        date.setMinutes(timeSplit[1])
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    checkDateOrder = () => {

        // RETURNS TRUE IF THE TIME ORDER IS BACKWARDS

        let timeInSplit = this.state.timeIn.split(":")
        let timeOutSplit = this.state.timeOut.split(":")
        let timeIn = new Date(this.state.date)
        let timeOut = new Date(this.state.date)
        timeIn.setHours(timeInSplit[0])
        timeIn.setMinutes(timeInSplit[1])
        timeOut.setHours(timeOutSplit[0])
        timeOut.setMinutes(timeOutSplit[1])
        if (timeIn < timeOut){
            return false
        }
        return true
    }

    setLocation = (location) => {
        this.setState({
            location: location
        })
    }

    handleTimeChange = (event) => {
        if (event.target.id === "time-in"){
            this.setState({
                timeIn: event.target.value
            })
        } else {
            this.setState({
                timeOut: event.target.value
            })
        }
        
    } 

    handleDateChange = (event) => {
        this.setState({
            date: event.target.value
        })
    } 

    handleBack = () => {
        if(this.state.confirm){
            this.setState({
                confirm: false
            })
        } else {
            this.props.changeScene("sessions")
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.location === ""){
            this.props.setSnackBar("Please select a location", "warning")          
        } else if(this.state.date === ""){
            this.props.setSnackBar("Please enter a date", "warning")
        } else if(new Date(this.state.date).setHours(0) > new Date().setHours(23)) {
            this.props.setSnackBar("Date can't be in the future", "warning")
        } else if(this.state.timeIn === "" || this.state.timeOut === "") {
            this.props.setSnackBar("Please input the times of the visit", "warning")
        } else if(this.checkDateOrder()) {
            this.props.setSnackBar("Time out must come after time in", "warning")
        } else {

            this.setState({confirm: true})
        }
    }

    handleConfirm = (event) => {
        event.preventDefault()
        // ADD SESSION STUFF LATER
        let timeInSplit = this.state.timeIn.split(":")
        let timeOutSplit = this.state.timeOut.split(":")
        let timeIn = new Date(this.state.date)
        let timeOut = new Date(this.state.date)
        timeIn.setHours(timeInSplit[0])
        timeIn.setMinutes(timeInSplit[1])
        timeOut.setHours(timeOutSplit[0])
        timeOut.setMinutes(timeOutSplit[1])
   
        Axios.post(`${process.env.server_url || ""}api/sessions/locations/`, {
            userID: this.props.userID,
            locationID: this.state.location["place_id"],
            locationName: this.state.location["name"],
            date: this.state.date,
            timeIn: this.state.timeIn,
            timeOut: this.state.timeOut
        }).then( res => {
            if (res.status === 200){
                this.props.getSessions()
                this.props.changeScene("sessions")
                this.props.setSnackBar("Success!", "success")
            } else {
                this.props.setSnackBar("Something Went Wrong", "critical")
            }
        }).catch( (err) => {
            console.log(err)
            this.props.setSnackBar("Something Went Wrong", "critical")
        } )
        
        
    }

    renderFormConfirm = () => {
        if (!this.state.confirm){
            return(
                <form className="new-session-form" onSubmit={this.handleSubmit}>

                    <label className="new-session-input">
                        Select a Location
                        <SearchLocationInput setLocation={this.setLocation} />
                    </label>

                    <label className="new-session-input">
                        Date of Visit
                        <input type="date" min={this.getMinDate()} max={this.getMaxDate()} onChange={this.handleDateChange}>

                        </input>
                    </label>

                    <div className="time-row">
                        <label className="new-session-input">
                            Time Arrived
                            <input type="time" onChange={this.handleTimeChange} id="time-in">

                            </input>
                        </label>
                        <label className="new-session-input">
                            Time of Departure
                            <input type="time" onChange={this.handleTimeChange} id="time-out">

                            </input>
                        </label>
                    </div>

                    <button type="submit" className="square-button accept-button">
                        Submit
                    </button>
                    
                </form>
            )
        } else {
            return (
                <form className="new-session-form" onSubmit={this.handleConfirm}>
                    <div className="confirm">
                        <p className="confirm-text">
                            {this.state.location.name}
                        </p>
                        <p className="confirm-text">
                            on
                        </p>
                        <p className="confirm-text">
                            {this.state.date}
                        </p>
                        <p className="confirm-text">
                            between 
                        </p>
                        <p className="confirm-text">
                            {this.getFormattedTime(this.state.timeIn)} and {this.getFormattedTime(this.state.timeOut)}
                        </p>
                    </div>
                    

                    <button className="square-button accept-button">
                        Confirm
                    </button>
                </form>
            )
        }
        
    }

    render(){
        return(
            <div className='new-session'>
                <p className="new-session-prompt"> Where did you go?</p>

                {this.renderFormConfirm()}

                <button className="form-back-button session-back" onClick={this.handleBack}>
                    <img src={leftArrow} alt="" className="back-arrow" />
                    BACK
                </button>
            </div>
        )
    }
}