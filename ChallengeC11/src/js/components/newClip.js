import React, { Component } from 'react';
import {
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Button,
  InputNumber,
} from 'antd';

class NewClip extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
 
  render() {
    const { visible, onClose, form } = this.props;
    return(
      <Drawer
        title="New clip"
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Row>
          <Col xs={24} md={{ span: 16, offset: 4 }} lg={{ span: 8, offset: 8 }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {form.getFieldDecorator('clipName', {
                  rules: [{ required: true, message: 'Please input a name!' }],
                })(
                  <Input placeholder="Clip Name" />,
                )}
              </Form.Item>
              <Row>
                <Col xs={24} md={11}>
                  <Form.Item>
                    {form.getFieldDecorator('startTime', {
                      rules: [{ required: false, min: 0 }],
                    })(
                      <Input min={0} type="number" placeholder="Start Time (secs)" />,
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={{ span: 11, offset: 2 }}>
                  <Form.Item>
                    {form.getFieldDecorator('endTime', {
                      rules: [{ required: false, min: 0 }],
                    })(
                      <Input min={0} type="number" placeholder="End Time (secs)" />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    )
  }
}

export default Form.create()(NewClip);
