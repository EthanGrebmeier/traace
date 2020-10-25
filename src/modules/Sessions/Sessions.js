import React from 'react'
import './Sessions.scss'
import axios from 'axios'
import SessionsContainer from './SessionsContainer/SessionsContainer'



export default class Sessions extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            placesOpen: true,
            peopleOpen: false,
            placesData: ["test"],
            peopleData: ["test23"],
        }
    }

    componentDidMount(){
        this.getSessions()
    }

    openSection = (event, id) => {
        let container = event.target.id
        console.log(container)
        let places = this.state.placesOpen
        let people = this.state.peopleOpen

        if(container.includes("places")){
            places = !places
            if(people){
                people = false
            }
        } else {
            people = !people
            if(places){
                places = false
            }
        }

        this.setState({
            placesOpen: places,
            peopleOpen: people
        })
    }

    getSessions = () => {
        axios.get(`https://contact-tracing-server.herokuapp.com/api/sessions/2`).then((res) => {
            console.log(res)
            this.setState({
                placesData: res["data"]["Locations"],
                peopleData: res["data"]["Users"]
            })
        })
    }

    render(){
        return(
            <div className="item-container sessions">
                <SessionsContainer header="Places Visited" id="places" open={this.state.placesOpen} arrowClick = {this.openSection} sessions={this.state.placesData}/>
                <SessionsContainer header="People Seen" id="people" open={this.state.peopleOpen} arrowClick = {this.openSection} sessions={this.state.peopleData}/>
            </div>
        )
    }
}