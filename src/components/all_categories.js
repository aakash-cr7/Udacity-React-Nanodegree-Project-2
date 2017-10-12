import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import Menu from "./menu";
import { fetchPostsCategory, fetchDeletePost, fetchVotePost } from "../actions";
import { Header, Segment, List, Icon, Button } from "semantic-ui-react";

class Categories extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.match.params.category);
  }

  deletePost = postId => {
    console.log("The user clicked  delete button");
    console.log(postId);
    this.props.deletePost(postId);
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
            <Menu />

            <h3 className="header-categories">
              Category: {this.props.match.params.category}
            </h3>
          </div>
        </div>

        {this.props.posts.posts && this.props.posts.posts.length > 0 ? (
          this.props.posts.posts.filter(post => !post.deleted).map(post => (
            <List className="post" key={post.id}>
              <div className="post-wrapper">
                <Segment color="teal" raised>
                  <Link to={`/posts/${post.id}`}>
                    <h3 className="header">{post.title}</h3>
                  </Link>
                  <List.Content className="author">
                    <Icon name="user" color="teal" size="large" /> author:
                    {post.author}
                  </List.Content>
                  <List.Content className="time">
                    <Icon name="clock" />
                    <Timestamp time={post.timestamp / 1000} format="full" />
                  </List.Content>
                  <List.Content className="post-body">{post.body}</List.Content>
                  <List.Content className="votes">
                    <Icon
                      name="thumbs up outline"
                      onClick={() => this.iconThumbsUp(post.id, "upVote")}
                      color="teal"
                      size="large"
                    />
                    Votes: {post.voteScore}
                    <Icon
                      name="thumbs down outline"
                      color="red"
                      size="large"
                      onClick={() => this.iconThumbsDown(post.id, "downVote")}
                    />
                  </List.Content>
                  <List.Content className="comments" key={post.Id}>
                    comments: ({post.comments && post.comments.length})
                  </List.Content>
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
              </div>
            </List>
          ))
        ) : (
          <div>
            <h3 className="empty-category">
              There are no posts in this category.
            </h3>
          </div>
        )}
        <div className="add-btn-post">
          <Link to="/addpost">
            <Button compact color="teal" size="large" floated="right">
              <Icon name="plus circle" />
              Add Post
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.receivePosts
});

const mapDispatchToProps = dispatch => ({
  fetchData: category => dispatch(fetchPostsCategory(category)),
  deletePost: postId => dispatch(fetchDeletePost(postId)),
  votePost: (postId, option) => dispatch(fetchVotePost(postId, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
