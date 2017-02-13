/* eslint-disable */
'use strict';
import React from 'react';
import request from 'superagent';
import LoginForm from '../components/Login.js';
import Nav from '../components/Nav.js';
import Nav1 from '../components/Navlogin.js';
import {Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Carousel from 'react-bootstrap/lib/Carousel';


const DATABASE_URL = "localhost:5000";

var landingContainer = React.createClass({

    getInitialState(){
      return ({
        username: '',
        password: ''
      });
    },

    componentDidMount(){
      console.log(this.state);
    },

    handleUsername(event){
      console.log('username change')
      this.setState({username:event.target.value})
    },
    handlePassword(event){
      this.setState({password:event.target.value})
    },

    handleLogoutSubmit(event){
      //alert('hi');
      event.preventDefault();
      sessionStorage.removeItem('id');
      browserHistory.push('/');
    },

    handleLoginSubmit(event){
      event.preventDefault();
      request
      .get(DATABASE_URL + '/api/users/username/' + this.state.username)
        .end(function(err, res){
          if(err){
            console.log('error getting username', err);
          }
          else{
          console.log(res)
          sessionStorage.setItem('id', res.body.id);
          browserHistory.push('/feed');

          }
      });
    },



render: function(){
    var login = (true) ?
    <LoginForm
      username={this.state.username}
      password={this.state.password}
      handleUsername={this.handleUsername}
      handlePassword={this.handlePassword}
      handleLoginSubmit={this.handleLoginSubmit}
    /> : null;



      const isLogged = (sessionStorage.id) ?
        <Nav
          handleLogoutSubmit={this.handleLogoutSubmit} />
          :
        <Nav1
          handleLoginSubmit={this.handleLoginSubmit}/>



  return(
      <div>
      {isLogged}
      {login}
        <div className="postsContainer">
          </div>
          <Carousel>
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src="img/sketching-crop.jpg"/>
              <Carousel.Caption>
                <h1 className="landingCarouselHeader">ArtOps</h1>
                <h2 className="primaryLandingCarouselParagraph">Connecting local Artists with Customers who <i>NEED</i> their products.</h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src="img/art-house-painting-crop.jpg"/>
              <Carousel.Caption>
                <h1 className="landingCarouselHeader">Local Artists</h1>
                <h2 className="secondaryLandingCarouselParagraph">ArtOps allows Local Artists to post information about the kind of work that they create so that other Artists and <br></br>Customers can find them.</h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src="img/art-house-sculpting-crop.jpg"/>
              <Carousel.Caption>
                <h1 className="landingCarouselHeader">Art Dilettante</h1>
                <h2 className="secondaryLandingCarouselParagraph">Customers can search through ArtOps posts to find Local Artist, or post their needs to connect them with Artists who can make their project dreams become reality.</h2>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        <footer>
          <p className="footerText">
            Created By: Anna, Cassie, Evan, Heidi, and Matt
          </p>
        </footer>
      </div>
  );
  }
});

export default landingContainer;
