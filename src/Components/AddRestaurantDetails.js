import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
import  Header from './Header'

import ApiService from '../Service/ApiService'

import {TimePicker} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


export class AddRestaurantDetails extends Component {
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
            PhoneNo:"",
            Menu:"",
            isValid:false,
            error:{
                RestaurantNameError:'',
                AddressError:'',
                OpenTimeError:'',
                CloseTimeError:'',
                PhoneNoError:'',
                MenuError:''
            },
            
            restaurantDetails:{},
            time:'00:00:00',
            selectedFile: null,
            url:''
           
        }
                    
        this.HandleSubmit=this.HandleSubmit.bind(this)
        this.onFileChangeHandler =this.onFileChangeHandler.bind(this);
                    
    }


    onFileChangeHandler = (event) => {
        
         //Select File
         if (event.target.files && event.target.files[0]) {
            this.setState({
                //url: URL.createObjectURL(event.target.files[0])
                selectedFile : event.target.files[0]
            },() => console.log(this.state.selectedFile));
          }


        }
    onUpload = (e,restaurantname) => {
        e.preventDefault()
        
        var restaurantName = restaurantname;
        console.log("restaurant name :"+restaurantName)
         //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
         // Create an object of formData 
      
         const formData = new FormData(); 
     
      // Update the formData object 
      var file = this.state.selectedFile
      if(file==null){
         return this.setState({error:{MenuError:'please choose file to upload'}});
        }else{
        formData.append( 
        "myFile", 
        this.state.selectedFile,
        this.state.selectedFile.name
      )}; 
     formData.append("filename",this.state.selectedFile.name)
     formData.append("restaurantname",restaurantName);

      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
      
            //Make a call to the Spring Boot Application to save the image
        ApiService.uploadImage(formData)
            .then(res => {
                if(res.status===200){
                    this.setState({url:res.data})
                    console.log("res"+res.data)
                    alert('image uploaded successfully...')
                }
             
            }).catch(error=>console.log(error))
    };

    fileData = () => { 
     
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
             
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 


    onopentimeChange=(e,time,timeString)=>
    {
        
    
        this.setState({OpenTime:time},()=>console.log("open time :"+this.state.OpenTime))
       
    }

    onclosetimeChange=(e,time,timeString)=>
    {
        
    
               this.setState({CloseTime:time},()=>console.log("close time :"+this.state.CloseTime))
       //}
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
                    this.setState({error:{PhoneNoError:'phone number  should not be empty'}})
                }
                else if (value.length > 0 && !value.match(/^[7-9][0-9 ]{0,9}$/)) {
                    this.setState({error:{
                        PhoneNoError: "it contains only numbers and length should be 10"},isValid:false
                    })}
                else 
                {
                    this.setState({error:{PhoneNoError:''},isValid:true})
                }    
                break;
            }
            case 'Menu':
                {
                    if(value.length == 0)
                    {
                        this.setState({error:{
                            MenuError: "please choose file"},isValid:false
                        })}
                    
                    else{
                        this.setState({error:{
                            MenuError: ""},isValid:false
                        })}
                    }
                }

                return this.state.isValid
        }

    
   
    HandleSubmit=(e)=>
    {
        e.preventDefault();
       if(this.state.isValid)
       {
       console.log(this.state.isValid)
        //add data to database
        const data={
            name : this.state.RestaurantName,
            address:this.state.Address,
            opentime:this.state.OpenTime,
            closetime:this.state.CloseTime,
            phnno:this.state.PhoneNo,
            menu:this.state.url

        }
        ApiService.addRestaurant(data).then(res=>{
            if(res.status == 200)
            {
                console.log(res.data)
                alert('Restaurant data added successfully...')
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
        alert('please fill all details')
        console.log(this.state.isValid)
    }
     
    }

    
    render() {
        if(this.state.isAdminLoggedIn){
        return (
            <div >
                <div><Header/></div>
                <div className="box" style={{marginLeft:'400px',marginTop:'20px'}}>
        <form autoComplete="off">
        <div class="row">
        	<div class="col-6 offset-4">
				
			</div>	
      	</div>			
        <div class="form-group row">
			<label class="col-form-label col-4">Restaurant Name</label>
			<div class="col-6">
                <input type="text" class="form-control" name="RestaurantName" value={this.state.RestaurantName} onChange={this.onchange}required="required"/>
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
            {/* <input type="time" id="opentime" name="opentime"  value={this.state.OpenTime} onChange={this.onchange} required="required"/> */}
            <TimePicker
                onChange={this.onopentimeChange}
             
                format="HH:mm" 
                defaultValue={moment('00:00','HH:mm')}/>
                            
            </div>        	
        </div>
        <pre style={{color:'red'}}>{this.state.error.OpenTimeError}</pre>

        <div class="form-group row">
			<label class="col-form-label col-4">Close Time</label>
			<div class="col-6">
           
            <TimePicker
            onChange={this.onclosetimeChange}
           
            format="HH:mm" 
            defaultValue={moment('00:00','HH:mm')}
  />
                        
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
            <input type="file" onChange={this.onFileChangeHandler}/>
            <pre style={{color:'red'}}>{this.state.error.MenuError}</pre>
            <button onClick={(e)=>this.onUpload(e,this.state.RestaurantName)}>Upload image</button>
            </div>   
              	 {this.fileData()}
        </div>
       
       
		<div class="form-group row">
			<div class="col-8 offset-4">
				
				<button type="submit" class="btn btn-primary btn-lg" onClick={this.HandleSubmit}>ADD</button>
	        </div>
		</div>	
           
    </form>
     </div>
</div>
 )
}
else{
    return <div style={{textAlign:'center'}}>
    <h2 style={{color:'red'}}>Only Admin Can Access !!!</h2>
    </div>
}}
}
  
export default AddRestaurantDetails
