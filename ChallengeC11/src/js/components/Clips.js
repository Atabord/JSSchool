import React, { Fragment } from 'react';
import {
  List,
  Button,
} from 'antd';
import injectSheet from 'react-jss';
import styles from './styles';

const Clips = ({showDrawer}) => (
  <Fragment>
    <List theme="dark">
      <List.Item key="1">Full Video</List.Item>
    </List>
    <Button shape="circle" icon="plus" onClick={showDrawer} />
  </Fragment>
);

export default injectSheet(styles)(Clips);
