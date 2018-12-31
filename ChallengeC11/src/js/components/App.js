import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
} from 'antd';
import injectSheet from 'react-jss';
import styles from './styles';
import Video from '../containers/Video';
import Clips from '../containers/Clips';
import NewClip from '../containers/newClip';
/* eslint no-unused-expressions:
  ["error", { "allowShortCircuit": true, "allowTernary": true }] */


// Main component with the design of the whole app
class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      info: {},
    };
    this.onClose = this.onClose.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  onClose() {
    this.setState({
      visible: false,
      info: {},
    });
  }

  showDrawer(info) {
    info
      ? this.setState({
        visible: true,
        info,
      })
      : this.setState({
        visible: true,
        info: {},
      });
  }


  render() {
    const { classes } = this.props;
    const { visible, info } = this.state;
    return (
      <Row>
        <Col xs={24} md={8} lg={6}>
          <Card className={classes.menu}>
            <Clips showDrawer={this.showDrawer} />
          </Card>
        </Col>
        <Col xs={24} md={16} lg={18}>
          <Card>
            <Row>
              <Col span={20} offset={2}>
                <Video />
              </Col>
            </Row>
          </Card>
        </Col>
        <NewClip
          info={info}
          visible={visible}
          onClose={this.onClose}
        />
      </Row>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(App);
