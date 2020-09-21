import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Header.css'
import logo from '../Images/logo.png'



export class Header extends Component {
    render() {
        return (
            <div id='header'>
                 <span>
                    <img src={logo} id="logo"/>
                    </span><span id='logoname'>Zonion</span>
                 <span id='home'>
                    <Link to='/home'>Home</Link>
                    </span>

                    <span id='aboutus'>
                    <Link to='/aboutus'>AboutUs</Link>
                </span>

                <span id='contactus'>
                    <Link to='/contactus'>ContactUs</Link>
                </span> 

                <span id='logout'>
                    <Link to='/logout' id="logoutbtn"className="btn btn-danger">Logout</Link>
                </span>

            </div>
        )
    }
}

export default Header
