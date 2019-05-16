import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
class SignIn extends Component {
    state = {
        check: false
    }
    render() {
        return (
            <div className='public'>
                <div className='sign-in-warp warp'></div>
                <div className='header'>
                    <NavHeader goBack={this.goBack} icon={true} />
                </div>
                <div className='inputs'>
                    <div className='pwd'>
                        <input maxLength='10' type='text' placeholder='USERNAME OR EMAIL' />
                        <i className='fa fa-close' onClick={this.clear}></i>
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' type={this.state.check ?'text':'password'} placeholder='PASSWORD' />
                        <i className={`fa ${this.state.check ? 'fa-eye' : 'fa-eye-slash'}`} onClick={this.checkEye}></i>
                    </div>
                    <p>
                        <span>NEW ACCOUNT</span>
                        <span>FORGOT PASSWORD</span>
                    </p>
                    <span className='btn'>LOG IN</span>
                </div>
            </div>

        )
    }

    // 返回上一页
    goBack = () => {
        this.props.history.push('/login');
    }

    // 切换明文密码
    checkEye = () => {
        this.setState(prev => ({
            check: !prev.check
        }))
    }

    // 清空用户名
    clear = () => {
        
    }
}


export default SignIn