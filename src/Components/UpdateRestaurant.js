import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Header from './Header'
import ApiService from '../Service/ApiService'
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { number } from 'prop-types';


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
            Restaurant_img: "",
            Menu: "",
            isValid: true,
            isLoaded: false,
            error: {
                RestaurantNameError: '',
                AddressError: '',
                OpenTimeError: '',
                CloseTimeError: '',
                PhoneNoError: '',
                Restaurant_imgError: '',
                MenuError: ''
            }
            , Restaurant_img: "",
            restaurantDetails: {},

            selectedFile: null


        }


    }
    //called on choosing of image  file
    onFileChangeHandler1 = (event, restaurantname) => {
        event.preventDefault();
        //Select File

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ Restaurant_img: e.target.result }, () => console.log(this.state.Restaurant_img));

            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }


    onFileChangeHandler2 = (event, restaurantname) => {
        event.preventDefault();
        //Select File

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ Menu: e.target.result }, () => console.log(this.state.Menu));



            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }







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
    //call on change of open time
    onopentimeChange = (e, time, timeString) => {


        this.setState({ OpenTime: time }, () => console.log("open time :" + this.state.OpenTime))

    }
    //call on close time
    onclosetimeChange = (e, time, timeString) => {


        this.setState({ CloseTime: time }, () => console.log("close time :" + this.state.CloseTime))

    }


    HandleSubmit = (e) => {

        e.preventDefault();
        //add data

        var isMandatory = false
        if (this.state.RestaurantName && this.state.Address && this.state.PhoneNo && this.state.Menu) {
            isMandatory = true;
        }
        if (this.state.isValid && isMandatory) {


            console.log("inside submit " + this.state.isValid)
            const data = {
                id: this.state.id,
                name: this.state.RestaurantName,
                address: this.state.Address,
                opentime: this.state.OpenTime,
                closetime: this.state.CloseTime,
                phnno: this.state.PhoneNo,
                restaurant_img: this.state.Restaurant_img,
                menu_img: this.state.Menu

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
                OpenTime: '00:00',
                CloseTime: '00:00',
                PhoneNo: '',
                Restaurant_img: '',
                Menu: ''
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
                    Restaurant_img: res.data.restaurant_img,
                    Menu: res.data.menu_img

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

            var closetime = this.state.CloseTime
            console.log("closetime is *****" + closetime)

            var closetime = closetime.split(":")
            var closedaytime = moment('2017-08-1');

            closedaytime.set(
                {
                    hours: closetime[0],
                    minutes: closetime[1]
                })
            console.log("closedaytime time - " + closedaytime)
            var opentime = this.state.OpenTime
            var opentime = opentime.split(":")
            var opendaytime = moment('2017-08-1');

            opendaytime.set(
                {
                    hours: opentime[0],
                    minutes: opentime[1]
                })
            console.log("opendaytime time - " + opendaytime)



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
                                            value={opendaytime}
                                        />

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
                                            value={closedaytime}
                                        />



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
                                        <input type="file" onChange={(event) => this.onFileChangeHandler1(event)} />
                                        <pre style={{ color: 'red' }}>{this.state.error.Restaurant_imgError}</pre>

                                    </div>

                                </div>


                                <div class="form-group row">
                                    <label class="col-form-label col-4">Restaurant_Menu</label>
                                    <div class="col-6">
                                        <input type="file" onChange={(event) => this.onFileChangeHandler2(event)} />
                                        <pre style={{ color: 'red' }}>{this.state.error.MenuError}</pre>

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
