import React from 'react'
import './More.scss'

export default class More extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }



    render(){
        return(
            <div className="more">
                <div className="more-content">
                    <div className="main-header">
                        <h2 className="main-title"> More </h2>
                    </div>
                    <div className="more-body">
                        <p>
                            Please email any questions or suggestions to Traacehelp@Gmail.com
                        </p>

                        <p>
                            A lot of time and effort went into making this website. If you want to support me so that I can keep making apps like this one, consider <a href="https://www.buymeacoffee.com/ethangrebmeier"> buying me a coffee! </a>
                        </p>
                        <button className="square-button no" onClick={() => this.props.handleLogout()}>
                            Log Out
                        </button>
                    </div>  
                </div>
            </div>
        )
    }
}