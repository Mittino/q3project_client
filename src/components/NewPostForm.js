import React from 'react';
import { Router, browserHistory} from 'react-router'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import request from 'superagent';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
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
  }
};

var DATABASE_URL = 'localhost:5000';

var CreatePost = React.createClass({
  getInitialState () {
    return({
      title: '',
      description: '',
      zipCode: '',
      budget: '',
      skills: []
    })
  },

  // ONCHANGE HANDLERS -----------------------

  titleHandleChange(event) {
    this.setState({title: event.target.value})
    // console.log(this.state);
  },

  descriptionHandleChange(event) {
    this.setState({description: event.target.value})
    console.log(this.state);
  },

  zipCodeHandleChange(event) {
    this.setState({zipCode: event.target.value})
    console.log(this.state);
  },

  budgetHandleChange(event) {
    this.setState({budget: event.target.value})
    console.log(this.state);
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

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.skills);
    // alert('A form was submitted: ' + this.state.value);
    // console.log(this.state.value);

    var postObjToSend = {
      title: this.state.title,
      description:this.state.description,
      location: this.state.zipCode,
      budget: this.state.budget,
      skills: this.state.skills
    }

    request
    .post(DATABASE_URL+`/api/posts/2`)
    .send(postObjToSend)
    .end((err,res)=>{
      if (err || !res.ok) {
        console.log('ERROR: ', err);
      } else {
        console.log(res.body);
        browserHistory.push('/feed');
      }
    })
  },

  render: function () {


    return (
      <Card className="uiCard">
        <div className="newPostContainer">
          <form onSubmit={this.handleSubmit}>
            <h3>Create A New Post</h3>
            <div className="row newPostPadding">
              <label>
                <TextField
                  className="postFormTitle"
                  id="newPostTitle"
                  type="text"
                  name="postTitle"
                  floatingLabelText="Title"
                  value={this.state.title}
                  onChange={this.titleHandleChange}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  required
                />
              </label>
            </div>
            <div className="row">
              <div className="newPostPadding">
                <label>
                  <TextField
                    className="postFormDescription"
                    multiLine={true} rows={1} rowsMax={5}
                    id=""
                    type="text"
                    name="postDescription"
                    floatingLabelText="Description"
                    value={this.state.description}
                    onChange={this.descriptionHandleChange}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="newPostPadding">
              Project <br/>Location:
              <div>
                <label>
                  <TextField
                  className="postFormZip"
                    id=""
                    type="text"
                    name="zipCode"
                    floatingLabelText="Zip Code"
                    value={this.state.zipCode}
                    onChange={this.zipCodeHandleChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="newPostPadding">
              Project <br/>Information:
              <div>
                <label>
                  <TextField
                    className="postFormBudget"
                    id=""
                    type="text"
                    name="budget"
                    floatingLabelText="Budget"
                    value={this.state.budget}
                    onChange={this.budgetHandleChange}
                    required
                  />
                </label>
                <div>
                <br />
                  <label>
                    <div class="row">
                    <div className="col-lg-12 skillsText">
                      Skills Needed:
                    </div>
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
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
              </div>
            </div>
            <RaisedButton
              className="postSubmitButton"
              backgroundColor="#90C15B"
              type="submit"
              value="submit">Submit</RaisedButton>
      </form>
      </div>
      </Card>
    )
  }
});

export default CreatePost
