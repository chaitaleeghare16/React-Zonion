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
    //event called on restaurant image click
    HandleImage = (hotel_id) => {

        var id = hotel_id
        console.log(id)

        //after onClick on image Homepage  component redirect to Restaurantdetail
        //component and show the details of that particular restaurant
        this.props.history.push(`/restaurantdetail/${id}`)
    }

    componentWillMount() {
        //giva a call to API to get Restaurant Details
        ApiService.getRestaurant().then(res => {
            if (res.status === 200) {
                //in response get restaurants data  and store in state restaurantDetails of type array
                this.setState({ restaurantDetails: res.data })
            }
        }).catch(error => console.log(error))

    }



    render() {
        var restaurantDetails = this.state.restaurantDetails


        return (
            <div >

                {/* show the restaurant image with its name */}
                <div id="header"><Header /></div>
                <div class="container" style={{ padding: '20px' }}>
                    {/* calling map function to retreive the restaurant details from restaurantDetails Array */}
                    {restaurantDetails.map(hotels => (

                        <span key={hotels.id}>
                            <span >
                                <span >

                                    <button onClick={() => this.HandleImage(hotels.id)}>

                                        <img src={hotels.restaurant_img} className="img" width="140" />
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


