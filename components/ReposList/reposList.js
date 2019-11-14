import React, { Fragment, Component } from 'react'
import axios from 'axios';
import ReposItem from "./reposItem"
import './reposList.css';


export default class ReposList extends Component {
  
  state = {
    repos: [],
  };
  
  componentDidMount() {
    const self = this;
    const username = this.props.username;
    axios.get(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then(function (response) {
        self.setState({
          repos: response.data,
        })
      });
  }
  
  render() {
    return (
      <Fragment>
        <div className={"popup"}  onClick={this.props.hideModal}>
          <h1>List Of Repositories</h1>
          <div className={"popup_container"}>
            {
              this.state.repos.length && this.state.repos.map(repo => {
                return <ReposItem row={repo}/>
              })
            }
          </div>
        </div>
        
        <div className="wrapper"/>
      </Fragment>
    )
  }
};


