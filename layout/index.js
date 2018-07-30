import React, {Component} from 'react'
import styles from './style.less'
import {enclosure} from 'enclosure-utils'
import {Layout, Menu, Icon, Upload, message, Button, Modal} from 'antd';

const {Header, Sider, Content} = Layout;
const {confirm} = Modal


class Home extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }

    componentWillMount() {
        this.context.router.push("/todolist")
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    /* <Link />不需要此方法*/
    menuClick(param) {
        if (param.key !== '/logout') {
            this.context.router.push(param.key)
            return
        }
        const _this = this;
        confirm({
            title: 'Are you sure logout?',
            content: '注销登录',
            onOk() {
                enclosure({serviceId: 'userService', method: 'logout'}, 'noAuth').then((e) => {
                    if (e.status === '1') {
                        _this.context.router.push('/')
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    render() {
        const _this = this;
        const props = {
            name: 'file',
            action: 'baseController/upload',
            headers: {
                authorization: 'authorization-text',
            },
            showUploadList: false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    enclosure({
                        serviceId: 'fileServiceImpl',
                        method: 'addFile',
                        param: info.file.response.data
                    }).then((e) => {
                        if (e.status === '1') {
                            message.success(`${info.file.name} file uploaded successfully`);
                        }
                    })
                } else if (info.file.status === 'error') {
                    if (info.file.response.path.indexOf("login.jsp") !== -1) {
                        _this.context.router.push("/")//session消失，回到登录页
                        return;
                    }
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        }
        return (
            <Layout className={styles.layout}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.menuClick.bind(this)}>
                        <Menu.Item key="/todolist">
                            <Icon type="database"/>
                            <span className="nav-text">待办事项</span>
                        </Menu.Item>
                        <Menu.Item key="/exception">
                            <Icon type="video-camera"/>
                            <span className="nav-text">异常列表</span>
                        </Menu.Item>
                        <Menu.Item key="/images">
                            <Icon type="upload"/>
                            <span className="nav-text">图片预览</span>
                        </Menu.Item>
                        <Menu.Item key="/files">
                            <Icon type="file"/>
                            <span className="nav-text">文件列表</span>
                        </Menu.Item>
                        <Menu.Item key="/solrFile">
                            <Icon type="file"/>
                            <span className="nav-text">solrDocument</span>
                        </Menu.Item>
                        <Menu.Item key="/chat">
                            <Icon type="team"/>
                            <span className="nav-text">聊天室</span>
                        </Menu.Item>
                        <Menu.Item key="/sysManage">
                            <Icon type="team"/>
                            <span className="nav-text">系统管理</span>
                        </Menu.Item>
                        <Menu.Item key="/dataTransform">
                            <Icon type="team"/>
                            <span className="nav-text">数据交换</span>
                        </Menu.Item>
                        <Menu.Item key="/todo">
                            <Icon type="home"/>
                            <span className="nav-text">返回</span>
                        </Menu.Item>
                        <Menu.Item key="/logout">
                            <Icon type="logout"/>
                            <span className="nav-text">注销</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle.bind(this)}
                        />
                        <span style={{marginLeft: '70%'}}>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload"/> Click to Upload
                                </Button>
                            </Upload>
                        </span>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home
