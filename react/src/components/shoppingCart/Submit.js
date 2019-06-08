import React, { Component } from 'react'

class Submit extends Component {
    render() {
        return (
            <div className='submit'>
                <div className='submit-pic'>
                    合计：<span>￥</span><span className='money'>{this.props.totalPrice}</span>
                </div>
                <div className='submit-btn' onClick={this.props.submit}>提交订单</div>
            </div>
        )
    }
}

Submit.defaultProps = {
    totalPrice: 0
}
export default Submit