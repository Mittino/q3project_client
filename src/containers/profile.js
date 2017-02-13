import React from 'react';
import request from 'superagent';
import ProfileForm from '../components/UserProfileForm.js';
import { Router, browserHistory } from 'react-router'
import routes from '../router'
import Nav from '../components/Nav';

var DATABASE_URL = 'localhost:5000';

var profileContainer = React.createClass({

  getInitialState(){
    return ({
      username: '',
      password: ''
    });
  },

  handleLogoutSubmit(event){
    event.preventDefault();
    sessionStorage.removeItem('id');
    browserHistory.push('/');
  },

  componentDidMount(){
  },

  handleProfileSubmit(formState){
    console.log(formState);

    request
      .post(DATABASE_URL + '/api/users/')
      .send(formState)
      .end(function(err, res){
        if (err || !res.ok){
          alert("error posting new user profile");
          console.log(err);
        } else {
          console.log(res.body);
          console.log(res.body[0].id);
          sessionStorage.setItem('id', res.body[0].id);
          browserHistory.push('/feed');
        }
      });

  },


  render: function(){
    var profileForm = (true) ?
    <ProfileForm
      onProfileSubmit={this.handleProfileSubmit}
      disabled={false}
      /> : null

    return(
      <div>
        <Nav
          handleLogoutSubmit={this.handleLogoutSubmit} />
          {profileForm}
      </div>
    )
  }
});

export default profileContainer;
