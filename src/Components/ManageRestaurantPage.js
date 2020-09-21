import React, { Component } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import AdminPageHeader from './AdminPageHeader'
import ApiService from '../Service/ApiService'
import AddRestaurantDetails from './AddRestaurantDetails'

export class ManageRestaurantPage extends Component {
    constructor(props) {
        super(props)
        var admintoken=sessionStorage.getItem('admintoken')
        this.state = {
             restaurantDetails:[],
             isAdminLoggedIn:admintoken,
             Editdata:{}

        }
    }
    HandleEdit=(id)=>
    {
       var id=id
    //    var Editdata ={
    //        name:name,
    //        address:address,
    //        opentime:opentime,
    //        closetime:closetime,
    //        phnno:phnno
    //    }

       this.props.history.push(`/updaterestaurant/${id}`)
       
        

    }

    HandleDelete(id)
    {
        var id =id;
        if(this.state.isAdminLoggedIn){
        ApiService.deleteRestaurantById(id).then(res=>{
            if(res.status === 200)
            {
                alert('deleted....')
            }
            }).catch(error=>console.log(error))
        }
    }
    

    componentDidMount()
    {
        if(this.state.isAdminLoggedIn){
        ApiService.getRestaurant().then(res=>{
            if(res.status === 200)
            {
                this.setState({restaurantDetails:res.data})
                console.log(this.state.restaurantDetails)
            }
            }).catch(error=>console.log(error))
        }
    }
    render() {
        if(this.state.isAdminLoggedIn){
        return (
            <div>
                <div><AdminPageHeader/></div>
               
                <div style={{textAlign:'center',color:'violet',fontStyle:'italic'}}>
                <h4>Welcome  (Admin)</h4>
                </div>
               <div><Link to='/addrestaurant' className="btn btn-primary">Add Restaurant</Link></div>
                <h2 className="text-center" style={{color:'blue'}}>Restaurant Details</h2>
               
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
                    this.state.restaurantDetails == null ? 'Details not available' : this.state.restaurantDetails.map(data=>(
                    <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.opentime}</td>
                    <td>{data.closetime}</td>
                    <td>{data.date}</td>
                    <td></td>
                    
                    
                    
                    
                    {/* <td><button  className="btn btn-success" >Activate</button></td>
                    <td><button className="btn btn-danger" >Deactivate</button></td> */}
                    <td><button className="btn btn-primary" onClick={()=>this.HandleEdit(data.id)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={()=>this.HandleDelete(data.id)}>Delete</button></td>
                    </tr>
                    ))}                        
                   
                </table>
           
            </div>
        )
        }
    }
}

export default ManageRestaurantPage
