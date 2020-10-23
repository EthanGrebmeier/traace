import React from 'react'


export default function Button(props){
    return(
        <button className="round-button menu-button" onClick={() => props.clickFunction(props.id)}>
            {props.name}
        </button>
    )
}
