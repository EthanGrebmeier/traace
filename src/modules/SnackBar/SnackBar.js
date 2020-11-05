import React from 'react'
import './SnackBar.scss'


export default function SnackBar(props){
    console.log("snack")
    return (
        <div className="snackbar-container">
            <p className="snackbar-text">
                This is a test
            </p>
            <button className="snackbar-close">

            </button>
        </div>
    )
}