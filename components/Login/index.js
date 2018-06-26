import React, { Component } from 'react'
import styles from './style.less'
class Index extends Component {

    loginKeyEnter(e) {
        if (e.keyCode == 13) {
            let userInfo
            const username = this.refs.username.value
            const password = this.refs.password.value
            userInfo={username,password}
            this.props.login(userInfo)
        }
    }

    nextInput(e) {
        if (e.keyCode == 13) {
            this.refs.password.focus()
        }
    }

    login(){
        let userInfo
        const username = this.refs.username.value
        const password = this.refs.password.value
        userInfo={username,password}
        this.props.login(userInfo)
    }

    render() {
        const {projectName, orgName, orgLogoUrl} = this.props
        return (
            <div className={styles.login} style={{ backgroundImage: `url(${this.props.imgPath})`,backgroundSize:'cover'}}>   {/*相当于container*/}
                <div className={styles.header}>   {/*相当于顶部*/}
                    <img src={orgLogoUrl} className={styles.headerLogo} />
                    <span className={styles.headerText}>{orgName}</span>
                    <div className={styles.helpContainer}>
                        <span className={styles.headerRight}>?</span>
                    </div>
                </div>
                <div className={styles.loginBody}>   {/*相当于底部*/}
                    <div className={styles.loginInput}>
                        <div className={styles.inputHeader}>
                            {projectName}
                        </div>
                        <div className={styles.inputBody}>
                            <div className={styles.inputContainer}>
                                <input ref="username" onKeyDown={(e) => this.nextInput(e)} className={styles.userName}
                                    placeholder="用户名" defaultValue={window.sessionStorage.getItem('username')}/>
                                <input ref="password" onKeyDown={(e) => this.loginKeyEnter(e)} className={styles.password}
                                    type="password" placeholder="密码" />
                                <div className={styles.checkBoxGroup}>
                                    <div className={styles.rememberMe}>
                                        <input type="checkbox" />
                                        <span className={styles.passwordFont}>记住密码</span>
                                    </div>
                                    <div className={styles.forgetPassword}>
                                        <span className={styles.passwordFont}>忘记密码?</span>
                                    </div>
                                </div>
                                <button className={styles.button} onClick={() =>this.login()}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
                <span className={styles.copyright}>版权所有C 2014-2016 技术支持:江苏飞博软件股份有限公司</span>
            </div>
        )
    }
}

export default Index