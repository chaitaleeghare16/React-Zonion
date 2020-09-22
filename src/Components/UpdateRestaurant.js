import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
import  Header  from './Header'

import ApiService from '../Service/ApiService'
import {TimePicker} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


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
            isValid:false,
            isLoaded:false,
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
                    
        console.log('inside constructor')
        ApiService.getRestaurantById(this.state.id).then(res=>
            {
                if(res.status===200){
                   
                   console.log(res.status)
                this.setState({restaurantDetails:JSON.stringify(res.data)},()=>{console.log(this.state.restaurantDetails)})
             
                }
            }).catch(error=>console.log(error))
           
                    
    }


    onchange=(e)=>
    {
        this.setState({[e.target.name]:e.target.value})
        

        var value=e.target.value;
        var name=e.target.name;
        
       
        switch(name)
        {
            case 'RestaurantName':
            {
                if(value.length==0)
                {
                    this.setState({error:{RestaurantNameError:'restaurant name should not be empty'},isValid:false})
                }
                else{
                    this.setState({error:{RestaurantNameError:''},isValid:true})
                 }
                break;

            }

            case 'Address':
            {
                if(value.length == 0)
                {
                    this.setState({error:{AddressError:'address  should not be empty'},isValid:false})
                }
                else{
                    this.setState({error:{AddressError:''},isValid:true})
                 }
                break;

            }

            case 'OpenTime':
            {
                
                if(value.length==0)
                {
                    this.setState({error:{OpenTimeError:'open time should not be empty'},isValid:false})
                }
                else{
                   this.setState({error:{OpenTimeError:''},isValid:true})
                }
                
                break;
                

            }

            case 'CloseTime':
            {

                if(value.length==0)
                {
                    this.setState({error:{CloseTimeError:'close time should not be empty'},isValid:false})
                }
                else{
                   
                        this.setState({error:{CloseTimeError:''},isValid:true})
                    
                }
                break;

            }

            case 'PhoneNo':
            {
                if(value.length ==0)
                {
                    this.setState({error:{PhoneNoError:'phone number  should not be empty'},isValid:false})
                }
                else if (value.length > 0 && !value.match(/^[7-9][0-9 ]{0,9}$/)) {
                    this.setState({error:{
                        PhoneNoError: "phone number contains only numbers ,should start with (7,8,9)and length should be 10"},isValid:false
                    })}
                else 
                {
                    this.setState({error:{PhoneNoError:''},isValid:true})
                }    
                break;

                }

            return this.state.isValid
        }

        return this.state.isValid;
    }
   
    HandleSubmit=(e)=>
    {
       
        e.preventDefault();
        //add data
        if(this.state.isValid){
         console.log(this.state.isValid)
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


        this.setState({RestaurantName:'',
        Address:'',
        OpenTime:'',
        CloseTime:'',
        PhoneNo:'',
        Menu:''})
    }
    else{
        console.log(this.state.isValid)
        alert('please update with all details')
    }
   
    }

    SetStateFunction=()=>
    {
        this.setState({
            RestaurantName:this.state.restaurantDetails.name,
            Address:this.state.restaurantDetails.address,
            OpenTime:this.state.restaurantDetails.opentime,
            CloseTime:this.state.restaurantDetails.closetime,
            PhoneNo:this.state.restaurantDetails.phnno,
            Menu:this.state.restaurantDetails.menu
        })

    }

    
    componentDidMount()
    {

            // console.log("inside componentdidmount setstate"+JSON.stringify(this.state.restaurantDetails))
            
            // console.log("name:"+this.state.RestaurantName)

    }
   
    render() {
        if(this.state.isAdminLoggedIn){
            if(!this.state.isLoaded){

                this.SetStateFunction();
                this.setState({isLoaded:true})
            }
            console.log("inside render "+this.state.restaurantDetails)
            
            var closetime = this.state.restaurantDetails.closetime
            console.log("closetime is "+closetime)
           if(this.state.isLoaded){
        return (
            <div >
                <div><Header/></div>
                
        <div className="box" style={{marginLeft:'400px',marginTop:'20px'}}>
        <form autoComplete="off" >
      
        <div class="form-group row">
			<label class="col-form-label col-4">Restaurant Name</label>
			<div class="col-6">

                <input type="text" class="form-control" name="RestaurantName" value={this.state.RestaurantName} onChange={this.onchange} required="required"/>
            
            </div>   
        </div>
        <pre style={{color:'red'}}>{this.state.error.RestaurantNameError}</pre>

		<div class="form-group row">
			<label class="col-form-label col-4"> Address</label>
			<div class="col-6">
                <textarea class="form-control" name="Address" value={this.state.Address} onChange={this.onchange} required="required"/>
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.AddressError}</pre>

        <div class="form-group row">
			<label class="col-form-label col-4">Open Time</label>
			<div class="col-6">
            
            <TimePicker
                
                onChange={this.onopentimeChange}
                format="HH:mm"
                name="OpenTime"
                defaultValue={moment('00:00','HH:mm')}/>
                <span>{this.state.OpenTime} </span>       
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.OpenTimeError}</pre>


        
        <div class="form-group row">
			<label class="col-form-label col-4">Close Time</label>
			<div class="col-6">
           
            <TimePicker
              onChange={this.onclosetimeChange}
              name="CloseTime"
              format="HH:mm" 
             defaultValue={moment('00:00','HH:mm')}
              
            />
            <span>{this.state.CloseTime} </span>

                       
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.CloseTimeError}</pre>





        <div class="form-group row">
			<label class="col-form-label col-4">Phone No.</label>
			<div class="col-6">
                <input type="text" class="form-control" name="PhoneNo" value={this.state.PhoneNo} onChange={this.onchange} required="required" />
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.PhoneNoError}</pre>


        <div class="form-group row">
			<label class="col-form-label col-4">Menu</label>
			<div class="col-6">
                <input type="file" class="form-control" value={this.state.Menu} name="Menu" onChange={this.onchange} required="required" />
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.PhoneNoError}</pre>


       

		<div class="form-group row">
			<div class="col-8 offset-4">
				
				<button type="submit" class="btn btn-primary btn-lg" onClick={this.HandleSubmit}>Update</button>
	        </div>
		</div>	
           
    </form>
     </div>
</div>
 )}
 else{
     return <div>Loading......</div>
 }
}
else{
    return (
        <div style={{textAlign:'center'}}>
        <h2 style={{color:'red'}}>Only Admin Can Access !!!</h2>
        </div>
    )
}}}
  
export default UpdateRestaurant
