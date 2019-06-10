import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './public.scss'
class NavFooter extends Component {
    render() {
        const footer = [
            { title: '商城', icon: 'fa fa-home', id: 0, path: '/home' },
            { title: '分类', icon: 'fa fa-align-justify fa-a', id: 1, path: '/category' },
            { title: '购物车', icon: 'fa fa-shopping-cart', id: 2, path: '/shoppingCart' },
            { title: '我的', icon: 'fa fa-user', id: 3, path: '/my' },
        ]
        return (
            <div className='nav-footer'>
                {
                    footer.map(item => {
                        return (
                            <div className={`item ${this.props.active == item.id ? 'active' : 0}`} key={item.id} onClick={() => this.onRoute(item.path,item.id)}>
                                <i className={item.icon} aria-hidden="true"></i>
                                <span>{item.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    onRoute(path,id) {
        if (id == this.props.active) {
            return
        }
        this.props.history.push(path)
    }
}
NavFooter.defaultProps = {
    active: 0
}

export default withRouter(NavFooter)