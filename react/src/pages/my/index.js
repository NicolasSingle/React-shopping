import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { NavBar } from 'zarm';
import User from 'c/my/User'
import TabItems from 'c/my/TabItems'
import Api from 'api/api'
class index extends Component {
    state = {
        numList: []
    }

    componentDidMount() {
        this.getOrderNum()
    }

    render() {
        return (
            <div>
                <NavBar title="我的" className='border-bottom' />
                <User/>
                <TabItems  numList={this.state.numList}/>
                <NavFooter active={3} />
            </div>
        );
    }

    getOrderNum = async () => {
        const data = await Api.orderNum()
        if (data.code === window.SUCCESS) {
            this.setState(state => ({
                numList: data.data.numList
            }))
        } 

    }
}

export default index;