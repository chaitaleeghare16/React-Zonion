import React, { Component } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import Header from './Header'
import ApiService from '../Service/ApiService'
import AddRestaurantDetails from './AddRestaurantDetails'
import moment from 'moment'
import UpdateRestaurant from './UpdateRestaurant'

export class ManageRestaurantPage extends Component {
    constructor(props) {
        super(props)
        var admintoken = sessionStorage.getItem('admintoken')
        this.state = {
            restaurantDetails: [],
            isAdminLoggedIn: admintoken,
            Editdata: {}

        }
    }
    HandleEdit = (id) => {
        var id = id
        this.props.history.push(`/updaterestaurant/${id}`)

    }


    HandleDelete = (event, id) => {
        event.preventDefault();
        var id = id;
        if (this.state.isAdminLoggedIn) {
            ApiService.deleteRestaurantById(id).then(res => {
                if (res.status === 200) {
                    alert('deleted....')
                }
            }).catch(error => console.log(error))
        }
    }


    componentDidMount() {
        if (this.state.isAdminLoggedIn) {
            ApiService.getRestaurant().then(res => {
                if (res.status === 200) {
                    this.setState({ restaurantDetails: res.data })
                    console.log(this.state.restaurantDetails)
                }
            }).catch(error => console.log(error))
        }
    }
    render() {
        if (this.state.isAdminLoggedIn) {
            return (
                <div>
                    <div><Header /></div>

                    <div style={{ textAlign: 'center', color: 'violet', fontStyle: 'italic' }}>
                        <h4>Welcome  (Admin)</h4>
                    </div>
                    <div><Link to='/addrestaurant' className="btn btn-primary">Add Restaurant</Link></div>
                    <h2 className="text-center" style={{ color: 'blue' }}>Restaurant Details</h2>

                    <table className="table table-striped">

                        <tr>
                            <th className="hidden"></th>

                            <th>Reasturant Name</th>
                            <th>Open Time</th>
                            <th>Close Time</th>

                            <th>Last Updated Time</th>

                            <th colSpan="4">Action</th>

                        </tr>


                        {
                            this.state.restaurantDetails == null ? 'Details not available' : this.state.restaurantDetails.map(data => (
                                <tr key={data.id}>
                                    <td></td>
                                    <td>{data.name}</td>
                                    <td>{data.opentime}</td>
                                    <td>{data.closetime}</td>
                                    {console.log("time is :" + (data.time))}

                                    <td>{moment(data.updatedts).format("DD/MM/YYYY, h:mm:ss a")}</td>

                                    <td></td>




                                    {/* <td><button  className="btn btn-success" >Activate</button></td>
                    <td><button className="btn btn-danger" >Deactivate</button></td> */}
                                    <td><button className="btn btn-primary" onClick={() => this.HandleEdit(data.id)}>Edit</button></td>
                                    <td><button className="btn btn-danger" onClick={(event) => this.HandleDelete(event, data.id)}>Delete</button></td>
                                </tr>
                            ))}

                    </table>

                </div>
            )
        } else {
            return <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>Only Admin Can Access !!!</h2>
            </div>
        }
    }
}

export default ManageRestaurantPage
