import React, { Component } from 'react';
import { Stepper } from 'zarm';
class Logged extends Component {
    render() {
        const items = [
            { id: 1, title: '纳美小苏打源生护龈牙膏3010', check: false },
            { id: 2, title: '纳美小苏打源生护龈牙膏3010', check: false },
            { id: 3, title: '纳美小苏打源生护龈牙膏3010', check: false },
        ]
        return (
            <div className='logged'>
                <div className='goods-item2 count border-bottom'>
                    <div className='select'>
                        <input type='checkbox' />
                    </div>
                    <div className='conut-pic'>
                        <p>
                            <span>合计：</span>
                            <span>￥0.00</span>
                        </p>
                        <p className='order-ok'>请确认订单</p>
                    </div>
                </div>
                <div className="confirm">
                    <div>删除</div>
                    <div>去结算</div>
                </div>
                {/* 以下是商品 */}
                {
                    items.map(item => {
                        return (
                            <div className='goods-item2 border-bottom' key={item.id}>
                                <div className='select'>
                                    <input type='checkbox' />
                                </div>
                                <div className='border pictures'><img src='http://images.baixingliangfan.cn/compressedPic/20180411083404_6619.jpg' alt='' /></div>
                                <div className='trade-warp'>
                                    <p className='trade-name'>{item.title}</p>
                                    <div>
                                        <p className='price'><span>￥</span>16.8</p>
                                        <p><Stepper shape="circle" defaultValue={1} min={1} max={20} /></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}

export default Logged