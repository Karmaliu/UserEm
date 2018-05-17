import { Table, Divider } from 'antd';
import React from 'react';
import UserForm from './UserForm';

export default class UserTable extends React.Component {
	columns = [
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '年龄',
			dataIndex: 'age',
			key: 'age'
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address'
		},
		{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<div style={{ width: 80 }}>
					<span >
						<a onClick={() => this.props.handleDelteUser(record.userId)}> 删除 </a>
						<Divider type="vertical" />
						<UserForm
							userData={record}
							handleUpdate={this.props.handleUpdate}
						>
							修改
					</UserForm>
					</span>
				</div>
			)
		}
	];
	render() {
		const { user: { list, loading } } = this.props;
		return (
			<Table
				columns={this.columns}
				dataSource={list}
				loading={loading}
			/>
		)
	}
}
