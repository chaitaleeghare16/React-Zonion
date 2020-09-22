import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LogOut extends Component {
    constructor() {
        super()
        const admintoken = sessionStorage.getItem("admintoken")

        if (admintoken != null) {
            sessionStorage.removeItem("admintoken")

        }

    }
    render() {
        return (
            <div>
                <Redirect to="/home" ></Redirect>
            </div>
        )
    }
}

export default LogOut