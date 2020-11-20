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
                        <button className="square-button no" onClick={() => this.props.handleLogout()}>
                            Log Out
                        </button>
                    </div>  
                </div>
            </div>
        )
    }
}