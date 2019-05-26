import React, { Component } from 'react'

class Panl extends Component {
    render() {
        return (
            <div className='panl'>
                <ul>
                    {
                        this.props.panlList.map(item => {
                            return (
                                <li key={item.get('mallCategoryId')}>
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
}
Panl.defaultProps = {
    panlList: []
};
export default Panl