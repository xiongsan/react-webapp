import React, {Component} from 'react'
import {connect} from 'react-redux'
import styles from './style.less'
import {Input, Button, notification} from 'antd'
import $ from 'jquery'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ws: null,
            content: ''
        }
    }

    componentDidMount() {
        const pathName = window.document.location.pathname;
        const projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        const host = window.location.host + projectName//主机名加端口号
        let ws = this.state.ws
        ws = new WebSocket(`ws://${host}/websocket`)
        this.setState({ws})
        const _this = this
        ws.onopen = function () {
            ws.send(window.sessionStorage.getItem('user')+'  加入聊天室');
        }
        ws.onmessage = function (event) {
            const message = event.data
            // console.log("来自服务气的消息",message)
            $('#div1').append(message + '<br/>')
        }

        ws.onerror = function (evt) {
            ws.close()
            console.log('websocket error', evt)
        }
        ws.onclose = function (evt) {
            ws.close()
            console.log('websocket is closed', evt)
        }
        document.getElementById("chat").onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === 13) {
                _this.send()
            }
        }
    }

    componentWillUnmount() {
        //组件销毁关闭连接
        const {ws} = this.state
        if (ws) {
            ws.send(window.sessionStorage.getItem('user')+'  离开聊天室');
            ws.close()
        }
    }

    send() {
        const {content} = this.state
        if (content) {
            const {ws} = this.state
            ws.send(window.sessionStorage.getItem('user')+ ':' + content)
            const input = $('input')
            input.focus()
            this.setState({content: ''})
            return
        }
        notification.error({
            message: '发送消息',
            description: '不能发送空消息',
            duration: 1
        })
    }

    inputChange = (e) => {
        this.setState({content: e.target.value})
    }

    render() {
        return (
            <div id='chat' className={styles.chat}>
                <div tabIndex='-1' id="div1" className={styles.windowDiv}/>
                <Input className={styles.inputDiv} value={this.state.content} onChange={this.inputChange}/>
                <div className={styles.buttonContainer}>
                    <Button onClick={this.send.bind(this)}>发送</Button>
                </div>
            </div>
        )
    }
}

function select(state) {
    return state.chat
}

export default connect(select)(Chat)
