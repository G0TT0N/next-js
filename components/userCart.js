import React, {Component} from 'react';
import './userCart.css'

const axios = require('axios');


class UserCart extends Component {
    state = {
        users: [],
        userInfo: [],
        id: '',
        urlRepo: '',
        allUserRepos: []
    };

    componentDidMount() {
        axios.get('https://api.github.com/repos/angular/angular/contributors?page=1&per_page=25')
            .then(res => {
                this.setState({
                    users: res.data,
                    id: res.data[0].id
                });
                this.getRepoUrl()
            }).then(() => {
            axios.get(this.state.urlRepo, {params: {sort: 'updated'}})
                .then(res => {
                    this.setState({
                        allUserRepos: res
                    })
                })
        })
    }

    getRepoUrl = () => {
        let url;
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === this.state.id) {
                url = this.state.users[i].repos_url;
                this.setState({
                    urlRepo: url
                })
            }
        }
    };

    render() {
        return (
            <div className='cart__wrapper'>
                {this.state.users.length > 0
                    ? this.state.users.map(cart => {
                        return (
                            <div className="main_card">
                                <div className="main_card-top">
                                    <div className="card_top">
                                        <div className="card_top-left">
                                            {/*// <!-- <img src="" alt="developer" class="card_img"/></div> -->*/}
                                            <div src="" alt="developer" className="card_img"></div>
                                            <span>@github</span>
                                        </div>
                                        <div className="card_top-right">
                                            <img src="./compas.png" alt="location"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="main_card-bottom">
                                    <div className="cart_bottom-titles">
                                        {this.state.users.map( user => {
                                           return user.id
                                        })}
                                        <p>123 commits</p>
                                    </div>
                                    <button>VIEW REPOSITORIES</button>
                                </div>
                            </div>
                        )
                    }) : ""}
            </div>
        );
    }
}


export default UserCart;