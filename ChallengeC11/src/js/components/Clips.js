import React, { Fragment, Component } from 'react';
import {
  List,
  Button,
} from 'antd';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './styles';

const getClips = (clips, playClip, editClip, deleteClip) => clips.map((clip, index) => (
  <List.Item
    key={`clip${index + 1}`}
    actions={[
      <Button key={`play${index + 1}`} shape="circle" icon="caret-right" onClick={() => playClip(clip.startTime, clip.endTime)} />,
      <Button key={`edit${index + 1}`} shape="circle" icon="edit" onClick={() => editClip(clip)} />,
      <Button key={`delete${index + 1}`} shape="circle" icon="delete" onClick={() => deleteClip(clip.clipName)} />,
    ]}
  >
    {clip.clipName}
  </List.Item>
));


class Clips extends Component {
  constructor() {
    super();
    this.handlePlayClip = this.handlePlayClip.bind(this);
    this.handleEditClip = this.handleEditClip.bind(this);
    this.handleDeleteClip = this.handleDeleteClip.bind(this);
  }

  handlePlayClip(start, end) {
    const { playClip } = this.props;
    playClip(start, end);
  }

  handleEditClip(clip) {
    const { showDrawer } = this.props;
    showDrawer(clip);
  }

  handleDeleteClip(clipName) {
    const { deleteClip } = this.props;
    deleteClip(clipName);
  }

  render() {
    const { showDrawer, clips } = this.props;

    return (
      <Fragment>
        <List theme="dark">
          <List.Item
            key="clip0"
            actions={[
              <Button key="play0" shape="circle" icon="caret-right" onClick={() => this.handlePlayClip()} />,
            ]}
          >
            Full Video
          </List.Item>
          {getClips(clips, this.handlePlayClip, this.handleEditClip, this.handleDeleteClip)}
        </List>
        <Button shape="circle" icon="plus" onClick={showDrawer} />
      </Fragment>
    );
  }
}

Clips.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  playClip: PropTypes.func.isRequired,
  addClip: PropTypes.func.isRequired,
  deleteClip: PropTypes.func.isRequired,
  clips: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Clips);
