import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import { Input, Cell, Switch, Picker, Button, Confirm } from 'zarm';
import area from 'js/area'
import { toast } from 'js/utils'
import Api from 'api/api'
// 级联数据
class AddressEdit extends Component {
    state = {
        username: '',
        phone: '',
        address: '',
        isDefault: false,
        pickerVisible: false,
        areaTxt: '',
        addressTitle: '新增地址',
        confirm: false,
        cascade: {
            value: [],
            dataSource: area,
            value: ['110000', '110000'],
            valueMember: 'code'
        },
    }

    id = undefined
    componentDidMount() {
        let id = this.props.match.params.id
        this.id = id != 'null' && id
        if (this.id) {
            this.getOneAddress(this.id)
        }
    }


    render() {
        const state = this.state
        return (
            <div>
                <NavHeader goBack={this.goBack} icon={true} title={state.addressTitle} />
                <div className='border-top'>
                    <Cell title="姓名">
                        <Input clearable type="text" maxLength={10} placeholder="收货人姓名" defaultValue={state.username} onChange={(e) => this.handleInputChange(e, 'username')} />
                    </Cell>
                    <Cell title="电话">
                        <Input clearable type="text" maxLength={11} placeholder="收货人电话" defaultValue={state.phone} onChange={(e) => this.handleInputChange(e, 'phone')} />
                    </Cell>
                    <Cell title="地区">
                        <Input clearable type="text" maxLength={11} defaultValue={state.areaTxt} placeholder="选择省/市/区" disabled={state.pickerVisible} onFocus={(e) => this.handleInputChange(e, 'picker')} />
                    </Cell>
                    <Cell title="详细地址">
                        <Input maxLength={50} showLength type="text" autoHeight rows={2} placeholder="街道门牌、楼层房间号等信息" value={state.address} onChange={(e) => this.handleInputChange(e, 'address')} />
                    </Cell>
                    <Cell description={<Switch checked={state.isDefault}
                        onChange={(value) => {
                            this.setState({ isDefault: value });
                        }} />} >
                        是否设为默认地址
                    </Cell>
                    <Picker
                        visible={state.pickerVisible}
                        value={state.cascade.value}
                        dataSource={state.cascade.dataSource}
                        valueMember={state.cascade.valueMember}
                        cancelText='取消'
                        okText='确定'
                        title='请选择'
                        onOk={(selected) => this.pickerSelected(selected)}
                        onMaskClick={() => this.setState({ pickerVisible: false })}
                        onCancel={() => this.setState({ pickerVisible: false })}
                    />
                </div>
                <Cell>
                    <Button style={{ marginTop: '10vw' }} block theme="primary" onClick={this.save}>保存</Button>
                </Cell>
                {
                    this.state.addressTitle != '新增地址' ? (
                        <Cell>
                            <Button style={{ marginTop: '5vw' }} block theme="danger" onClick={() => this.setState({ confirm: true })}>删除</Button>
                        </Cell>
                    ) : ''
                }

                <Confirm
                    shape="radius"
                    visible={this.state.confirm}
                    title="确认信息"
                    message="你确定删除地址吗？"
                    onOkText='111'
                    onOk={this.delete}
                    onCancel={() => this.setState({ confirm: false })}
                />
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/addressList')
    }

    handleInputChange = (e, name) => {
        if (name === 'picker') {
            this.setState(prev => ({
                pickerVisible: true
            }))
        } else {
            this.setState(prev => ({
                [name]: e
            }))
        }
    }

    pickerSelected = (e) => {
        console.log(e);
        this.setState(prev => ({
            pickerVisible: false,
            areaTxt: e.map(item => item.label).join('')
        }))
    }
    // 查询单条收货地址
    getOneAddress = async id => {
        const data = await Api.getOneAddress({ id })
        if (data.code == 10000) {
            this.setState({
                username: data.data.name,
                phone: data.data.tel,
                address: data.data.addressDetail,
                isDefault: data.data.isDefault,
                areaTxt: data.data.area,
                addressTitle: '编辑地址'
            })
        }
    }

    // 删除单条收货地址
    delete = async () => {
        this.setState({
            confirm: false
        })
        const data = await Api.deleteAddress({ id: this.id })
        if (data.code == 10000) {
            toast(data.msg)
            setTimeout(() => {
                this.goBack()
            }, 1000);
        }
    }
    // 增加和修改地址
    save = async () => {
        const state = this.state
        if (!state.username || !state.phone || !state.areaTxt || !state.address) {
            return toast('请填写完整信息', 'error')
        }

        const data = await Api.setAddress({
            name: state.username,
            tel: state.phone,
            area: state.areaTxt,
            addressDetail: state.address,
            isDefault: state.isDefault,
            id: this.id
        })

        if (data.code == 10000) {
            toast(data.msg)
            setTimeout(() => {
                this.goBack()
            }, 1000);
        }

    }
}

export default AddressEdit