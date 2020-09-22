import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Header from './Header'

import ApiService from '../Service/ApiService'
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


export class UpdateRestaurant extends Component {


    constructor(props) {



        super(props)
        var admintoken = sessionStorage.getItem('admintoken')
        this.state = {
            isAdminLoggedIn: admintoken,
            id: this.props.match.params.id,
            RestaurantName: '',
            Address: '',
            OpenTime: '',
            CloseTime: '',
            PhoneNo: '',
            isValid: true,
            isLoaded: false,
            error: {
                RestaurantNameError: '',
                AddressError: '',
                OpenTimeError: '',
                CloseTimeError: '',
                PhoneNoError: '',
                Restaurant_imgError: ''
            }
            , Restaurant_img: "",
            restaurantDetails: {},

            selectedFile: null


        }


    }
    onFileChangeHandler = (event) => {
        event.preventDefault();
        //Select File
        if (event.target.files && event.target.files[0]) {
            this.setState({
                //url: URL.createObjectURL(event.target.files[0])
                selectedFile: event.target.files[0]
            }, () => console.log("on file handler " + this.state.selectedFile));
        }



    }


    onUpload = (e, restaurantname) => {
        e.preventDefault();

        console.log("inside upload :" + this.state.isValid)
        var restaurantName = restaurantname;
        console.log("restaurant name :" + restaurantName)
        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        // Create an object of formData 

        const formData = new FormData();

        // Update the formData object 
        var file = this.state.selectedFile
        if (file == null) {
            return this.setState({ error: { Restaurant_imgError: 'please choose file to upload' } });
        } else {
            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            )
        };
        formData.append("filename", this.state.selectedFile.name)
        formData.append("restaurantname", restaurantName);

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        //Make a call to the Spring Boot Application to save the image
        ApiService.uploadImage(formData)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ Restaurant_img: res.data })

                    console.log("res" + res.data)
                    alert('image uploaded successfully...')
                }

            }).catch(error => console.log(error))
        console.log("Image......" + this.state.Restaurant_img
        )
    };




    onchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })


        var value = e.target.value;
        var name = e.target.name;


        switch (name) {
            case 'RestaurantName':
                {
                    if (value.length == 0) {
                        this.setState({ error: { RestaurantNameError: 'restaurant name should not be empty' }, isValid: false })

                    }
                    else {
                        this.setState({ error: { RestaurantNameError: '' }, isValid: true })

                    }
                    break;

                }

            case 'Address':
                {
                    if (value.length == 0) {
                        this.setState({ error: { AddressError: 'address  should not be empty' }, isValid: false })
                    }
                    else {
                        this.setState({ error: { AddressError: '' }, isValid: true })
                    }
                    break;

                }

            case 'OpenTime':
                {

                    if (value.length == 0) {
                        this.setState({ error: { OpenTimeError: 'open time should not be empty' }, isValid: false })
                    }
                    else {
                        this.setState({ error: { OpenTimeError: '' }, isValid: true })
                    }

                    break;


                }

            case 'CloseTime':
                {

                    if (value.length == 0) {
                        this.setState({ error: { CloseTimeError: 'close time should not be empty' }, isValid: false })
                    }
                    else {

                        this.setState({ error: { CloseTimeError: '' }, isValid: true })

                    }
                    break;

                }

            case 'PhoneNo':
                {
                    if (value.length == 0) {
                        this.setState({ error: { PhoneNoError: 'phone number  should not be empty' }, isValid: false })
                    }
                    else if (value.length > 0 && !value.match(/^[7-9][0-9 ]{0,9}$/)) {
                        this.setState({
                            error: {
                                PhoneNoError: "phone number contains only numbers ,should start with (7,8,9)and length should be 10"
                            }, isValid: false
                        })
                    }
                    else {
                        this.setState({ error: { PhoneNoError: '' }, isValid: true })
                    }
                    break;

                }


        }

        return this.state.isValid;
    }

    HandleSubmit = (e) => {
        console.log(this.state.RestaurantName)
        console.log(this.state.Restaurant_img)
        e.preventDefault();
        //add data
        console.log("insid submit" + this.state.isValid)
        if (this.state.isValid) {

            console.log("inside submit " + this.state.isValid)
            const data = {
                id: this.state.id,
                name: this.state.RestaurantName,
                address: this.state.Address,
                opentime: this.state.OpenTime,
                closetime: this.state.CloseTime,
                phnno: this.state.PhoneNo,
                restaurant_img: this.state.Restaurant_img

            }
            ApiService.updateRestaurantById(data).then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    alert('data updated')
                }
            }).catch(error => console.log(error))


            this.setState({
                RestaurantName: '',
                Address: '',
                OpenTime: '',
                CloseTime: '',
                PhoneNo: '',
                Restaurant_img: ''
            })
        }
        else {
            console.log(this.state.isValid)
            alert('please update with valid details')
        }

    }



    componentDidMount() {

        ApiService.getRestaurantById(this.state.id).then(res => {
            if (res.status === 200) {

                console.log(res.data.name)
                this.setState({
                    RestaurantName: res.data.name,
                    Address: res.data.address,
                    OpenTime: res.data.opentime,
                    CloseTime: res.data.closetime,
                    PhoneNo: res.data.phnno,
                    Restaurant_img: res.data.restaurant_img

                })

            }
        }).catch(error => console.log(error))

    }

    render() {
        console.log(this.state.RestaurantName)
        if (this.state.isAdminLoggedIn) {
            if (!this.state.isLoaded) {


                this.setState({ isLoaded: true })
            }
            console.log("inside render " + this.state.restaurantDetails)

            var closetime = this.state.restaurantDetails.closetime
            console.log("closetime is " + closetime)
            if (this.state.isLoaded) {
                return (
                    <div>
                        <div><Header /></div>

                        <div className="box" style={{ marginLeft: '400px', marginTop: '20px' }}>
                            <form autoComplete="off" >

                                <div class="form-group row">
                                    <label class="col-form-label col-4">Restaurant Name</label>
                                    <div class="col-6">

                                        <input type="text" class="form-control" name="RestaurantName" value={this.state.RestaurantName} onChange={this.onchange} required="required" />

                                    </div>
                                </div>
                                <pre style={{ color: 'red' }}>{this.state.error.RestaurantNameError}</pre>

                                <div class="form-group row">
                                    <label class="col-form-label col-4"> Address</label>
                                    <div class="col-6">
                                        <textarea class="form-control" name="Address" cols="30" rows="10" value={this.state.Address} onChange={this.onchange} required="required" />
                                    </div>
                                </div>
                                <pre style={{ color: 'red' }}>{this.state.error.AddressError}</pre>

                                <div class="form-group row">
                                    <label class="col-form-label col-4">Open Time</label>
                                    <div class="col-6">

                                        <TimePicker

                                            onChange={this.onopentimeChange}
                                            format="HH:mm"
                                            name="OpenTime"
                                            defaultValue={moment('00:00', 'HH:mm')} />
                                        <span>{this.state.OpenTime} </span>
                                    </div>
                                </div>
                                <pre style={{ color: 'red' }}>{this.state.error.OpenTimeError}</pre>



                                <div class="form-group row">
                                    <label class="col-form-label col-4">Close Time</label>
                                    <div class="col-6">

                                        <TimePicker
                                            onChange={this.onclosetimeChange}
                                            name="CloseTime"
                                            format="HH:mm"
                                            defaultValue={moment('00:00', 'HH:mm')}

                                        />
                                        <span>{this.state.CloseTime} </span>


                                    </div>
                                </div>
                                <pre style={{ color: 'red' }}>{this.state.error.CloseTimeError}</pre>





                                <div class="form-group row">
                                    <label class="col-form-label col-4">Phone No.</label>
                                    <div class="col-6">
                                        <input type="text" class="form-control" name="PhoneNo" value={this.state.PhoneNo} onChange={this.onchange} required="required" />
                                    </div>
                                </div>
                                <pre style={{ color: 'red' }}>{this.state.error.PhoneNoError}</pre>




                                <div class="form-group row">
                                    <label class="col-form-label col-4">Restaurant_Image</label>
                                    <div class="col-6">
                                        <input type="file" name="Restaurant_img" onChange={(event) => this.onFileChangeHandler(event)} />
                                        <pre style={{ color: 'red' }}>{this.state.error.Restaurant_imgError}</pre>
                                        <button onClick={(e) => this.onUpload(e, this.state.RestaurantName)}>Upload image</button>
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
                )
            }
            else {
                return <div>Loading......</div>
            }
        }
        else {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: 'red' }}>Only Admin Can Access !!!</h2>
                </div>
            )
        }
    }
}

export default UpdateRestaurant
