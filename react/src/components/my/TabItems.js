import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class TabItems extends Component {
    render() {
        const tabs = [
            { status: 1, icon: "fa fa-paper-plane", title: "待付款" },
            { status: 2, icon: "fa fa-shopping-bag", title: "待发货" },
            { status: 3, icon: "fa fa-database", title: "待收货" },
            { status: 4, icon: "fa fa-thumbs-up", title: "评价" },
            { status: 5, icon: "fa fa-heart", title: "已完成" }
        ]
        const cell = [
            { id: 1, icon: "fa fa-navicon", title: "全部订单" },
            { id: 2, icon: "fa fa-star-o", title: "收藏商品", path: '/collection' },
            { id: 3, icon: "fa fa-rocket", title: "地址管理" },
            { id: 4, icon: "fa fa-eye", title: "最近浏览" }
        ]
        return (
            <div>
                <div className='user-links border-bottom'>
                    {
                        tabs.map(item => {
                            return (
                                <div key={item.status}>
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