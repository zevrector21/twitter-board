import React, { useEffect, useState } from 'react';
import { Layout, notification } from "antd";
import { useStore } from '../store';
import  ApiManager from '../service';


const { Header, Content, Footer } = Layout;

function Wizard(props) {

  let formRender = null;
  const [state, setState] = useStore();
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
    <Layout className="app-layout">
      <Content>
      </Content>
    </Layout>
  )
}

export default Wizard;
