import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Tweet = props => (
  <tr>
    <td>{props.tweet.username}</td>
    <td>{props.tweet.description}</td>
   
    <td>
      <Link to={"/edit/"+props.tweet._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteTweet(props.tweet._id) }}>delete</a>
    </td>
  </tr>
)

export default class TweetsList extends Component {
  constructor(props) {
    super(props);

    this.deleteTweet = this.deleteTweet.bind(this)

    this.state = {tweets: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tweets/')
      .then(response => {
        this.setState({ tweets: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTweet(id) {
    axios.delete('http://localhost:5000/tweets/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tweets: this.state.tweets.filter(el => el._id !== id)
    })
  }

  tweetList() {
    return this.state.tweets.map(currenttweet => {
      return <Tweet tweet={currenttweet} deleteTweet={this.deleteTweet} key={currenttweet._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Tweets</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.tweetList() }
          </tbody>
        </table>
      </div>
    )
  }
}