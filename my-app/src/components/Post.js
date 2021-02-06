import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      body: props.body,
      clicked: false,
    };

    this.toggleBody = this.toggleBody.bind(this);
  }

  toggleBody() {
    const currentState = this.state.clicked;
    this.setState({
      clicked: !currentState,
    });
  }

  render() {
    return (
      <div className="post-format" onClick={this.toggleBody}>
        <h3 className="post-title">{this.state.title}</h3>
        <p
          className="post-body"
          style={{
            whiteSpace: this.state.clicked ? "normal" : "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginLeft: "5%",
            marginRight: "5%",
            color: "gray",
          }}
        >
          {this.state.body}
        </p>
      </div>
    );
  }
}

export default Post;
