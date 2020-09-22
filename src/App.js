import React from 'react';
//import ListUsers from './Component/ListUsers'
import './App.css';


import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import LogOut from './Components/LogOut';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import ManageRestaurant, { AddRestaurantDetails } from './Components/AddRestaurantDetails';
import ManageRestaurantPage from './Components/ManageRestaurantPage';
import RestaurantDetails from './Components/RestaurantDetails';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import UpdateRestaurant from './Components/UpdateRestaurant';




function App() {
  return (


    <div>


      <div>
        <Switch>

          <Route path='/home' component={HomePage} />
          <Route path="/login" component={AdminLogin} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/contactus" component={ContactUs} />

          <Route path="/login" component={AdminLogin} />
          <Route path='/managerestaurant' component={ManageRestaurantPage} />
          <Route path='/updaterestaurant/:id' component={UpdateRestaurant} />
          <Route path='/addrestaurant' component={AddRestaurantDetails} />
          <Route path='/restaurantdetail/:id' component={RestaurantDetails} />


          {/* <Route path="/admin" component={Admin}/> */}


          <Route path="/logout" component={LogOut} />

        </Switch>
      </div>


    </div>

  );


}

export default App;
