import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'zarm';
import Scroll from 'public/Scroll'
import NotLogged from 'c/shoppingCart/NotLogged'
import Logged from 'c/shoppingCart/Logged'
import './index.scss'
import * as action_fn from './store/action_fn'
import { connect } from 'react-redux';
class index extends Component {
    componentDidMount() {
        this.props.getCard()
    }

    render() {
        const list = this.props.list.toJS()
        return (
            <div>
                <NavBar title="购物车" className='border-bottom' />
                <div className='shopping-cart'>
                    <Scroll>
                        {
                            !list.length ? <NotLogged /> : <Logged list={list} getCard={this.props.getCard} />
                        }
                    </Scroll>
                </div>
                <NavFooter active={2} />
            </div>
        )
    }

  
}

const mapGetters = state => ({
    list: state.getIn(['shoppingCart', 'shopList'])
})

const mapActions = dispatch => ({
    getCard() {
        dispatch(action_fn.getCard())
    },

})

export default withRouter(connect(mapGetters, mapActions)(index))