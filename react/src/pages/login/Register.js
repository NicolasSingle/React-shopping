import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'

class Register extends Component {
    render() {
        return (
            <div className='public'>
                <div className='sign-in-warp warp'></div>
                <div className='header'>
                    <NavHeader goBack={this.goBack} icon={true} title='NEW ACCOUNT' />
                </div>
                <div className='inputs'>
                    <div className='pwd'>
                        <input maxLength='10' type='text' placeholder='USERNAME' />
                    </div>
                    <div className='pwd'>
                        <input type='email' placeholder='EMAIL' />
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' placeholder='PASSWORD' />
                    </div>
                    <p>
                        <span onClick={this.goSignin}>已经有账户了吗？</span>
                    </p>
                    <span className='btn'>注 册</span>
                </div>
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/login');
    }

    goSignin = () => {
        this.props.history.push('/signin');
    }
}


export default Register