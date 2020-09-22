import React, { Component } from 'react'
import Header from './Header'
import ApiService from '../Service/ApiService'
import '../Styles/RestaurantDetails.css'
import sentosa from '../Images/sentosa.jpg'

export class RestaurantDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            restaurantDetails: {},
            restaurantDetailsArray: [],
            opentime: '00:00',
            closetime: '00:00',
            isLoaded: false,
            img: ''

        }


        ApiService.getRestaurantById(this.state.id).then(res => {
            if (res.status === 200) {
                this.setState({ restaurantDetails: res.data })
                console.log(this.state.restaurantDetails)
            }
        }).catch(error => console.log(error))


    }

    componentDidMount() {

        ApiService.getRestaurantById(this.state.id).then(res => {
            if (res.status === 200) {
                this.setState({ restaurantDetails: res.data })
                this.setState({ isLoaded: true })
                console.log(this.state.restaurantDetails)
            }
        }).catch(error => console.log(error))



    }

    render() {

        const isloaded = this.state.isLoaded
        if (isloaded) {


            var restaurantDetails = this.state.restaurantDetails
            const img = `../Images/${restaurantDetails.menu}`;
            console.log(img)
            return (

                <div >
                    <div id="header"><Header /></div>

                    {console.log("REstaurant Details : " + this.state.restaurantDetails.name)}

                    <img src="file:///Users/yogesh/Documents/WishTreeAssignment/zonion/public/sentosa.jpg" />

                    <div className="box" style={{ marginLeft: '130px', marginTop: '60px', textAlign: 'center', backgroundColor: 'lightgrey', width: '80%' }}>

                        <div className="form-group row">
                            <label className="col-form-label col-4">Name</label>
                            <div className="col-6">

                                <input type="text" className="form-control" name="RestaurantName" value={restaurantDetails.name} onChange={this.onchange} required="required" />
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-form-label col-4"> Address</label>
                            <div className="col-6">
                                <input type="text" className="form-control" name="Address" value={restaurantDetails.address} onChange={this.onchange} required="required" />
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-form-label col-4">Open Time</label>
                            <div className="col-6">
                                <input type="text" id="opentime" className="form-control" name="opentime" value={restaurantDetails.opentime} onChange={this.onchange} required="required" />

                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-form-label col-4">Close Time</label>
                            <div className="col-6">
                                <input type="text" id="closetime" className="form-control" name="closetime" value={restaurantDetails.closetime} onChange={this.onchange} required="required" />

                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-form-label col-4">Phone No.</label>
                            <div className="col-6">
                                <input type="text" className="form-control" name="PhoneNo" value={restaurantDetails.phnno} onChange={this.onchange} required="required" />
                            </div>
                        </div>

                    </div>

                </div>


            )

        }
        else {
            return <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>Page Loading ...... !!!</h2>
            </div>
        }
    }
}

export default RestaurantDetails
