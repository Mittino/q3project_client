import React from 'react';
import { Router, browserHistory, location } from 'react-router'
//import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
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
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const ProfileForm = React.createClass({

  getInitialState(){
    console.log(this.props, "props at initial state");
    return ({
      skills:[],
    });
  },

  componentDidMount(){
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
  skillsHandleChange(event) {
    console.log(this.state.skills);
    let skillNum = event.target.value;
    if (this.state.skills.includes(event.target.value)) {
      console.log('state already has this number');
      let newArr = this.state.skills.slice();
      let numIndex = newArr.indexOf(skillNum);
      newArr.splice(numIndex, 1);
      this.setState({
        skills: newArr
      });
      console.log(this.state);
    } else {
      // console.log("before concat", this.state.skills);
      let changing = this.state.skills.concat([skillNum]);
      this.setState({skills: changing});
      // console.log("after concat", this.state.skills);
    }
  },

  deleteProfile: function(){
    console.log("delete clicked", this.state);
    this.props.onDeleteProfile(this.state.userId);
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
                <TextField className="profileTextArea" type="password" floatingLabelText="Password" id="password" value={this.state.password} onChange={this.setValue.bind(this, 'password')} hidden={this.props.disabled} disabled={this.props.disabled}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
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
              <div>
                <label>
                  <div className="row profileFormChecklist">
                  <div className="skillsText">My Skills:</div>
                  <div className="col-lg-5">
                  <Checkbox
                    label="None"
                    type="checkbox"
                    style={styles.checkbox}
                    name="None"
                    value="1"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Painting"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Painting"
                    value="2"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Drawing"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Drawing"
                    value="3"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Photography"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Photography"
                    value="5"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Metal Work"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Metal Work"
                    value="6"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Sewing"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Sewing"
                    value="7"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  </div>
                  <div className="col-lg-5">
                  <Checkbox
                    label="Knitting"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Knitting"
                    value="8"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Quilting"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Quilting"
                    value="9"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Wood Carving"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Wood Carving"
                    value="10"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Collaging"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Collaging"
                    value="11"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  <Checkbox
                    label="Graphic Design"
                    type="checkbox"
                    style={styles.checkbox}
                    name="Graphic Design"
                    value="12"
                    onCheck={this.skillsHandleChange}
                    disabled={this.props.disabled}
                    iconStyle={{fill: "#90C15B"}}
                  />
                  </div>
                  </div>
                </label>
              </div>

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
                  <div className="col-sm-3 col-xs-2">
                  </div>
                  <div className="col-md-3 col-md-offset-3 profileSubmitButton">
                    <Button type="submit" label="Submit"
                    className="buttonBackground"
                    backgroundColor="#90C15B" />
                  </div>
                  <div className="col-md-3 profileSubmitButton">
                    <Button onClick={this.deleteProfile} label="Delete Profile"
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
