import React, {Component} from 'react'
import styles from './style.less'
import {enclosure} from 'enclosure-utils'
import {Layout, Menu, Icon,Upload, message, Button,} from 'antd';
const {Header, Sider, Content} = Layout;


class Home extends Component {
    static contextTypes={
        router:React.PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }
    componentWillMount(){
        this.context.router.push("/navi1")
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    /* <Link />不需要此方法*/
    menuClick(param){
       this.context.router.push(param.key)
    }
    render() {
        const props = {
            name: 'file',
            action: 'baseController/upload',
            headers: {
                authorization: 'authorization-text',
            },
            showUploadList:false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    enclosure({serviceId:'fileServiceImpl',method:'addFile',param:info.file.response.data}).then((e)=>{
                        if(e.status==='1'){
                            message.success(`${info.file.name} file uploaded successfully`);
                        }
                    })
                } else if (info.file.status === 'error') {
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
                        <Menu.Item key="/navi1">
                            <Icon type="database" />
                            <span className="nav-text">todo_list</span>
                        </Menu.Item>
                        <Menu.Item key="/navi2">
                            <Icon type="video-camera"/>
                            <span className="nav-text">exception</span>
                        </Menu.Item>
                        <Menu.Item key="/navi3">
                            <Icon type="upload"/>
                            <span className="nav-text">images</span>
                        </Menu.Item>
                        <Menu.Item key="/navi4">
                            <Icon type="file"/>
                            <span className="nav-text">files</span>
                        </Menu.Item>
                        <Menu.Item key="/chat">
                            <Icon type="team"/>
                            <span className="nav-text">聊天</span>
                        </Menu.Item>
                        <Menu.Item key="/todo">
                            <Icon type="home"/>
                            <span className="nav-text">返回</span>
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
                        <span style={{marginLeft:'70%'}}>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Click to Upload
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
