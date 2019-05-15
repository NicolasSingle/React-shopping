import React from 'react';
import './index.scss'
import { Radio, Cell } from 'zarm';
import Scroll from './Scroll'
function App() {
    return (
        <div className='scroll-warpper'>
            <Scroll >
                <div>
                    <Cell><Radio>普通</Radio></Cell>
                    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                    <Cell><Radio disabled>禁用</Radio></Cell>
                    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
                    <Cell><Radio>普通</Radio></Cell>
                    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                    <Cell><Radio disabled>禁用</Radio></Cell>
                    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
                    <Cell><Radio>普通</Radio></Cell>
                    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                    <Cell><Radio disabled>禁用</Radio></Cell>
                    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
                    <Cell><Radio>普通</Radio></Cell>
                    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                    <Cell><Radio disabled>禁用</Radio></Cell>
                    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
                    <Cell><Radio>普通</Radio></Cell>
                    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                    <Cell><Radio disabled>禁用</Radio></Cell>
                    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
                    <Cell><Radio>普通</Radio></Cell>
                    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                    <Cell><Radio disabled>禁用</Radio></Cell>
                    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
                </div>
                
            </Scroll>

             {/* <Button theme="primary">primary</Button>
             <div>
                <Cell><Radio>普通</Radio></Cell>
                <Cell><Radio defaultChecked>默认选中</Radio></Cell>
                <Cell><Radio disabled>禁用</Radio></Cell>
                <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
            </div> */}
        </div>
    );
}

export default App;
