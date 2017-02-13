import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import Avatar from 'material-ui/Avatar/Avatar';
import Button from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chip from 'material-ui/Chip';

import request from 'superagent';

var DATABASE_URL = 'localhost:5000';


const post = React.createClass({

  getInitialState () {
    return({
      comments: [],
      skills: [],
      expanded: false,
      addCommentText: ''
    })
  },

  getComments() {
    let postId = this.props.postData.id
    request
    .get(DATABASE_URL + `/api/comments/${postId}`)
    .end((err, res) => {
      this.setState({comments: res.body});
    })
  },

  setupSkills() {
    // let skillsArray = [];
    for(var skill in this.props.postData.skills){
      this.state.skills.push(this.props.postData.skills[skill])
    }
  },

  componentDidMount() {
    this.getComments();
    this.setupSkills();
  },

  handleAddCommentText(event){
    this.setState({addCommentText:event.target.value});
    // console.log(this.state.addCommentText);
  },

  postComment(event){
    event.preventDefault();
    let postId = this.props.postData.id;
    // console.log(postId);
    request
    .post(DATABASE_URL + `/api/comments`)
    .send({
      userId: 2,
      postId: postId,
      commentBody: this.state.addCommentText
    })
    .end((err, res) => {
      if (err || !res.ok) {
        alert("error posting new comment");
        console.log(err);
      } else {
        console.log("new comment posted ");
        this.getComments();
        console.log(this.state.comments);
        this.setState({addCommentText: ''})
      }
    });
  },

  render() {
    return(
      <Card className="uiCard">
        <CardTitle
          title={this.props.postData.title}
          subtitle={this.props.postData.username}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText className="cardBody">
          <p>{this.props.postData.description}</p>

          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Budget</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>${this.props.postData.budget}</TableRowColumn>
                <TableRowColumn>{this.props.postData.location}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            {
              this.state.skills.map((skill) => {
                return (
                  <Chip className="inlineChip">
                    {skill}
                  </Chip>
                );
              })
            }
          </div>
        </CardText>
        <CardText expandable={true}>
          <div>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>User</TableHeaderColumn>
                  <TableHeaderColumn>Comment</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  this.state.comments.map((comment) => {
                    return(
                      <TableRow>
                        <TableRowColumn>{comment.username}</TableRowColumn>
                        <TableRowColumn>{comment.commentBody}</TableRowColumn>
                      </TableRow>

                    )
                  })
                }

              </TableBody>
            </Table>

            <form onSubmit={this.postComment}>
              <label>Add Comment:</label>
              <TextField
                multiLine={true} rows={1} rowsMax={5}
                id=""
                type="text"
                name="postDescription"
                value={this.state.addCommentText}
                onChange={this.handleAddCommentText}
              />
              <FlatButton label="submit" type="submit" value="Login" id="submit" />
            </form>

          </div>
        </CardText>
      </Card>
    )
  }
})

export default post;
