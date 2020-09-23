import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Header from './Header'
import ApiService from '../Service/ApiService'
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


export class AddRestaurantDetails extends Component {
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
            PhoneNo: "",
            Restaurant_img: "",
            Menu: "",
            isValid: false,
            error: {
                RestaurantNameError: '',
                AddressError: '',
                OpenTimeError: '',
                CloseTimeError: '',
                PhoneNoError: '',
                Restaurant_imgError: "",
                MenuError: ''
            },

            restaurantDetails: {},
            time: '00:00',
            selectedFile: null,
            url: ''

        }
    }

    //call on change restaurant image chang eevent
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

    // call on change menu image chang eevent
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



    //called on set opentime
    onopentimeChange = (e, time, timeString) => {


        this.setState({ OpenTime: time }, () => console.log("open time :" + this.state.OpenTime))

    }
    //called on close time
    onclosetimeChange = (e, time, timeString) => {


        this.setState({ CloseTime: time }, () => console.log("close time :" + this.state.CloseTime))

    }

    //called on changing the input field value
    onchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

        var value = e.target.value;
        var name = e.target.name;


        //perform validation on form to before submit 
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
                        this.setState({ error: { PhoneNoError: 'phone number  should not be empty' } })
                    }
                    else if (value.length > 0 && !value.match(/^[7-9][0-9 ]{0,9}$/)) {
                        this.setState({
                            error: {
                                PhoneNoError: "phone num contains only numbers,should start from (7,8,9) and length should be 10"
                            }, isValid: false
                        })
                    }
                    else {
                        this.setState({ error: { PhoneNoError: '' }, isValid: true })
                    }
                    break;
                }

        }

        return this.state.isValid
    }


    //called on submitting the form
    HandleSubmit = (e) => {
        e.preventDefault();

        var isMandatory = false
        if (this.state.RestaurantName && this.state.Address && this.state.PhoneNo && this.state.Menu) {
            isMandatory = true;
        }
        if (this.state.isValid && isMandatory) {
            console.log(this.state.isValid)

            const data = {
                name: this.state.RestaurantName,
                address: this.state.Address,
                opentime: this.state.OpenTime,
                closetime: this.state.CloseTime,
                phnno: this.state.PhoneNo,
                restaurant_img: this.state.Restaurant_img,
                menu_img: this.state.Menu

            }
            //called API to add data of restaurant to database
            ApiService.addRestaurant(data).then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    alert('Restaurant data added successfully...')
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
            alert('please fill all valid  details')
            console.log(this.state.isValid)
        }

    }


    render() {
        if (this.state.isAdminLoggedIn) {
            return (
                <div >
                    <div><Header /></div>
                    <div className="box" style={{ marginLeft: '400px', marginTop: '20px' }}>
                        <form autoComplete="off">
                            <div class="row">
                                <div class="col-6 offset-4">

                                </div>
                            </div>
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
                                    <textarea class="form-control" name="Address" value={this.state.Address} onChange={this.onchange} required="required" />
                                </div>
                            </div>
                            <pre style={{ color: 'red' }}>{this.state.error.AddressError}</pre>

                            <div class="form-group row">
                                <label class="col-form-label col-4">Open Time</label>
                                <div class="col-6">
                                    {/* <input type="time" id="opentime" name="opentime"  value={this.state.OpenTime} onChange={this.onchange} required="required"/> */}
                                    <TimePicker
                                        onChange={this.onopentimeChange}

                                        format="HH:mm"
                                        defaultValue={moment('00:00', 'HH:mm')} />

                                </div>
                            </div>
                            <pre style={{ color: 'red' }}>{this.state.error.OpenTimeError}</pre>

                            <div class="form-group row">
                                <label class="col-form-label col-4">Close Time</label>
                                <div class="col-6">

                                    <TimePicker
                                        onChange={this.onclosetimeChange}

                                        format="HH:mm"
                                        defaultValue={moment('00:00', 'HH:mm')}
                                    />

                                </div>
                            </div>
                            <pre style={{ color: 'red' }}>{this.state.error.CloseTimeError}</pre>



                            <div class="form-group row">
                                <label class="col-form-label col-4">Phone No.</label>
                                <div class="col-6">
                                    <input type="text" class="form-control" length="10" name="PhoneNo" value={this.state.PhoneNo} onChange={this.onchange} required="required" />
                                </div>
                            </div>
                            <pre style={{ color: 'red' }}>{this.state.error.PhoneNoError}</pre>


                            <div class="form-group row">
                                <label class="col-form-label col-4">Restaurant Image</label>
                                <div class="col-6">
                                    <input type="file" onChange={(e) => this.onFileChangeHandler1(e, this.state.RestaurantName)} />
                                    <pre style={{ color: 'red' }}>{this.state.error.Restaurant_imgError}</pre>
                                    {/* <button onClick={(e) => this.onUpload(e, this.state.RestaurantName)}>Upload image</button> */}
                                </div>
                                {/* {this.fileData()} */}
                            </div>

                            <div class="form-group row">
                                <label class="col-form-label col-4">Restaurant Menu</label>
                                <div class="col-6">
                                    <input type="file" onChange={(e) => this.onFileChangeHandler2(e, this.state.Menu)} />
                                    <pre style={{ color: 'red' }}>{this.state.error.MenuError}</pre>
                                    {/* <button onClick={(e) => this.onUpload(e, this.state.RestaurantName)}>Upload image</button> */}
                                </div>
                                {/* {this.fileData()} */}
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
        else {
            return <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>Only Admin Can Access !!!</h2>
            </div>
        }
    }
}

export default AddRestaurantDetails
