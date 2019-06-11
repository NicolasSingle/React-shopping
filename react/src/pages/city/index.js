import React, { Component } from 'react';
import './index.scss'
import { SearchBar } from 'zarm'
import NavHeader from 'public/NavHeader'
import Scroll from 'public/Scroll'
import citys from 'js/city'
class index extends Component {
    state = {
        citys: citys,
        fixedTitle: "当前城市",
    }
    scrollY = -1
    heightArr = []
    diff = -1
    set scrollY(newY) {
        if (newY > 0) {
            this.setState({
                fixedTitle: ''
            })
        }
        let heightArr = this.heightArr
        if (!heightArr || !this.heightArr.length) {
            return
        }
        let letterArr = this.letter()
        let title
        for (let i = 0; i < heightArr.length; i++) {
            let height1 = heightArr[i];
            let height2 = heightArr[i + 1];

            if (-newY >= height1 && -newY < height2) {
                console.log(-newY,height1,height2);
                
                if (letterArr[i]) {
                    title = letterArr[i]
                    this.diff = height2 + newY;
                }
                return;
            }
        }
        
        setTimeout(() => {
            
            if (title) {
    
                this.setState(this.state = ({
                    fixedTitle: title
                }))
            }
        }, 100);
        

    }

    set diff(newY) {
        // console.log(newY);

        let fixedTop = newY > 0 && newY < 30 ? newY - 30 : 0;
        // if (this.fixedTop === fixedTop) {
        //     return;
        // }
        // this.fixedTop = fixedTop;
        // this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
        // document.getElementById('list-fixed').style.transform = `translate3d(0,${fixedTop}px,0)`;
        let ele = document.getElementById('list-fixed')
        if (ele) {
            // console.log(fixedTop);

            ele.style.transform = `translate3d(0,${fixedTop}px,0)`;
        }
    }

    componentDidMount() {
        this.listHeight()
    }

    render() {
        const citys = this.state.citys.data
        return (
            <div className='city-warp'>
                <div className='border-bottom'><NavHeader goBack={this.goBack} icon={true} title='城市选择' /></div>
                <SearchBar shape="round" placeholder='输入城市拼音或关键字' cancelText='取消' />
                <div className='city'>
                    <Scroll isToelement={true} onRef={this.onRef} onScroll={this.onScroll} listenScroll={true} probeType={3}>
                        <div className="area" id='current-area'>
                            <div className="titles">当前城市</div>
                            <div className="button-list">
                                <div className="button-warpper">
                                    <div className="button">百色</div>
                                </div>
                            </div>
                        </div>
                        <div className="area" id='hot-city'>
                            <div className="titles">热门城市</div>
                            <div className="button-list">
                                {
                                    citys.hotCities.map(item => {
                                        return (
                                            <div className="button-warpper" key={item.id}>
                                                <div className="button">{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {
                            Object.keys(citys.cities).map(key => {
                                return (
                                    <div className="area2" key={key}>
                                        <div className="titles border-topbottom">{key}</div>
                                        {
                                            citys.cities[key].map(item => {
                                                return (
                                                    <div className="item-list" key={item.id}>
                                                        <div className="item border-bottom" >{item.name}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        <div id='list-fixed' style={{ display: this.state.fixedTitle ? 'block' : 'none' }}>
                            <div className="fixed-title">{this.state.fixedTitle}</div>
                        </div>
                    </Scroll>
                </div>
                <ul>
                    {
                        Object.keys(citys.cities).map(key => {
                            return (
                                <li key={key}>{key}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/')
    }

    onRef = (ref) => {
        this.child = ref
    }

    // 获取高度
    listHeight = () => {
        const currentAreaHeight = document.getElementById('current-area').clientHeight  // 当前城市高度
        const hotCityHeight = document.getElementById('hot-city').clientHeight  // 热门城市高度
        let oldHeight = currentAreaHeight + hotCityHeight   // 两个区域高度
        this.heightArr.push(oldHeight)

        const areaHeight = Array.from(document.querySelectorAll('.area2'))  // 获取每一个字母下面城市的，然后分别获取每一个高度
        areaHeight.forEach(item => {
            oldHeight += item.clientHeight
            this.heightArr.push(oldHeight);
        })
    }

    // 获取坐标
    onScroll = e => {
        this.scrollY = e.y
    }

    letter() {
        let arr = [];
        for (let k in this.state.citys.data.cities) {
            arr.push(k);
        }
        return arr;
    }
}

export default index;