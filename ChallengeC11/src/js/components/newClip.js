import React, { Component } from 'react';
import {
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Button,
} from 'antd';
import PropTypes from 'prop-types';
/* eslint no-unused-expressions:
  ["error", { "allowShortCircuit": true, "allowTernary": true }] */

class NewClip extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      form, addClip, onClose, editClip, info,
    } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (Number(values.endTime) <= Number(values.startTime)) {
          console.log('err end Time is less or equal to start time');
        } else {
          const clip = {
            ...values,
          };
          info.clipName
            ? editClip({ oldName: info.clipName, clip })
            : addClip(clip);
          form.resetFields();
          onClose();
        }
      }
    });
  }

  render() {
    const {
      visible, onClose, form, info,
    } = this.props;
    return (
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
                  initialValue: info.clipName,
                })(
                  <Input placeholder="Clip Name" />,
                )}
              </Form.Item>
              <Row>
                <Col xs={24} md={11}>
                  <Form.Item>
                    {form.getFieldDecorator('startTime', {
                      rules: [{ required: false, min: 0 }],
                      initialValue: info.startTime,
                    })(
                      <Input min={0} type="number" placeholder="Start Time (secs)" />,
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={{ span: 11, offset: 2 }}>
                  <Form.Item>
                    {form.getFieldDecorator('endTime', {
                      rules: [{ required: false, min: 0 }],
                      initialValue: info.endTime,
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
    );
  }
}

NewClip.defaultProps = {
  visible: false,
};

NewClip.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  addClip: PropTypes.func.isRequired,
  editClip: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  info: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Form.create()(NewClip);
