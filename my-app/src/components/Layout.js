import React, { Component } from "react";
import axios from "axios";

import Post from "./Post";

import customerImage from "../resources/image.jpg";
import loading from "../resources/loading.svg";
import category from "../resources/category.png";
import shopIcon from "../resources/icon-24-shop.svg";
import phoneIcon from "../resources/phone.svg";

import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 1,
      items: [],
      posts: [],
    };

    // Binding functions
    this.nextUser = this.nextUser.bind(this);
    this.prevUser = this.prevUser.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.customerId !== prevState.customerId) {
      this.fetchData();
    }
  }

  /**
   * Fetches the customer data from the URL given.
   */

  fetchData() {
    let urlArray = [
      "https://jsonplaceholder.typicode.com/users/" + this.state.customerId,
      "https://jsonplaceholder.typicode.com/posts?userId=" +
        this.state.customerId,
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
      .catch((err) => {
        console.log(err);

        // If the error response status is 404,
        // this means that we are at the end of the
        // customer list, so go back one user.

        if (err.response.status === 404) {
          this.prevUser();
        }
      });
  }

  /**
   * Prepares the posts to be appended for the customer.
   * @param {*} posts: Array containing all the posts of customer.
   */

  preparePosts(posts) {
    let count = 0;
    let postDetails = [];
    while (this.state.posts[count] != undefined) {
      let title = posts[count].title;
      title = title.charAt(0).toUpperCase() + title.slice(1);
      postDetails[count] = [title, posts[count].body];
      count++;
    }

    return [count, postDetails];
  }

  /**
   * Extracts the first name of every customer, regardless
   * of if the customer has 2 or 3 words in his/her name.
   */

  extractFirstName() {
    const nameArray = this.state.items.name.split(" ");

    if (nameArray.length == 2) {
      return nameArray[0];
    } else {
      return nameArray[1];
    }
  }

  /**
   * Prepares the tags of the customer in the appropriate
   * format.
   */

  prepareTags() {
    let tagResult = "";
    let tags = this.state.items.company.bs;
    tags = tags.split(" ");

    for (let t in tags) {
      let interim = tags[t].charAt(0).toUpperCase() + tags[t].slice(1);
      tagResult = tagResult + interim + " ";
    }

    tagResult = tagResult.trim();
    tagResult = tagResult.replace(/ /g, " \u2022 ");

    return tagResult;
  }

  /**
   * Sets the state to the next user when called.
   */

  nextUser() {
    let nextCustomer = this.state.customerId;
    nextCustomer++;
    this.setState((state) => ({
      customerId: nextCustomer,
      items: [],
      posts: [],
    }));
  }

  /**
   * Sets the state to the previous user when called.
   */

  prevUser() {
    let prevCustomer = this.state.customerId;
    prevCustomer--;
    this.setState((state) => ({
      customerId: prevCustomer,
      items: [],
      posts: [],
    }));
  }

  render() {
    const isFetched = this.state.items.name != undefined;
    const isMobile = window.innerWidth <= 640;
    const isFirstCustomer = this.state.customerId == 1;

    let layout;

    // If data has been fetched, show webpage, else show
    // the loading message

    if (isFetched) {
      // Check if we have exceed the list of customers
      // Go back 1 user if we did so

      if (this.state.items.name == undefined) {
        this.prevUser();
      }

      // Extract first name
      const firstName = this.extractFirstName();

      // Prepare the zipcode to append
      let zipcode = this.state.items.address.zipcode.split("-");
      zipcode = zipcode[0];

      // Prepare the phone number to append
      let phone = this.state.items.phone.split("x");
      phone = phone[0].trim();

      // Prepare tags to append
      let tagResult = this.prepareTags();

      // Prepare posts to append into CustomerPosts
      const results = this.preparePosts(this.state.posts);

      layout = (
        <div>
          <div id="left-box" style={{ width: isMobile ? "100vw" : "50vw" }}>
            {isFirstCustomer ? null : (
              <button
                id="prev-button"
                onClick={this.prevUser}
                style={{ position: isMobile ? "relative" : "absolute" }}
              >
                Previous Customer
              </button>
            )}

            {isMobile ? (
              <button
                id="next-button"
                onClick={this.nextUser}
                style={{ position: isFirstCustomer ? "relative" : "absolute" }}
              >
                Next Customer
              </button>
            ) : null}
            <div id="cd">
              <img id="image" src={customerImage}></img>
              <div id="desc">
                <h1>{this.state.items.name}</h1>
                <div className="entry">
                  <img src={phoneIcon} className="icons"></img>
                  <p className="tag-desc">{phone}</p>
                </div>
                <div className="entry">
                  <img src={category} id="category" className="icons"></img>
                  <p className="tag-desc">{tagResult}</p>
                </div>
                <div className="entry">
                  <img src={shopIcon} className="icons"></img>
                  <p className="tag-desc">
                    {this.state.items.address.street},{" "}
                    {this.state.items.address.suite},{" "}
                    {this.state.items.address.city} {zipcode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="right-box" style={{ width: isMobile ? "100vw" : "50vw" }}>
            {isMobile ? null : (
              <button id="next-button" onClick={this.nextUser}>
                Next Customer
              </button>
            )}
            <div id="cp">
              <div id="inner-cp">
                <h1>{firstName + "'s Posts"}</h1>
                <h4 style={{ color: "gray" }}>{results[0]} POSTS</h4>
                <p style={{ color: "gray" }}>
                  Interested in a post? Click on it to read more!
                </p>
                {results[1].map((post) => {
                  return <Post title={post[0]} body={post[1]}></Post>;
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      layout = (
        <div id="loading">
          <img src={loading} style={{ width: "30vw", height: "30vh" }}></img>
          <h2>Information is loading .....</h2>
        </div>
      );
    }

    return layout;
  }
}

export default Layout;
