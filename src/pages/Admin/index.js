import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar } from 'antd';
import Login from './Login';
import UserBoard from './UserBoard';
import './index.scss'
import { useStore } from '../../store';


const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

const menus = [
  { key: 'users', label: 'Users', icon: 'user' },
]

function Admin(props) {

  const history = useHistory();
  // const { menukey } = useParams();
  const menukey = 'users';
  const [pagination, setpagination] = useState({})
  const [state, setState] = useStore();

  useEffect(() => {
    setState({...state, 
      currentUser: localStorage.getItem('twitter_token')
    })
    const params = new URLSearchParams(location.search)
    let current = parseInt(params.get('current'), 10)
    if (!current) current = 1
    setpagination({
      pageSize: 10,
      current: current,
    })
  }, [props])

  const logout = () => {
    localStorage.removeItem('twitter_token')
    setState({...state, 
      currentUser: null
    })
  }

  let renderPage = ''

  const accountMenu = (
    <Menu>
      <Menu.Item key="1">
        Account Setting
      </Menu.Item>
      <Menu.Item key="2">
        Log Out
      </Menu.Item>
    </Menu>
  )

  if (!state.currentUser)
    renderPage = <Login />
  else
    renderPage = <UserBoard pagination={pagination} />

  return (
    <Layout className="admin-layout">
      <Header className="d-flex">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={menukey} style={{ lineHeight: '64px', width: '100%' }}>
          {menus.map(item => (
            <Menu.Item key={item.key}>
              <Link to={{ pathname: `/` }}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        {
          state.currentUser? 
          <div className="auth-btn" onClick={logout}>Logout</div>
          :
          <div className="auth-btn">Login</div>
        }
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="admin-page-wrapper">{renderPage}</div>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Admin;

