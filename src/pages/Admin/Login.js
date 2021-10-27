import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { TwitterInput } from '../../components/';
import { useStore } from '../../store';
import  ApiManager from '../../service';


function Login(props) {

  const [form] = Form.useForm();
  const [error, setError] = useState();
  const [state, setState] = useStore();

  const onFinish = (values) => {
    ApiManager.login(values).then(res => {
      if (res.data.status === 'success') {
        localStorage.setItem('twitter_token', res.data.token)
        setState({...state, 
          currentUser: res.data.token
        })
      }
      else {
        setError('Incorrect username or password.')
      }
    })
  }

  const formItemLayout = {
    layout: 'vertical',
    labelCol: {
      xs: { span: 24 },
    },
    wrapperCol: {
      sm: { span: 24 },
    },
  }

  return (
    <Form {...formItemLayout}
      className="wizard-form auth-form"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <div className="form-content">
        <TwitterInput
          type="text"
          label="Username"
          field="username"
          required={true}
        />        
        <TwitterInput
          type="password"
          label="Password"
          field="password"
          required={true}
        />
        { error && <p style={{ color: "red"}}>{error}</p>}
        <Button type="primary" className="primary-btn" htmlType="submit">Login</Button>
      </div>
    </Form>
  )
}

export default Login;
