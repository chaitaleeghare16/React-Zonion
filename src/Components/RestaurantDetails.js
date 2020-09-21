import React, { Component } from 'react'
import Header from './Header'
import ApiService from '../Service/ApiService'

export class RestaurantDetails extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            id : this.props.match.params.id,
            restaurantDetails:{}
        }
    }
    componentDidMount()
    {
        ApiService.getRestaurantById(this.state.id).then(res=>{
            if(res.status === 200)
            {
                this.setState({restaurantDetails:res.data})
                console.log(this.state.restaurantDetails)
            }
            }).catch(error=>console.log(error))

    }
    
    render() {
        
        var restaurantDetails =this.state.restaurantDetails
        
        return (
            <div >
                <div><Header/></div>
              
        <div className="box" style={{marginLeft:'400px',marginTop:'60px',textAlign:'center',backgroundColor:'lightgrey',width:'40%'}}>
        
        <div class="row">
        		
      	</div>			
        <div class="form-group row">
			<label class="col-form-label col-4"> Name</label>
			<div class="col-6">
                
                 <input type="text" class="form-control" name="RestaurantName" value={restaurantDetails.name} onChange={this.onchange}required="required"/> 
            </div>        	
        </div>
        

		<div class="form-group row">
			<label class="col-form-label col-4"> Address</label>
			<div class="col-6">
                <input type="text" class="form-control" name="Address" value={restaurantDetails.address} onChange={this.onchange} required="required"/>
            </div>        	
        </div>
        

		<div class="form-group row">
			<label class="col-form-label col-4">Open Time</label>
			<div class="col-6">
            <input type="text" id="opentime" class="form-control" name="opentime"  value={restaurantDetails.opentime} onChange={this.onchange} required="required"/>
                        
            </div>        	
        </div>
       
        <div class="form-group row">
			<label class="col-form-label col-4">Close Time</label>
			<div class="col-6">
            <input type="text" id="closetime" class="form-control" name="closetime"  value={restaurantDetails.closetime} onChange={this.onchange} required="required"/>
                       
            </div>        	
        </div>
        



        <div class="form-group row">
			<label class="col-form-label col-4">Phone No.</label>
			<div class="col-6">
                <input type="text" class="form-control" name="PhoneNo" value={restaurantDetails.phnno} onChange={this.onchange} required="required" />
            </div>        	
        </div>
       


        <div class="form-group row">
			<label class="col-form-label col-4">Menu</label>
			<div class="col-6">
                <input type="file" class="form-control" name="Menu" onChange={this.onchange} required="required" />
            </div>        	
        </div>
        
		
    
     </div>
</div>
 
          
        )
    }
}

export default RestaurantDetails
