import React, { Component } from 'react'
import Header from './Header';
import '../Styles/LogInPage.css'
import ApiService from '../Service/ApiService';
import { Redirect } from 'react-router-dom';

export class AdminLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: {
        usernameerror: '',
        passworderror: ''
      },

      isAdmin: false
    }
  }

  OnChange = (e) => {

    this.setState({ [e.target.name]: e.target.value })
    var name = e.target.name;
    var value = e.target.value;

    switch (name) {
      case 'username':
        if (value.length == 0) {
          this.setState({
            error: { usernameerror: "username should not be empty" }
          });



        }

        break;

      case 'password':

        if (value.length == 0) {
          this.setState({
            error: { passworderror: "password should not be empty" },
          });

        }

    }
  }




  submitForm = (e) => {

    e.preventDefault();
    console.log(this.state.username)
    const data = {
      username: this.state.username,
      password: this.state.password
    }

    console.log(data)
    ApiService.checkIsAdmin(data).then(res => {
      if (res.status === 200) {
        sessionStorage.setItem('admintoken', true)

        this.setState({ isAdmin: res.data })
        console.log(this.state.isAdmin)
        this.props.history.push('/managerestaurant')
      }

    }).catch(error => {
      console.log('username and password mismatch or user is not admin')
      alert('only admin can login or check credentials')
    })

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div><Header /></div>
        <form  >
          <div class="container">
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Log In</h5>
                    <form class="form-signin">
                      <div class="form-label-group">
                        <input type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus name="username" value={this.state.username} onChange={this.OnChange} />
                        <label for="inputEmail">Email </label>
                      </div>
                      <pre style={{ color: 'red' }}>{this.state.error.usernameerror}</pre>

                      <div class="form-label-group">
                        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required name="password" value={this.state.password} onChange={this.OnChange} />
                        <label for="inputPassword">Password</label>
                      </div>
                      <pre style={{ color: 'red' }}>{this.state.error.passworderror}</pre>

                      <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.submitForm}>Log in</button>
                      <hr class="my-4"></hr>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    )
  }
}

export default AdminLogin
