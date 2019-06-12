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
        searchList: []  // 搜索出来的城市
    }
    scrollY = -1
    heightArr = []
    defaultValue = ''
    diff = -1
    listFixed = null
    listTitle = null
    cityText = ''   // 选点击选中的字母
    touchStatus = false // 时候开始点击
    set scrollY(newY) {
        if (newY > 0) {
            this.listTitle.innerText = ''
            this.listFixed.style.display = 'none'
        }
        let heightArr = this.heightArr
        if (!heightArr || !this.heightArr.length) {
            return
        }
        let letterArr = this.letter()
        for (let i = 0; i < heightArr.length; i++) {
            let height1 = heightArr[i];
            let height2 = heightArr[i + 1];
            if (-newY >= height1 && -newY < height2) {
                if (letterArr[i]) {
                    this.listTitle.innerText = letterArr[i]
                    this.listFixed.style.display = 'block'
                    this.diff = height2 + newY;
                }
                return;
            } else {
                this.listFixed.style.display = 'none'
            }
        }
    }

    set diff(newY) {
        if (this.listFixed) {
            let fixedTop = newY > 0 && newY < 30 ? newY - 30 : 0;
            this.listFixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
        }
    }

    componentDidMount() {
        this.listHeight()
        this.listFixed = document.getElementById('list-fixed')
        this.listTitle = document.getElementById('fixed-title')
    }

    render() {
        const citys = this.state.citys.data
        return (
            <div className='city-warp'>
                <div className='border-bottom'><NavHeader goBack={this.goBack} icon={true} title='城市选择' /></div>
                <SearchBar shape="round" onCancel={this.onCancel}  onChange={e => this.changeSearch(e)} placeholder='输入城市拼音或关键字' cancelText='取消' />
                <div className='city'>
                    {/* 搜索城市相关展示 */}
                    {
                        this.defaultValue ?
                            <Scroll onScroll={() => console.log(1)}>
                                {
                                    this.state.searchList.map(item => {
                                        return (
                                            <div className="item-list" key={item.id} onClick={() =>this.cityOk(item.name)}>
                                                <div className="item border-bottom">{item.name}</div>
                                            </div>
                                        )
                                    })
                                }

                            </Scroll> :
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
                                                    <div className="button-warpper" key={item.id} onClick={() =>this.cityOk(item.name)}>
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
                                                            <div className="item-list" key={item.id} onClick={() =>this.cityOk(item.name)}>
                                                                <div className="item border-bottom" >{item.name}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Scroll>
                    }

                    <div id='list-fixed'>
                        <div id='fixed-title'>{this.state.fixedTitle}</div>
                    </div>:''

                </div>
                {/* 右边字母排序 */}
                {
                    !this.defaultValue ?
                        <ul id='ul-list'>
                            {
                                Object.keys(citys.cities).map((key, index) => {
                                    return (
                                        <li className='city-letter'  key={key} onClick={(e) => this.selectCity(e, index)} onTouchStart={e => this.hiddleTouchstat(e)} onTouchMove={e => this.hiddleTouchmove(e, index)} onTouchEnd={e => this.hiddleTouchend(e)}>{key}</li>
                                    )
                                })
                            }
                        </ul> : ''
                }
            </div >
        )
    }

    changeSearch = e => {
        this.searchCity(e)
        this.child.scrollTo(0, 0, 0)
    }

    onCancel = () => {
        if (this.defaultValue) {
            this.setState({
                searchList: []
            })
            this.defaultValue = ''
            this.child.scrollTo(0, 0, 0)
        }
    }

    // 选择城市
    cityOk = name => {
        localStorage.setItem('city',name)
        setTimeout(() => {
            this.props.history.push('/')
        }, 10);
    }
    // 城市搜索
    searchCity = (e) => {
        let arr = [];
        for (const k in citys.data.cities) {
            citys.data.cities[k].forEach(item => {
                if (item.spell.includes(e) || item.name.includes(e)) {
                    arr.push(item);
                }
            });
        }
        this.setState({
            searchList: arr,
            
        })
        this.defaultValue = e
    }

    goBack = () => {
        this.props.history.push('/')
    }

    onRef = ref => {
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

    // 按字母选择城市
    selectCity = (e, index) => {
        this.cityText = e.target.innerHTML
        this.child.scrollTo(0, -this.heightArr[index], 0)    // 调用子组件方法
    }

    hiddleTouchstat = (e) => {
        e.persist()
        this.touchStatus = true;

    }

    hiddleTouchmove = (e, index) => {
        if (!this.touchStatus) {
            return
        }
        const eleArr = Array.from(document.querySelectorAll('.city-letter'))    // 获取全部字母的元素
        const startY = eleArr[0].offsetTop; //A 距离顶部的高度
        const eleOffsetTop = document.getElementById('ul-list').offsetTop    // 动态获取ul距离顶部的宽高
        const clientY = eleArr[0].offsetHeight // 动态获取每一个li到宽高
        const touchY = e.touches[0].clientY - eleOffsetTop;
        const inx = Math.floor((touchY - startY) / clientY); //当前手指滑动的位置    
        if (inx >= 0 && this.heightArr[inx] && this.letter()[inx]) {
            this.child.scrollTo(0, -this.heightArr[inx], 200)    // 调用子组件方法滚动到对应的位置
        }
    }

    hiddleTouchend = e => {
        this.touchStatus = false
    }
}

export default index;