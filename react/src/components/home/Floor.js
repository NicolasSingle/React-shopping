import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Floor extends Component {
    state = {}

    render() {
        const floor = this.props.floor
        return (
            <div className='floor'>
                <div className='title'>{this.props.title}</div>
                <div className='floor-warpper'>
                    <div className='floor-top'>
                        <div onClick={() => this.details(floor.getIn([0, 'goodsId']))} className='floor-top-left border-rightbottom'><img src={floor.size ? floor.getIn([0, 'image']) : ''} alt='' /></div>
                        <div className='floor-top-right'>
                            <div className='border-bottom' onClick={() => this.details(floor.getIn([1, 'goodsId']))}><img src={floor.size ? floor.getIn([1, 'image']) : ''} alt='' /></div>
                            <div className='border-bottom' onClick={() => this.details(floor.getIn([2, 'goodsId']))}><img src={floor.size ? floor.getIn([2, 'image']) : ''} alt='' /></div>
                        </div>
                    </div>
                    <div className='floor-bottom border-bottom'>
                        <div className='border-right' onClick={() => this.details(floor.getIn([3, 'goodsId']))}><img src={floor.size ? floor.getIn([3, 'image']) : ''} alt='' /></div>
                        <div onClick={() => this.details(floor.getIn([4, 'goodsId']))}><img src={floor.size ? floor.getIn([4, 'image']) : ''} alt='' /></div>
                    </div>
                </div>
            </div>
        );
    }

    details = id => {
        this.props.history.push({ pathname: '/details/' + id })
    }
}
Floor.defaultProps = {
    floor: [],
    title: ' '
};
export default withRouter(Floor)