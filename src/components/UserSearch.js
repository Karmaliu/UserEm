import React, { Component } from 'react';
import { Input } from 'antd';
const Search = Input.Search;

export default class UserSearch extends Component {
    render() {
        const {handleQuery} =this.props;
        return (
            <div style={{display:"inline-block",float:"left",margin:15}}>
                <Search
                    placeholder="请输入用户名"
                    onSearch={value => handleQuery(value)}
                    style={{ width: 200 }}
                />
            </div>
        )
    }
}
