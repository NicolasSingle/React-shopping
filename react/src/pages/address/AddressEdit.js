import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import { Input, Cell, Switch, Picker, Button } from 'zarm';
import area from 'js/area'
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
        cascade: {
            value: [],
            dataSource: area,
            value: ['110000', '110000'],
            valueMember: 'code'
        },
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
                        <Input maxLength={50} showLength type="text" autoHeight rows={2} placeholder="详细地址" defaultValue={state.address} onChange={(e) => this.handleInputChange(e, 'address')} />
                    </Cell>
                    <Cell description={<Switch checked={state.isDefault} />} >
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
                    <Button style={{ marginTop: '15vw' }} block theme="primary">保存</Button>
                </Cell>
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/my')
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
            areaTxt: e.map(item => item.label).join('--')
        }))
    }
}

export default AddressEdit