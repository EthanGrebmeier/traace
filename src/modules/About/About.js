import React from 'react'
import './About.scss'

export default class About extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }


    render(){
        return(
            <div className="about">
                <div className="about-content">
                    <div className="main-header">
                        <h2 className="main-title"> About </h2>
                    </div>
                </div>
            </div>
        )
    }
}