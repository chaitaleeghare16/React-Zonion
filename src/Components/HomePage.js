import React from 'react'

import { Link, Redirect } from 'react-router-dom'
import Header from './Header'

import ApiService from '../Service/ApiService'

export class HomePage extends React.Component {
    constructor(props) {
        var admintoken = sessionStorage.getItem('admintoken')
        super(props)

        this.state = {
            restaurantDetails: [],
            isAdminLoggedIn: admintoken,
        }
    }

    HandleImage = (hotel_id) => {

        var id = hotel_id
        console.log(id)
        this.props.history.push(`/restaurantdetail/${id}`)
    }

    componentWillMount() {

        ApiService.getRestaurant().then(res => {
            if (res.status === 200) {
                this.setState({ restaurantDetails: res.data })
            }
        }).catch(error => console.log(error))

    }



    render() {
        var restaurantDetails = this.state.restaurantDetails


        return (
            <div >


                <div id="header"><Header /></div>
                <div class="container" style={{ padding: '20px' }}>
                    {restaurantDetails.map(hotels => (

                        <span key={hotels.id}>
                            <span >
                                <span >

                                    <button onClick={() => this.HandleImage(hotels.id)}>

                                        <img src={hotels.restaurant_img} className="githubIcon" width="140" />
                                        {console.log(hotels.menu)}
                                        <div class="caption">
                                            <p>{hotels.name}</p>
                                        </div>
                                    </button>{" "}

                                </span>
                            </span>
                        </span>

                    )
                    )}

                </div>

            </div>
        )
    }

}

export default HomePage


