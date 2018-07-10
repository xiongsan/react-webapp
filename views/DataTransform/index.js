/**
 * Created by LLB on 16/4/25.
 */
import React, {Component} from 'react'
import {enclosure} from 'enclosure-utils'
const colorPalette = ['#c89f67', '#a28b79', '#1270b6', '#19a29a', '#90c132', '#37a8de']
import styles from './style.less'
import $ from 'jquery'
import Counter from 'components/Counter'
import Message from 'components/Message'
let mapOfApp = {}
function getMessageProcessor() {
    return {
        test: function (_this, payload, count, elements, elementContainer) {
            const messages = payload.split(',')
            const topicId = messages[0]
            const id = messages[1]
            const way = messages[2]
            const isException = messages[3]
            const {r,animate,rectMargin,rectHeight}=_this.state
            const outCircleId = id + 'o'
            const elementLineId = id + 'l'
            const elementOutCircle = $(`#${outCircleId}`)
            const elementLine = $(`#${elementLineId}`)
            const num = count.toString()
            for (let i = 0; i < num.length; i++) {
                const numElement = 'num' + i
                $(`#${numElement}`).html(num.substr(num.length - i - 1, 1))
            }
            if (way === 'Push') {
                if (isException === 'false') {
                    isExceptionStyle(elementOutCircle, elementLine)
                    let point = $('<div class="abnormalPushPoint"></div>')
                    $(`#${id}`).append(point)
                    point.animate({marginLeft: 0}, 500, 'linear', function () {
                        $(this).remove()
                    })
                }
                else {
                    isNormalStyle(elementOutCircle, elementLine)
                    let point = $('<div class="normalPushPoint"></div>')
                    $(`#${id}`).append(point)
                    point.animate({marginLeft: 0}, 500, 'linear', function () {
                        $(this).remove()
                    })
                }
            }
            else {
                if (isException === 'false') {
                    isExceptionStyle(elementOutCircle, elementLine)
                    let point = $('<div class="abnormalPublishPoint"></div>')
                    $(`#${id}`).append(point)
                    point.animate({marginLeft: -0.5 * r + 10}, 500, 'linear', function () {
                        $(this).remove()
                    })
                }
                else {
                    isNormalStyle(elementOutCircle, elementLine)
                    let point = $('<div class="normalPublishPoint"></div>')
                    $(`#${id}`).append(point)
                    point.animate({marginLeft: -0.5 * r + 10}, 500, 'linear', function () {
                        $(this).remove()
                    })
                }
            }
            if (isException === 'false' && mapOfApp[id]) {
                elementContainer.children().remove()
                let element = $('<div class="exce-contain">' +
                    '<div class="exception-circle"></div> ' +
                    '<div class="word-container"></div> ' +
                    '<div class="time-container"></div>' +
                    '</div>')
                element.css({height: rectHeight, marginBottom: rectMargin, width: '100%',display: 'flex',position: 'relative',alignItems: 'center'})
                element.children(".exception-circle").css({ height: '8px',width: '8px',borderRadius: '50%', background: 'red'})
                element.children(".word-container").css({marginLeft: '6%'})
                element.children(".word-container").html(mapOfApp[id] + '(' + id + ')')
                element.children(".time-container").css({position: 'absolute',right: 0})
                element.children(".time-container").html(new Date().format('HH:mm:SS'))
                elements.unshift(element)
                elements.length > 7 ? elements.pop() : void(0)
                elements.map(item=> {
                    $(item).css({top: 0})
                    elementContainer.append(item)
                })
                elements.map(item=> {
                    item.animate({top: animate}, 500, 'linear', function () {
                    })
                })
            }
            function isExceptionStyle(elementOutCircle, elementLine) {
                if (!elementOutCircle.hasClass('out-circle-exception')) {
                    elementOutCircle.removeClass('out-circle-color')
                    elementOutCircle.addClass('out-circle-exception')
                    elementLine.removeClass('line-color')
                    elementLine.addClass('line-exception-color')
                }
            }

            function isNormalStyle(elementOutCircle, elementLine) {
                if (elementOutCircle.hasClass('out-circle-exception')) {
                    elementOutCircle.removeClass('out-circle-exception')
                    elementOutCircle.addClass('out-circle-color')
                    elementLine.removeClass('line-exception-color')
                    elementLine.addClass('line-color')
                }
            }
        }
    }
}
class Index extends Component {
    static contextTypes={
        router:React.PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            ws: null,
            data:[
                {APP_ID: 'metadata', APP_NAME: '元数据'},
                {APP_ID: 'participatory', APP_NAME: '供人分享的'},
                {APP_ID: 'discard', APP_NAME: '丢弃'},
                {APP_ID: 'alternative', APP_NAME: '替代的'},
                {APP_ID: 'introspect', APP_NAME: '内省'},
                {APP_ID: 'anonymous', APP_NAME: '匿名的'},
                {APP_ID: 'embed', APP_NAME: '植入'},
                {APP_ID: 'elementary', APP_NAME: '基本的'},
                {APP_ID: 'capture', APP_NAME: '夺得'},
                {APP_ID: 'ultimate', APP_NAME: '极限的'},
                {APP_ID: 'eligible', APP_NAME: '合适的'},
                {APP_ID: 'deprecate', APP_NAME: '反对'},
                {APP_ID: 'unprecedented', APP_NAME: '空前的'},
                {APP_ID: 'delegation', APP_NAME: '授权'}
            ],
            r: 0,
            topHeight: 0,
            topWidth: 0,
            animate:0,
            rectMargin:0,
            rectHeight:0
        }
    }

    componentWillMount() {
        let topHeight = document.body.clientHeight-160,
            topWidth = document.body.clientWidth-280,
            r = Math.floor(topHeight / 3.6),
            bodyHeight=document.body.clientHeight
        let height = (1 - 0.0325 * 2) * 0.275 * 0.82 * bodyHeight - 2//减去2是因为border占2px
        let animate = height / 6
        let rectMargin = 0.006 * bodyHeight
        let rectHeight = (height - 7 * rectMargin) / 6
        this.setState({ r, animate,rectMargin,rectHeight,topHeight, topWidth})
    }
    componentDidMount(){
        const pathName = window.document.location.pathname;
        const projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        const host = window.location.host + projectName//主机名加端口号
        let {ws,data} = this.state
        ws = new WebSocket(`ws://${host}/websocket`)
        this.setState({ws})
        const _this = this
        const messageProcessor=getMessageProcessor()
        let elements = []
        let count = 0
        let elementContainer = $('#itemContainer')
        data.map(item=> {
            mapOfApp[item.APP_ID] = item.APP_NAME
        })
        ws.onopen = function () {
        }
        ws.onmessage = function (event) {
            const message = event.data
            let {type,payload} = JSON.parse(message)
            count++
            messageProcessor[type](_this, payload, count, elements, elementContainer)
        }

        ws.onerror = function (evt) {
            ws.close()
            console.log('websocket error', evt)
        }
        ws.onclose = function (evt) {
            ws.close()
            console.log('websocket is closed', evt)
        }
    }
    componentWillUnmount() {
        //组件销毁关闭连接
        const {ws} = this.state
        if (ws) {
            ws.close()
        }
    }
    loadCircle() {
        const {data, r, topHeight, topWidth}=this.state
        const length = data.length
        const deg = 360 / length
        const outR = r / 2.2 + 10
        //虚线占的高度
        const dashArray = Math.sin(Math.PI / 360) * (r - 2)
        //卫星盒子
        const boxHeight = outR + 3 + 2 * dashArray
        //盒子的宽度
        const boxWidth = Math.cos(Math.PI / 360) * (r - 2)
        let i = -1
        if (length > 0) {
            return data.map(items => {
                i++
                if(items.APP_NAME.length>8){
                    items.APP_NAME=items.APP_NAME.substr(0,6)+'..'
                }
                return (
                    <div id={items.APP_ID} className={styles["line-and-circle"]} style={{top: (topHeight - boxHeight) / 2, left: topWidth / 2 - boxWidth / 2, transform: `rotate(${i * deg + 180}deg)`
                    }}>
                        <div id={items.APP_ID + 'l'} className={styles.line}
                             style={{width: r, top: (boxHeight - 1) / 2, left: boxWidth / 2}}/>
                        <div id={items.APP_ID + 'o'} className={styles["out-circle"]}
                             style={{width: outR, height: outR, left: 1.5 * r, top: (boxHeight - outR + 2) / 2 - 1,background:colorPalette[(i % 6 == 0 ? 6 : i % 6) - 1]}}>
                            <div
                                style={{transform: `rotate(${-i * deg - 180}deg)`, width: "90%"}}>{items.APP_NAME}</div>
                        </div>
                        <style>
                            {`
                          .normalPushPoint{
                             position: absolute;
                             border-radius: 50%;
                             height: 10px;
                             width: 10px;
                             background: #2AFC30;
                             box-shadow: 0 0 5px 1px #2AFC30;
                             margin-left:-${0.5 * r - 10}px;
                             top:${(boxHeight - 10) / 2}px;
                             left:${boxWidth / 2 + r - 10}px;
                            }
                          .abnormalPushPoint{
                             position: absolute;
                             border-radius: 50%;
                             height: 10px;
                             width: 10px;
                             background: rgb(255,67,92);
                             box-shadow: 0 0 5px 1px rgb(255,67,92);
                              margin-left:-${0.5 * r - 10}px;
                             top:${(boxHeight - 10) / 2}px;
                             left:${boxWidth / 2 + r - 10}px;
                            }
                          .normalPublishPoint{
                             position: absolute;
                             border-radius: 50%;
                             height: 10px;
                             width: 10px;
                             background: #2AFC30;
                             box-shadow: 0 0 5px 1px #2AFC30;
                             top:${(boxHeight - 10) / 2}px;
                             left:${boxWidth / 2 + r - 10}px;
                            }
                          .abnormalPublishPoint{
                             position: absolute;
                             border-radius: 50%;
                             height: 10px;
                             width: 10px;
                             background: rgb(255,67,92);
                             box-shadow: 0 0 5px 1px rgb(255,67,92);
                             top:${(boxHeight - 10) / 2}px;
                             left:${boxWidth / 2 + r - 10}px;
                            }
                          `}
                        </style>
                        <div className={styles["dashArray-one"]}
                             style={{
                                 width: r - 2,
                                 bottom: (boxHeight - dashArray) / 2 - dashArray + 6,
                                 left: boxWidth / 2 + 2
                             }}></div>
                        <div className={styles["dashArray-two"]}
                             style={{
                                 width: r - 2,
                                 bottom: (boxHeight - dashArray) / 2 - 9,
                                 left: boxWidth / 2 + 2
                             }}></div>
                    </div>
                )
            })
        }
    }

    render() {
        const {r,topHeight}=this.state
        return (
            <section className={styles.platform} style={{backgroundImage:'url(img/bg.png)',height:this.state.topHeight}}>
                <div className={styles["platform-appList"]}>
                    <div className={styles.counter}>
                        <Counter />
                    </div>
                    <div className={styles.message}>
                        <Message/>
                    </div>
                    <div className={styles.dynamicView}>
                        <div className={styles.block}>
                            <div className={styles["img-container"]}>
                                <img src="img/circle.png" style={{width: r, height: r, top: (topHeight - r) / 2}}/>
                            </div>
                            <div className={styles["word-container"]} style={{width:'100%',height: r, top: (topHeight - r) / 2}}>
                                <div>
                                    <div>拔吧把爸八扒坝</div>
                                    <div className={styles["bottom-word"]}>V2.0</div>
                                </div>
                            </div>
                            {this.loadCircle()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Index