import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, fetchPostsCategory } from "../actions";
import { Grid, Button, Responsive } from "semantic-ui-react";

class Menu extends Component {
  //Get all the categories, to display in the Menu.
  componentDidMount() {
    this.props.fetchCategories();
  }

  //Dispatches action to get the posts for a category, when clicking on a Menu Button.
  getPostsByCategory = category => {
    this.props.fetchPostsCategory(category);
  };

  render() {
    return (
      <div className="categories">
        <Responsive as={Grid} columns={5} minWidth={768}>
          <Grid.Column>
            <Link to="/">
              <Button
                className="menu-btn"
                size="tiny"
                compact
                basic
                color="teal"
              >
                All
              </Button>
            </Link>
          </Grid.Column>
          {this.props.categories.length > 0 &&
            this.props.categories.map(category => (
              <Grid.Column key={category.path}>
                <Link to={`/${category.name}`}>
                  <Button
                    className="menu-btn"
                    onClick={() => this.getPostsByCategory(category.name)}
                    size="tiny"
                    compact
                    basic
                    color="teal"
                  >
                    {category.name}
                  </Button>
                </Link>
              </Grid.Column>
            ))}
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.receiveCategories
});

//Pass actions directly into connect method, so mapDispatchToProps function
//isn't needed, and less code is needed.

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPostsCategory
})(Menu);
