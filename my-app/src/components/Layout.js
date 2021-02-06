import React, { Component } from "react";
import axios from "axios";

import CustomerDetails from "./CustomerDetails";
import CustomerPosts from "./CustomerPosts";

import customerImage from "../resources/image.jpg";
import loading from "../resources/loading.svg";
import category from "../resources/category.png";
// import { ReactComponent as PhoneIcon } from "../resources/icon-24-phone.svg";
import shopIcon from "../resources/icon-24-shop.svg";

import "./Layout.css";

class Layout extends Component {
  state = {
    items: [],
    posts: [],
  };

  componentDidMount() {
    let urlArray = [
      "https://jsonplaceholder.typicode.com/users/1",
      "https://jsonplaceholder.typicode.com/posts?userId=1",
    ];

    let dataPromises = urlArray.map((link) => axios.get(link));
    axios
      .all(dataPromises)
      .then((response) => {
        this.setState({
          items: response[0].data,
          posts: response[1].data,
        });
      })
      .catch((err) => console.log(err));
  }

  preparePosts(posts) {
    let count = 0;
    let postDetails = [];
    while (this.state.posts[count] != undefined) {
      postDetails[count] = [posts[count].title, posts[count].body];
      count++;
    }

    return [count, postDetails];
  }

  render() {
    const isFetched = this.state.items.name != undefined;

    let layout;

    // If data has been fetched, show webpage, else show
    // the loading message

    if (isFetched) {
      // Prepare the zipcode to append
      let zipcode = this.state.items.address.zipcode.split("-");
      zipcode = zipcode[0];

      // Prepare the phone number to append
      let phone = this.state.items.phone.split("x");
      phone = phone[0].trim();

      // Prepare tags to append
      let tagResult = "";
      let tags = this.state.items.company.bs;
      tags = tags.split(" ");

      for (let t in tags) {
        let interim = tags[t].charAt(0).toUpperCase() + tags[t].slice(1);
        tagResult = tagResult + interim + " ";
      }

      tagResult = tagResult.trim();
      tagResult = tagResult.replace(/ /g, " \u2022 ");

      // Prepare posts to append into
      // CustomerPosts

      const results = this.preparePosts(this.state.posts);

      layout = (
        <div>
          <div id="left-box">
            <div id="cd">
              <img id="image" src={customerImage}></img>
              <div id="desc">
                <h1>{this.state.items.name}</h1>
                <div className="entry">
                  <p>{phone}</p>
                </div>
                <div className="entry">
                  <img src={category} id="category" className="icons"></img>
                  <p id="tag">{tagResult}</p>
                </div>
                <div className="entry">
                  <img src={shopIcon} className="icons"></img>
                  <p id="address">
                    {this.state.items.address.street},{" "}
                    {this.state.items.address.suite},{" "}
                    {this.state.items.address.city} {zipcode}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="right-box">
            <div id="cp">
              <div id="inner-cp">
                <h1>{this.state.items.name.split(" ")[0] + "'s Posts"}</h1>
                <h4>{results[0]} POSTS</h4>
                {results[1].map((post, index) => {
                  return (
                    <div key={index} className="post-format">
                      <h3 className="post-title">{post[0]}</h3>
                      <p className="post-body">{post[1]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      layout = (
        <div id="loading">
          <img src={loading}></img>
          <h1>Information is loading .....</h1>
        </div>
      );
    }

    return layout;
  }
}

export default Layout;
