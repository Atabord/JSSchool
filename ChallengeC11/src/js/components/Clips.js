import React, { Fragment, Component } from 'react';
import {
  List,
  Button,
} from 'antd';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './styles';

const getClips = (clips, playClip) => {
  const array = Object.values(clips);
  return array.map((clip, index) => (
    <List.Item
      key={`clip${index + 1}`}
      actions={[
        <Button key={`play${index + 1}`} shape="circle" icon="caret-right" onClick={playClip} />,
        <Button key={`edit${index + 1}`} shape="circle" icon="edit" />,
        <Button key={`delete${index + 1}`} shape="circle" icon="delete" />,
      ]}
    >
      {clip.clipName}
    </List.Item>
  ));
};

class Clips extends Component {
  constructor() {
    super();
    this.handlePlayClip = this.handlePlayClip.bind(this);
  }

  handlePlayClip() {
    const { playVideo } = this.props;
    playVideo();
  }

  render() {
    const { showDrawer, clips } = this.props;

    return (
      <Fragment>
        <List theme="dark">
          <List.Item
            key="clip0"
            actions={[
              <Button key="play0" shape="circle" icon="caret-right" onClick={this.handlePlayClip} />,
            ]}
          >
            Full Video
          </List.Item>
          {getClips(clips, this.handlePlayClip)}
        </List>
        <Button shape="circle" icon="plus" onClick={showDrawer} />
      </Fragment>
    );
  }
}

Clips.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  clips: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Clips);
