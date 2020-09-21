import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
import AdminPageHeader from './AdminPageHeader'
import M from "materialize-css/dist/js/materialize.min.js"
import ApiService from '../Service/ApiService'


export class UpdateRestaurant extends Component {
    constructor(props) {
        super(props)
        var admintoken=sessionStorage.getItem('admintoken')
        this.state = {
            isAdminLoggedIn:admintoken,
            id : this.props.match.params.id,
            RestaurantName:'',
            Address:'',
            OpenTime:'',
            CloseTime:'',
            PhoneNo:'',
            error:{
                RestaurantNameError:'',
                AddressError:'',
                OpenTimeError:'',
                CloseTimeError:'',
                PhoneNoError:''
            }
            ,Menu:"",
            restaurantDetails:{}
           
        }
                    
        this.HandleSubmit=this.HandleSubmit.bind(this)
                    
    }


    onchange=(e)=>
    {
        this.setState({[e.target.name]:e.target.value})

        var value=e.target.value;
        var name=e.target.name;
        
        console.log(value)
        switch(name)
        {
            case 'RestaurantName':
            {
                if(value.length==0)
                {
                    this.setState({error:{RestaurantNameError:'restaurant name should not be empty'}})
                }
                else{
                    this.setState({error:{RestaurantNameError:''}})
                 }
                break;

            }

            case 'Address':
            {
                if(value.length == 0)
                {
                    this.setState({error:{AddressError:'address  should not be empty'}})
                }
                else{
                    this.setState({error:{AddressError:''}})
                 }
                break;

            }

            case 'OpenTime':
            {
                
                if(value.length==0)
                {
                    this.setState({error:{OpenTimeError:'open time should not be empty'}})
                }
                else{
                   this.setState({error:{OpenTimeError:''}})
                }
                
                break;
                

            }

            case 'CloseTime':
            {

                if(value.length==0)
                {
                    this.setState({error:{CloseTimeError:'close time should not be empty'}})
                }
                else{
                   
                        this.setState({error:{CloseTimeError:''}})
                    
                }
                break;

            }

            case 'PhoneNo':
            {
                if(value.length ==0)
                {
                    this.setState({error:{PhoneNoError:'phone number  should not be empty'}})
                }
                else if (value.length > 0 && !value.match(/^[0-9 ]{1,10}$/)) {
                    this.setState({error:{
                        PhoneNoError: "it contains only numbers and length should be 10"},
                    })}
                else 
                {
                    this.setState({error:{PhoneNoError:''}})
                }    
                break;

                
            }

            case 'Menu':
            {
                break;

            }
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


    HandleSubmit=(e)=>
    {
       
        e.preventDefault();
        //add data
        const data={
            name : this.state.RestaurantName,
            address:this.state.Address,
            opentime:this.state.OpenTime,
            closetime:this.state.CloseTime,
            phnno:this.state.PhoneNo,
            Menu:this.state.Menu

        }
        ApiService.updateRestaurantById(data).then(res=>{
            if(res.status == 200)
            {
                console.log(res.data)
                alert('data updated')
            }
        }).catch(error=>console.log(error))

        
       
       

    }
    
    render() {
        if(this.state.isAdminLoggedIn){
        
            var restaurantDetails =this.state.restaurantDetails

        return (
            <div >
                <div><AdminPageHeader/></div>
                <div className="box" style={{marginLeft:'400px',marginTop:'20px'}}>
        <form autoComplete="off" onSubmit={this.HandleSubmit}>
        <div class="row">
        	<div class="col-6 offset-4">
				
			</div>	
      	</div>			
        <div class="form-group row">
			<label class="col-form-label col-4">Restaurant Name</label>
			<div class="col-6">
                <input type="text" class="form-control" name="RestaurantName" value={restaurantDetails.name} onChange={this.onchange}required="required"/>
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.RestaurantNameError}</pre>

		<div class="form-group row">
			<label class="col-form-label col-4"> Address</label>
			<div class="col-6">
                <input type="text" class="form-control" name="Address" value={restaurantDetails.address} onChange={this.onchange} required="required"/>
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.AddressError}</pre>

		<div class="form-group row">
			<label class="col-form-label col-4">Open Time</label>
			<div class="col-6">
            <input type="time" id="opentime" name="opentime"  value={restaurantDetails.opentime} onChange={this.onchange} required="required"/>
                        <label htmlFor="opentime" className="active">Open Time:</label>
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.OpenTimeError}</pre>
        <div class="form-group row">
			<label class="col-form-label col-4">Close Time</label>
			<div class="col-6">
            <input type="time" id="closetime" name="closetime"  value={restaurantDetails.closetime} onChange={this.onchange} required="required"/>
                        <label htmlFor="closetime" className="active">Close Time:</label>
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.CloseTimeError}</pre>



        <div class="form-group row">
			<label class="col-form-label col-4">Phone No.</label>
			<div class="col-6">
                <input type="text" class="form-control" name="PhoneNo" value={restaurantDetails.phnno} onChange={this.onchange} required="required" />
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.PhoneNoError}</pre>


        <div class="form-group row">
			<label class="col-form-label col-4">Menu</label>
			<div class="col-6">
                <input type="file" class="form-control" name="Menu" onChange={this.onchange} required="required" />
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.PhoneNoError}</pre>


        <div class="form-group row">
			<label class="col-form-label col-4">Menu</label>
			<div class="col-6">
                <input type="text" class="form-control"  value={new Date()}  required="required" />
            </div>        	
        </div>

		<div class="form-group row">
			<div class="col-8 offset-4">
				
				<button type="submit" class="btn btn-primary btn-lg" onClick={this.HandleSubmit}>Update</button>
	        </div>
		</div>	
           
    </form>
     </div>
</div>
 )}}}
  
export default UpdateRestaurant
