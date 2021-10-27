import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Table, Button, notification, Input } from 'antd';
import  ApiManager from '../../service';
import moment from 'moment';

function UserBoard(props) {

  const history = useHistory();
  const {pagination} = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false)
  const [activeUser, setActiveUser] = useState()
  const downloadBtn = useRef()

  useEffect(() => {
    loadList(pagination)
  }, [pagination])

  const loadList = (pagination) => {
    setLoading(true)
    ApiManager.getUsersList({
      limit: pagination.pageSize,
      skip: pagination.pageSize * (pagination.current - 1),
    }).then(res => {
      setData(res.data)
      setLoading(false)
    })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    history.push({
      pathname: '/admin/users',
      search: `?current=${pagination.current}`,
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '15%'
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      width: '15%'
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers',
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: 'Reply Count',
      dataIndex: 'replyCount',
      key: 'replyCount',
    },
    {
      title: 'Quote Count',
      dataIndex: 'quoteCount',
      key: 'quoteCount',
    },
    {
      title: 'Tweets Count',
      dataIndex: 'tweetsCount',
      key: 'tweetsCount',
    },
    {
      title: 'Total Points',
      dataIndex: 'totalPoints',
      key: 'totalPoints',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '12%',
      render: (text, record) => {
        return moment(text).format('L')
      }
    }
  ] 

  return (
    <div className="admin-page">
      <Table
        columns={columns}
        rowKey={record => record._id}
        dataSource={data.users}
        pagination={{ pageSize: pagination.pageSize, current: pagination.current, total: data.total }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default UserBoard;
