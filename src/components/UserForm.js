import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  class extends Component {
    render() {
      const { visible, onCancel, onCreate, form, userData } = this.props;
      const { getFieldDecorator } = form;
      let name = '', age = '', address = '';
      if (userData) {
        name = userData.name;
        age = userData.age;
        address = userData.address;
      }
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator('age', {
                initialValue: age,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address', {
                initialValue: address,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>

          </Form>
        </Modal>
      );
    }
  }
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { handleAddUser, handleUpdate } = this.props;
      if (handleAddUser) {
        handleAddUser(values);
      } else if (handleUpdate) {
        const { userId } = this.props.userData;
        const updateUser = { ...values, userId: userId };
        handleUpdate(updateUser);
      } else {
        return;
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    const { children, userData } = this.props;
    return (
      <div style={{ display: "inline-block", float: 'right', height: 30 }}>
        <a style={{ float: 'none' }} type="primary" onClick={this.showModal}>{children}</a>
        <CollectionCreateForm
          userData={userData}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;