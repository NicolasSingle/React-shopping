import React, { Component } from 'react';

class Floor extends Component {
    state = {}

    render() {
        const props = this.props
        // console.log(props.floor._tail.get('array'));
        
        // props.floor.map(item => {
        //     this.setState(prev =>({
        //         [item.get('image')]:item.get('image')
        //     }))
        // })
        
        
        return (
            <div className='floor'>
                <div className='title'>{props.title}</div>
                <div className='floor-warpper'>
                    <div className='floor-top'>
                        <div className='floor-top-left border-rightbottom'><img src='http://images.baixingliangfan.cn/homeFloor/20180407/20180407181423_15.jpg' alt='' /></div>
                        <div className='floor-top-right'>
                            <div className='border-bottom'><img src='http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg' alt='' /></div>
                            <div className='border-bottom'><img src='http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg' alt='' /></div>
                        </div>
                    </div>
                    <div className='floor-bottom border-bottom'>
                        <div className='border-right'><img src='http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg' alt='' /></div>
                        <div><img src='http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg' alt='' /></div>
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