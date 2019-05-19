import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
import Api from 'api/api'
import { toast } from 'js/utils'
class RestorePassword extends Component {
    state = {
        password: '',
        email: ''
    }

    render() {
        return (
            <div className='public'>
                <div className='sign-in-warp warp'></div>
                <div className='header'>
                    <NavHeader goBack={this.goBack} icon={true} title='找回密码' />
                </div>
                <div className='inputs'>
                    <div className='pwd'>
                        <input type='email' name='email' placeholder='EMAIL' defaultValue={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' name='password' placeholder='PASSWORD' defaultValue={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <p>
                        <span>通过电子邮件还原密码</span>
                    </p>
                    <span className='btn' onClick={this.restorePassword}>确认修改</span>
                </div>
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/login/index');
    }


    handleInputChange = e => {
        e.persist()
        this.setState(prev => ({
            [e.target.name]: e.target.value
        }))
    }
    // 注册
    restorePassword = async () => {
        const state = this.state
        if ( !state.password || !state.email) {
            return toast('请填写完整信息')
        }
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!reg.test(state.email)) {
            return toast('邮箱格式错误')
        }
        Api.restorePassword(state).then(res => {
            toast(res.msg,'right-round')
            setTimeout(() => {
                this.props.history.push('/login/index');
            }, 1000);
        })
        
    }
}


export default RestorePassword