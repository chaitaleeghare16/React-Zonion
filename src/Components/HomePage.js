import React from 'react'
import sayaji_hotel from '../Images/sayaji.jpeg'
import orchid_hotel from '../Images/orchid.jpeg'
import ginger_hotel from '../Images/ginger.jpeg'
import { Link, Redirect } from 'react-router-dom'
import Header from './Header'
import ApiService from '../Service/ApiService'





    const restaurant_img_path=[" ",sayaji_hotel,orchid_hotel,ginger_hotel];
    const Restaurants=[

        {
            restaurant_id:0,

            restaurant_img_path:0,
            restaurant_name:'Sayaji'

        },

        {
            restaurant_id:1,
            restaurant_img_path:1,
            restaurant_name:'Orchid'

        },

        {
            restaurant_id:1,
            restaurant_img_path:2,
            restaurant_name:'Ginger'

        },


    ]

export class HomePage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        restaurantDetails:[]
    }
}

HandleImage=(hotel_id)=>
{
   
    var id = hotel_id
    console.log(id)
    this.props.history.push(`/restaurantdetail/${id}`)
}

    render() {

        var restaurantDetails=this.state.restaurantDetails
        ApiService.getRestaurant().then(res=>{
            if(res.status === 200)
            {
                this.setState({restaurantDetails:res.data})
            }
            }).catch(error=>console.log(error))
        
        return (
            <div >
                <div><Header/></div>
                <div class="container" >
                {restaurantDetails.map(hotels=>(
                
                <div class="row" >
                <div class="col-md-7">
                <div class="thumbnail">
                  
                   <button onClick={()=>this.HandleImage(hotels.id)}>
                   <img src={restaurant_img_path[hotels.id]} className="githubIcon" />
                   <div class="caption">
                   <p>{hotels.name}</p>
                   </div>
                  </button>
                 
                </div>
                </div>
                </div>
                
            )
                )}
                
                </div>
                
            </div>
        )
    }
}

export default HomePage


  