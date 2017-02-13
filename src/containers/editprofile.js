import React from 'react';
import request from 'superagent';
import ProfileForm from '../components/UserProfileForm.js';
import { Router, browserHistory } from 'react-router'
import routes from '../router'
import Nav from '../components/Nav';

const DATABASE_URL = "localhost:5000";

var editProfileContainer = React.createClass({

  getInitialState(){
    return ({
      profileData: {},
    });
  },

  handleLogoutSubmit(event){
    event.preventDefault();
    sessionStorage.removeItem('id');
    browserHistory.push('/');
  },

  componentDidMount(){
    this.getUserProfile();
  },

  getUserProfile(){
    var userId = sessionStorage.getItem('id');
    console.log(userId);
    request
      .get(DATABASE_URL + '/api/users/' + userId)
      .end((err, res) => {
        if(err){
          console.log("error getting user info")
        } else {
          this.setState({profileData: res.body});
          console.log(this.state, "state of container after get data");
          this.render();
        }
      });
  },


  handleProfileSubmit(formState, event){
    console.log(formState);
    var userId = sessionStorage.getItem('id');
    request
      .patch(DATABASE_URL + '/api/users/' + userId)
      .send(formState)
      .end(function(err, res){
        if (err || !res.ok){
          alert("error updating user");
          console.log(err);
        } else {
          console.log(res.body);
          browserHistory.push('/feed')
        }
      });

  },

  handleDeleteProfile(id){
    console.log("got the delete", id);
    request
    .delete(DATABASE_URL + "/api/users/" + id)
    .end(function(err, res){
      if (err){
        console.log(err);
        alert ("error removing user")
      } else {
        console.log(res);
        sessionStorage.removeItem('id');
        browserHistory.push("/");
      }
    });
  },


  render: function(){
    var profileForm = this.state.profileDataLoaded = (true) ?
    <ProfileForm
      profileData={this.state.profileData}
      onProfileSubmit={this.handleProfileSubmit}
      onDeleteProfile={this.handleDeleteProfile}
      disabled={true}
      /> : null;

    return(
      <div>
        <Nav
          handleLogoutSubmit={this.handleLogoutSubmit} />
          {profileForm}
      </div>
    )
  }
});

export default editProfileContainer;
