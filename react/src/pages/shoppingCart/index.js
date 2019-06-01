import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'zarm';
import Scroll from 'public/Scroll'
import NotLogged from 'c/shoppingCart/NotLogged'
import Logged from 'c/shoppingCart/Logged'
import './index.scss'
import Api from 'api/api'
class index extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        this.getCard()
    }

    render() {
        return (
            <div>
                <NavBar title="购物车" className='border-bottom' />
                <div className='shopping-cart'>
                    <Scroll>
                        {
                            !this.state.list.length ? <NotLogged /> : <Logged list={this.state.list} getCard={this.getCard}/>
                        }
                    </Scroll>
                </div>
                <NavFooter active={2} />
            </div>
        )
    }

    getCard = async () => {
        const data = await Api.getCard()
        if (data.code == 10000) {
            this.setState(prev => ({
                list: data.data
            }))
        }
    }



}

export default withRouter(index)