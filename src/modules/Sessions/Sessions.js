import React from 'react'
import './Sessions.scss'
import axios from 'axios'
import SessionsContainer from './SessionsContainer'



export default class Sessions extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            placesOpen: true,
            peopleOpen: false,
            placesData: [],
            peopleData: [],
        }
    }

    componentDidMount(){
        
        if(this.props.userID){

            this.getSessions()
        }
        
    }

    openSection = (event, id) => {
        let container = event.target.id

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
        axios.get(`${process.env.server_url || ""}api/sessions/${this.props.userID}`).then((res) => {
            this.setState({
                placesData: res["data"]["Locations"],
                peopleData: res["data"]["Users"]
            })
        })
    }

    render(){
        return(
            <div className="item-container sessions">
                <SessionsContainer 
                    header="Places Visited" 
                    id="places" 
                    open={this.state.placesOpen} 
                    arrowClick={this.openSection} 
                    sessions={this.state.placesData} 
                    name="Location Name" 
                    userID={this.props.userID}
                    setSnackBar={this.props.setSnackBar}
                    getSessions={this.getSessions}
                />
                <SessionsContainer 
                    header="People Seen" 
                    id="people" 
                    open={this.state.peopleOpen} 
                    arrowClick={this.openSection} 
                    sessions={this.state.peopleData} 
                    name="Name"
                    userID={this.props.userID}
                    setSnackBar={this.props.setSnackBar}
                    getSessions={this.getSessions}
                />
            </div>
        )
    }
}