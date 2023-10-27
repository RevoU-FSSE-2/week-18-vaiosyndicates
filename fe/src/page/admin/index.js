import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { lib } from '../../util';
import { useState } from 'react';
import { notification, Table as Tables, Popconfirm, Button, Space } from 'antd';
const urls = lib.url

const Admin = () => {
  const tokens = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate()
  
  const [api, contextHolder] = notification.useNotification()

  const [load, setLoad] = useState(true)
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if(load) {
      getUsers()
    }
  })

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (list, key) => (
        
        <Space size="middle">
          <Popconfirm
            key={key}
            title="Delete the task"
            description="Are you sure to delete this user?"
            onConfirm={() => deleteUserd(list.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              type: 'default',
              loading: loader
            }}
          >
            <Button className='bg-gray-600 text-slate-300' >Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await axios.get(`${urls}/users`, { 
        headers: {
          Authorization: `Bearer ${tokens}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      setLoad(false)
      setData(response.data.results)

    } catch (error) {
      setLoad(false)
      if(error.response.status === 401) {
        api.open({
          message: 'Network Error',
          description:
            `Session Expired`,
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        
        setTimeout(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('refreshtoken')
          localStorage.removeItem('userid')
          localStorage.removeItem('role')
          navigate(0)
        }, '2000');
      } else {
        api.open({
          message: 'Network Error',
          description:
            `${error.message}`,
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      }
    }

  }

  const logOut = async () => {
    const refreshToken = JSON.parse(localStorage.getItem('refreshtoken'))
    const token = JSON.parse(localStorage.getItem('token'))

    try {
      const value = {
        refreshToken: refreshToken
      }
      const response = await axios.post(`${urls}/auth/logout`, value , {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if(response.status === 204) {
        api.open({
            message: 'Logout',
            description:
              `Logout Success`,
            className: 'custom-class',
            style: {
              width: 600,
            },
          });
          
          setTimeout(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshtoken')
            localStorage.removeItem('userid')
            localStorage.removeItem('role')
            navigate(0)
          }, '2000');
      }      
    } catch (error) {
      if(error.response.status === 401) {
        api.open({
          message: 'Network Error',
          description:
            `Session Expired`,
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        
        setTimeout(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('refreshtoken')
          localStorage.removeItem('userid')
          localStorage.removeItem('role')
          navigate(0)
        }, '2000');
      } else {
        api.open({
          message: 'Network Error',
          description:
            `${error.message}`,
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      }
    }
  }

  const deleteUserd = async (id) => {

    try {
      setLoader(true)
      const response = await axios.delete(`${urls}/users/${id}`, { 
        headers: {
          Authorization: `Bearer ${tokens}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if(response.status === 204) {
        setLoader(false)
        getUsers()
      }
    } catch (error) {
      if(error.response.status === 401) {
        api.open({
          message: 'Network Error',
          description:
            `Session Expired`,
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
        
        setTimeout(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('refreshtoken')
          localStorage.removeItem('userid')
          localStorage.removeItem('role')
          navigate(0)
        }, '2000');
      } else {
        api.open({
          message: 'Network Error',
          description:
            `${error.message}`,
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      }
    }

  
  }
  
  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center h-screen bg-zinc-800">
        <div className="flex flex-col h-screen justify-center">
          <div className='flex justify-between mb-6'>
            <div>
              <h1 className="text-4xl font-bold text-purple-600"> Admin Dashboard</h1>
            </div>
            <div>
              <Button 
                type="primary"
                size='large'
                className='bg-zinc-600 font-bold text-purple-500'
                onClick={() => logOut()}
              >
                Logout
              </Button>
            </div>
          </div>
          <div className='flex'>
            <div>
              <Tables columns={columns} dataSource={data.length > 0 ? data : []} />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Admin