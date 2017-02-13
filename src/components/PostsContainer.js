'use strict';

import React from 'react';
import Post from './Post';
import request from 'superagent';

const DATABASE_URL = "localhost:5000";


const PostsContainer = React.createClass({

  getInitialState() {
    return ({
      postData: []
    });
  },

  getPostDataFromAPI() {
    request
    .get(DATABASE_URL + '/api/posts')
    .end((err, res) => {
      if(err) {
        console.log(err);
      }else{
        let postData = [];

        for(var post in res.body){
          postData.push(res.body[post])
        }

        this.setState({postData: postData});
      }
    })
  },

  componentDidMount() {
    this.getPostDataFromAPI();
  },

  render() {
    return(
      <div className="postsContainer">
      {
        this.state.postData.map(function (post) {
          return (
            <Post
              key={post.id}
              postData={post}
            />
          )
        })
      }
      </div>
    );
  }
})

export default PostsContainer;
