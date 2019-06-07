import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import { Radio, Button } from 'zarm';
import Scroll from 'public/Scroll'
import Api from 'api/api'
import './index.scss'
import { toast } from 'js/utils'
class AddressList extends Component {
    state = {
        list: [],
    }
    componentDidMount() {

        this.getAddress()
    }
    render() {
        return (
            <div>
                <div className='border-bottom'>
                    <NavHeader goBack={this.goBack} icon={true} title='地址列表' />
                </div>
                <div className='address-list'>
                    <Scroll>
                        <Radio.Group type="cell" shape='round' onChange={e => this.onChange(e)}>
                            {
                                this.state.list.map(item => {
                                    return (
                                        <Radio value={item._id} key={item._id} className='item border-bottom'>
                                            <div className='item-cell'>
                                                <p>{item.name}，{item.tel}</p>
                                                <span>{item.area + '--' + item.addressDetail}</span>
                                                <i className="fa fa-edit" aria-hidden="true" onClick={(e) => this.addressEdit(e, item._id)}></i>
                                                {item.isDefault ? <i className="fa fa-dot-circle-o" aria-hidden="true"></i> : null}
                                            </div>
                                        </Radio>
                                    )
                                })
                            }
                        </Radio.Group>
                    </Scroll>

                    <Button block theme="danger" className='btn' onClick={this.goAddress}>增加地址</Button>
                </div>
                {
                    !this.state.list.length ? <div className='no-data'>暂无地址~~</div> : null
                }
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/my')
    }

    // 设置默认地址
    onChange = async id => {
        const data = await Api.setDefaultAddress({ id })
        if (data.code == 10000) {
            toast(data.msg)
            this.getAddress()
        }
    }
    addressEdit = (e, id) => {
        e.persist()
        this.props.history.push('/addressEdit/' + id);
    }

    goAddress = () => {
        this.props.history.push('/addressEdit/null')
    }
    getAddress = async () => {
        const data = await Api.getAddress()
        if (data.code == 10000) {
            this.setState(state => ({
                list: data.data,
            }))
        }
    }
};

export default AddressList;