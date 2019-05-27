import React, { Component } from 'react';

class Floor extends Component {
    state = {}

    render() {
        const floor = this.props.floor
        return (
            <div className='floor'>
                <div className='title'>{this.props.title}</div>
                <div className='floor-warpper'>
                    <div className='floor-top'>
                        <div className='floor-top-left border-rightbottom'><img src={floor.size ? floor.getIn([0, 'image']) : ''} alt='' /></div>
                        <div className='floor-top-right'>
                            <div className='border-bottom'><img src={floor.size ? floor.getIn([1, 'image']) : ''} alt='' /></div>
                            <div className='border-bottom'><img src={floor.size ? floor.getIn([2, 'image']) : ''} alt='' /></div>
                        </div>
                    </div>
                    <div className='floor-bottom border-bottom'>
                        <div className='border-right'><img src={floor.size ? floor.getIn([3, 'image']) : ''} alt='' /></div>
                        <div><img src={floor.size ? floor.getIn([4, 'image']) : ''} alt='' /></div>
                    </div>
                </div>
            </div>
        );
    }
}
Floor.defaultProps = {
    floor: [],
    title: ' '
};
export default Floor;