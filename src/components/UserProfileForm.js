import React from 'react';
import { Router, browserHistory, location } from 'react-router'
//import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
// import CardActions from 'material-ui/Card/CardActions';
// import CardHeader from 'material-ui/Card/CardHeader';
// import CardMedia from 'material-ui/Card/CardMedia';
// import CardTitle from 'material-ui/Card/CardTitle';
// import CardText from 'material-ui/Card/CardText';
// import Avatar from 'material-ui/Avatar/Avatar';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: "#90C15B",
  },
  underlineStyle: {
    borderColor: "#90C15B",
  },
  floatingLabelStyle: {
    color: "#90C15B",
  },
  floatingLabelFocusStyle: {
    color: "#90C15B",
  },
};

const ProfileForm = React.createClass({

  getInitialState(){
    console.log(this.props, "props at initial state");
    return ({
      skills:[1],
      //disabled: ''
    });
  },

  componentDidMount(){
    //this.disableFields();
    console.log(this.props.disabled);
  },

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.profileData});
    this.setState(nextProps.disabled);
  },

  disableFields(){
    var location = browserHistory.getCurrentLocation();
    console.log(location, this.state);
    if (location === "/myProfile"){
      this.setState({disabled:true});
      console.log(location, this.state);
    }
  },

  handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();

    var formData = {...this.state};

    this.props.onProfileSubmit(formData);
  },

  setValue: function (field, event) {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  },

  render: function(){
    return(

      <Card className="uiCard">
        <div className="profileContainer">
          <h3>Please Enter Your Information</h3>
          <form onSubmit={this.handleSubmit}>

            <div className="row">
              <div className="col-md-5 col-md-offset-1 col-lg-offset-1">
                <TextField className="profileTextArea" type="text" value={this.state.username} onChange={this.setValue.bind(this, 'username')}
                  id="username" floatingLabelText="Username" disabled={this.props.disabled}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
              </div>
              <div className="col-sm-offset-2 col-md-offset-1 col-md-5 col-lg-offset-1">
                <TextField className="profileTextArea" type="text" floatingLabelText="Password" id="password" value={this.state.password} onChange={this.setValue.bind(this, 'password')} disabled={this.props.disabled}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 col-md-offset-1 col-lg-offset-1">
                <TextField className="profileTextArea" type="text"
                  id="firstname" floatingLabelText="First Name" onChange={this.setValue.bind(this, 'firstName')} value={this.state.firstName}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
              </div>
              <div className="col-sm-offset-2 col-md-offset-1 col-md-5 col-lg-offset-1">
                <TextField className="profileTextArea" type="text"
                  id="lastname" floatingLabelText="Last Name" onChange={this.setValue.bind(this, 'lastName')} value={this.state.lastName}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}  />
              </div>
            </div>

            <div className="row">
              <div className="col-md-offset-1 col-md-5 col-lg-offset-1">
                <TextField className="profileTextArea" type="number" floatingLabelText="Phone Number" value={this.state.phoneNumber} onChange={this.setValue.bind(this, 'phoneNumber')}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
              </div>
              <div className="col-sm-offset-2 col-md-offset-1 col-md-5 col-lg-offset-1">
                <TextField className="profileTextArea" type="text" floatingLabelText="Email Address" value={this.state.email} onChange={this.setValue.bind(this, 'email')} disabled={this.props.disabled}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
              </div>
            </div>
              <div className="row">
                <div className="col-md-offset-1 col-md-5 col-lg-offset-1">
                  <TextField className="profileTextArea" type="number" floatingLabelText="Zip Code" value={this.state.zipCode} onChange={this.setValue.bind(this, 'zipCode')}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
                </div>
                <div className="col-md-offset-1 col-sm-offset-2 col-md-5">
                </div>
              </div>
            <h3 className="profileAbout">About</h3>

              <SelectField className="col-md-offset-1 col-lg-offset-1"
                floatingLabelText="Skill"
                value={this.state.value}
                onChange={this.handleChange}
                disabled={this.props.disabled}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
               >
                <MenuItem value={0} primaryText="Painting" onChange={this.setValue.bind(this, 'skill')}/>
                <MenuItem value={1} primaryText="Drawing" onChange={this.setValue.bind(this, 'skill')}/>
                <MenuItem value={2} primaryText="Sculpting" onChange={this.setValue.bind(this, 'skill')}/>
                <MenuItem value={3} primaryText="None" onChange={this.setValue.bind(this, 'skill')}/>
             </SelectField>


                <div className="row">
                  <div className="col-md-5 col-md-offset-1 col-lg-offset-1">
                    <TextField className="profileTextArea" type="text" floatingLabelText="Profile URL" value={this.state.profileUrl} onChange={this.setValue.bind(this, 'profileUrl')}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
                  </div>
                  <div className="col-md-5 col-md-offset-1 col-lg-offset-1">
                    <TextField className="profileTextArea" type="text" floatingLabelText="Personal Website" value={this.state.website} onChange={this.setValue.bind(this, 'website')}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 col-md-offset-1 col-lg-offset-1">
                    <TextField className="profileTextArea" type="text" floatingLabelText="Bio" value={this.state.userBio} onChange={this.setValue.bind(this, 'userBio')}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-sm-12 profileSubmitButton">
                    <Button type="submit" label="Submit"
                    className="buttonBackground"
                    backgroundColor="#90C15B" />
                  </div>
              </div>
          </form>
        </div>
      </Card>

    );
  }
});

export default ProfileForm;
