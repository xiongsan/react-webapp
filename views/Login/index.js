/**
 * Created by LLB on 16/4/25.
 */
import React, {Component} from 'react'
import Login from 'components/Login'
import {message} from 'antd'
import {enclosure} from 'enclosure-utils'

const isLogin = window.isLogin
class Index extends Component {
    static contextTypes={
        router:React.PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {error: ""}
    }

    componentWillMount() {
        if (isLogin) {
            this.props.history.push('MonitorSet')
        }
    }

    login(user) {
        const username = user.username
        const password = user.password
        const param = {
            loginName: username,
            password: password
        }
        enclosure({serviceId:'loginService',method:'toLogin',param}).then((e)=>{
            if(e.status==='1'){
                window.sessionStorage.setItem('user',username);
                this.context.router.push('/todo')
            }
            else{
                message.error(e.tips)
            }
        })
    }


    render() {
        return (
            <Login login={(user)=>this.login(user)} orgName="江苏飞博软件股份有限公司"
                   projectName="文件共享平台" orgLogoUrl="img/logo.jpg" imgPath="img/beijing.png"/>
        )
    }
}
export default Index