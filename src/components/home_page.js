import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import Menu from "./menu";
import {
  fetchPosts,
  fetchCategories,
  fetchComments,
  fetchDeletePost,
  fetchVotePost
  //fetchAddPost
} from "../actions";
import { List, Header, Button, Segment, Icon } from "semantic-ui-react";

class HomePage extends Component {
  componentDidMount() {
    this.props.getData();
    this.props.fetchPost();
  }

  deletePost = postId => {
    this.props.deletePost(postId);
  };

  editPost = e => {
    console.log("The user clicked  edit button");
  };

  addPost = e => {
    console.log("The user clicked  add button");
    //this.props.addedPost();
  };

  iconThumbsUp = (postId, option) => {
    this.props.votePost(postId, "upVote");
  };

  iconThumbsDown = (postId, option) => {
    this.props.votePost(postId, "downVote");
  };

  render() {
    return (
      <div className="header-section">
        <div>
          <div>
            <Header textAlign="center" color="teal" as="h1">
              Git Talks
            </Header>
          </div>
          <Menu />
        </div>

        {this.props.posts.length > 0 &&
          this.props.posts.filter(post => !post.deleted).map(post => (
            <List key={post.id} divided relaxed>
              <Segment color="teal" raised>
                <List.Item>
                  <List.Content>
                    <Link to={`/posts/${post.id}`}>
                      <List.Header>{post.title}</List.Header>
                    </Link>
                    <List.Content className="author">
                      <Icon name="user" color="teal" size="large" />
                      {post.author}
                    </List.Content>
                    <List.Content className="time">
                      <Icon name="clock" color="teal" size="large" />
                      <Timestamp time={post.timestamp / 1000} format="full" />
                    </List.Content>
                    <List.Content className="votes">
                      <Icon
                        name="thumbs up outline"
                        color="teal"
                        size="large"
                        onClick={() => this.iconThumbsUp(post.id, "upVote")}
                      />
                      votes: {post.voteScore}
                      <Icon
                        name="thumbs down outline"
                        color="red"
                        size="large"
                        onClick={() => this.iconThumbsDown(post.id, "downVote")}
                      />
                    </List.Content>
                    <List.Content className="comments" key={post.Id}>
                      <Icon name="comment outline" color="teal" size="large" />
                      comments: ({this.props.comments &&
                        this.props.comments.length})
                    </List.Content>
                  </List.Content>
                </List.Item>

                <Button
                  onClick={() => this.deletePost(post.id)}
                  compact
                  basic
                  color="red"
                  size="tiny"
                  floated="right"
                >
                  <Icon name="trash" />
                  Delete post
                </Button>

                <Link to={`/editpost/${post.id}`}>
                  <Button
                    onClick={this.editPost}
                    compact
                    basic
                    color="teal"
                    size="tiny"
                    floated="right"
                  >
                    <Icon name="edit" />
                    Edit post
                  </Button>
                </Link>
              </Segment>
            </List>
          ))}
        <div className="btn-add">
          <Link to="/addpost">
            <Button onClick={this.addPost} compact color="teal" size="large">
              <Icon name="plus circle" />
              Add Post
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.receivePosts,
    categories: state.receiveCategories,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: () =>
      dispatch(fetchPosts()).then(() => dispatch(fetchCategories())),
    fetchPost: postId => dispatch(fetchComments(postId)),
    deletePost: postId => dispatch(fetchDeletePost(postId)),
    //addedPost: posts => dispatch(fetchAddPost(posts))
    votePost: (postId, option) => dispatch(fetchVotePost(postId, option))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
