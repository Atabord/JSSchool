import React from 'react';
import {
  Menu,
  Row,
  Col,
} from 'antd';
import Video from '../containers/Video';

const App = () => (
  <Row>
    <Col xs={24} md={8} lg={6}>
      <Menu theme="dark">
        <Menu.Item key="1">Full Video</Menu.Item>
      </Menu>
    </Col>
    <Col xs={24} md={16} lg={18}>
      <Row>
        <Col span={20} offset={2}>
          <Video />
        </Col>
      </Row>
    </Col>
  </Row>
);

export default App;
