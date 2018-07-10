/**
 * Created by LLB on 16/4/25.
 */
import React, {Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd'
import {enclosure} from 'enclosure-utils'
import styles from './style.less'
const FormItem = Form.Item;
class Index extends Component {
    static contextTypes={
        router:React.PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            error: "",
            confirmDirty:false,
            validateStatus:'',
        }
    }

    componentWillMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                enclosure({serviceId:'userService',method:'register',param:values},'noAuth').then((e)=>{
                    if(e.status==='1'){
                        message.success('注册成功,请登录')
                        this.context.router.push('/')
                    }
                })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    }
    checkUnique=(rule, value, callback)=>{
        //callback传内容，就是err，表单提交的时候，有错误，提交不了，如果不验证成功不callback，表单提交会一直调用此方法！
        if(!value){
            this.setState({validateStatus:'error'})
            callback('Please input your LoginName!')
            return
        }
        this.setState({validateStatus:'validating'})
        enclosure({serviceId:'userService',method:'checkUniqueUser',param:{loginName:value}},'noAuth').then((e)=>{
            if(e.status==='1'){
                this.setState({validateStatus:'error'})
                callback('existing loginName...');
            }
            else{
                this.setState({validateStatus:'success'})
                callback()
            }
        },(e)=>{console.log('errorThrown:---------->',e)
        this.setState({validateStatus:'error'})
        })

    }

    render() {
        const {validateStatus} = this.state
        const { getFieldDecorator } = this.props.form;
        return (
          <section className={styles.register}>
              <Form onSubmit={this.handleSubmit} className={styles["login-form"]}>
                  <FormItem
                    hasFeedback
                      validateStatus={validateStatus}
                             >
                      {getFieldDecorator('loginName', {
                          rules: [{
                              validator: this.checkUnique,
                          }],
                      })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="LoginName" />
                      )}
                  </FormItem>
                  <FormItem>
                      {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }, {
                              validator: this.validateToNextPassword,
                          }],
                      })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                      )}
                  </FormItem>
                  <FormItem>
                      {getFieldDecorator('confirmPassword', {
                          rules: [{ required: true, message: 'Please confirm your Password!' },{
                              validator: this.compareToFirstPassword,
                          }],
                      })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}npm
                                 type="password"
                                 placeholder="confirmPassword"
                                 onBlur={this.handleConfirmBlur}
                          />
                      )}
                  </FormItem>
                  <FormItem>
                      {/*只能输入中文或者英文名字，长度为20不能混输*/}
                      {getFieldDecorator('username', {
                          rules: [{ required: true, message: 'Please input your correct name!',pattern:'^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\\.\\s]{1,20})$'}],
                      })(
                          <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
                      )}
                  </FormItem>

                  <FormItem>
                      <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
                          register
                      </Button>
                  </FormItem>
              </Form>
          </section>
        )
    }
}

Index = Form.create()(Index);
export default Index