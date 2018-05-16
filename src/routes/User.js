import React, { Component } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import UserSerch from '../components/UserSearch';
import { connect } from 'dva';
import { Button } from 'antd';
class User extends Component {
    //删除用户
    handleDelteUser = (userId) => {
        this.props.dispatch({
            type: 'user/deleteUser',
            payload: userId
        })
    }
    //添加用户
    handleAddUser = (values) => {
        this.props.dispatch({
            type: 'user/addUser',
            payload: values
        })
    }
    //修改用户
    handleUpdate = (values) => {
        this.props.dispatch({
            type: 'user/updateUser',
            payload: values
        })
    }
    //查询用户 
    handleQuery = (name) => {
        this.props.dispatch({
            type: 'user/queryUser',
            payload: name
        })
    }
    render() {
        const { user } = this.props;
        return (
            <div>
                <div style={{ height: 50 }}>
                    <UserForm
                        handleAddUser={this.handleAddUser}
                    >
                        <Button
                            style={{ margin: 15 }}
                            type="primary">
                            添加
                         </Button>
                    </UserForm>
                    <UserSerch
                        handleQuery={this.handleQuery}
                    />
                </div>
                <UserTable
                    handleUpdate={this.handleUpdate}
                    handleDelteUser={this.handleDelteUser}
                    user={user}
                />
            </div>
        )
    }
}

export default connect(({ user }) => ({ user }))(User);
