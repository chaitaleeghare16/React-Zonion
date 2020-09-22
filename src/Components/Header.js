import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Header.css'
import logo from '../Images/logo.png'


export class Header extends Component {
    constructor(props) {

        var admintoken = sessionStorage.getItem('admintoken')
        super(props)

        this.state = {
            isAdminLoggedIn: admintoken,
        }
    }

    render() {
        console.log(this.state.isAdminLoggedIn)
        return (
            <div id='header'>

                <span>
                    <img src={logo} id="logo" />
                </span><span id='logoname'>Zonion</span>
                <span id='home'>
                    <Link to='/home'>Home</Link>
                </span>


                {
                    this.state.isAdminLoggedIn ?
                        <span id='logout'>
                            <Link to='/managerestaurant' id="goback">ManageResturant</Link>
                            <Link to='/logout' id="logoutbtn" className="btn btn-danger">Logout</Link>

                        </span> : <span id='login'>

                            <Link to='/login' id="loginbtn" className="btn btn-primary">Login</Link>
                        </span>
                }

            </div>
        )
    }
}

export default Header
