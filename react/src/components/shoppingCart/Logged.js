import React, { Component } from 'react';
import { Stepper } from 'zarm';
class Logged extends Component {
    render() {
        return (
            <div className='logged'>
                <div className='goods-item2 border-bottom'>
                    <div className='select'>
                        <input type='checkbox'/>
                    </div>
                    <div className='border pictures'><img src='http://images.baixingliangfan.cn/compressedPic/20180411083404_6619.jpg' alt='' /></div>
                    <div className='trade-warp'>
                        <p className='trade-name'>纳美小苏打源生护龈牙膏3010/支</p>
                        <div>
                            <p className='price'><span>￥</span>16.8</p>
                            <p><Stepper shape="circle" defaultValue={1} min={1} max={20}/></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logged