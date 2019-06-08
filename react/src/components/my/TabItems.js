import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class TabItems extends Component {
    render() {
        const tabs = [
            { status: 4, icon: "fa fa-credit-card-alt", title: "待付款" },
            { status: 5, icon: "fa fa-heart", title: "已完成" }
        ]
        const cell = [
            { id: 1, icon: "fa fa-thumbs-up", title: "评价管理",path: '/order' },
            { id: 2, icon: "fa fa-star", title: "商品收藏", path: '/collection' },
            { id: 3, icon: "fa fa-rocket", title: "地址管理", path: '/addressList' },
            { id: 4, icon: "fa fa-eye", title: "最近浏览", path: '/browse' }
        ]
        return (
            <div>
                <div className='user-links border-bottom'>
                    {
                        tabs.map((item, index) => {
                            return (
                                <div key={item.status} className={`${index == 0 ? 'border-right' : ''}`}>
                                    <i className={item.icon} aria-hidden="true"></i>
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='cell border-top'>
                    {
                        cell.map(item => {
                            return (
                                <div key={item.id} className='border-bottom' onClick={() => this.props.history.push(item.path)}>
                                    <i className={item.icon} aria-hidden="true"></i>
                                    <span>{item.title}</span>
                                    <i className="fa fa-angle-right right" aria-hidden="true"></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}

export default withRouter(TabItems)