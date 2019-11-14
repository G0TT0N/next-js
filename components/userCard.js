import React, {Component} from 'react';
import './userCard.css'
import ReposList from "./ReposList/reposList";
import Location from "./Location/location";

const axios = require('axios');


class UserCard extends Component {
    state = {
        users: [],
        urlRepo: '',
      showModal: false,
      showLocation: false,
      username: '',
      location: '',
    };

    componentDidMount() {
        axios.get('https://api.github.com/repos/angular/angular/contributors?page=2&per_page=25')
            .then(res => {
                this.setState({
                    users: res.data,
                });
                res.data.forEach(user => {
                    this.getRepoUrl(user.id)
                })

            })
    }

    getRepoUrl = (id) => {
        let url;
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === id) {
                url = this.state.users[i].repos_url;
                this.setState({
                    urlRepo: url
                });
                axios.get(this.state.urlRepo, {params: {sort: 'updated'}})
                    .then(res => {
                        this.state.users[i].allRepos = res.data
                    })
            }
            this.getLocation(this.state.users[i])
        }
    };
  
  showModal = (name) => {
    this.setState({ username: name, showModal: true });
  };
  
  hideModal = () => {
    this.setState({ username: '', showModal: false });
  };
  showLocation = (location) => {
    this.setState({ location: location, showLocation: true });
  };
  
  hideLocation = () => {
    this.setState({ location: '', showLocation: false });
  };
  
  
  
  getLocation = (user) => {
        axios.get('https://api.github.com/users/' + `${user.login}`)
            .then(res => {
                user.location = res.data.location
            })
    };

    render() {
        // console.log(this.state.users)
        return (
            <div className='card__wrapper'>
                {this.state.users.length > 0
                    ? this.state.users.map(card => {
                        return (
                            <div className="main_card">
                                <div className="main_card-top">
                                    <div className="card_top">
                                        <div className="card_top-left">
                                            <img src={card.avatar_url} alt="developer" className="card_img"/>
                                            <span>@github</span>
                                        </div>
                                        <div className="card_top-right" onClick={() => this.showLocation(card.location)}>
                                            <img src="/image/compas.png" alt="location"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="main_card-bottom">
                                    <div className="cart_bottom-titles">
                                        <p>{card.login}</p>
                                        <p>{card.contributions} commits</p>
                                    </div>
                                    <button  onClick={(e) => this.showModal(card.login)}>VIEW REPOSITORIES</button>
                                </div>
                            </div>
                        )
                    }) : ""}
              {
                this.state.showModal && <ReposList hideModal={this.hideModal} username={this.state.username}/>
              }
              {
                this.state.showLocation && <Location hideLocation={this.hideLocation} location={this.state.location}/>
              }
            </div>
        );
    }
}


export default UserCard;