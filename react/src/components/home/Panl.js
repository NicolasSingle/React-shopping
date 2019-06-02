import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Panl extends Component {
    render() {
        return (
            <div className='panl'>
                <ul>
                    {
                        this.props.panlList.map((item, index) => {
                            return (
                                <li key={item.get('mallCategoryId')} onClick={() => this.panlItem(item.getIn(['bxMallSubDto', 0, 'mallSubId']), index)}>
                                    <img src={item.get('image')} alt='' />
                                    <p>{item.get('mallCategoryName')}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='ad'><img src='http://images.baixingliangfan.cn/advertesPicture/20180404/20180404085441_850.gif' alt='' /></div>
            </div>
        )
    }

    panlItem = (id, index) => {
        this.props.history.push({ pathname: '/category', query: { id, index } })
    }
}
Panl.defaultProps = {
    panlList: []
};
export default withRouter(Panl)