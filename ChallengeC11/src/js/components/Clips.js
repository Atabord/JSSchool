import React, { Fragment, Component } from 'react';
import {
  List,
  Button,
  Tag,
  Input,
} from 'antd';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './styles';

// This dumb component returns all the clips to show them on the playlist.
const getClips = (clips, playClip, editClip, deleteClip, search) => {
  // if there is a value on the search bar, apply filter
  // the filter search only clips with attribute tags and which includes search value on tags
  const filteredClips = search
    ? clips.filter(clip => Object.prototype.hasOwnProperty.call(clip, 'tags'))
      .filter(clip => clip.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
    : clips;
  // then use the filtered clips to show them in the playlist
  return filteredClips.map((clip, index) => (
    <List.Item
      key={`clip${index + 1}`}
      actions={[
        <Button key={`play${index + 1}`} shape="circle" icon="caret-right" onClick={() => playClip(clip.startTime, clip.endTime)} />,
        <Button key={`edit${index + 1}`} shape="circle" icon="edit" onClick={() => editClip(clip)} />,
        <Button key={`delete${index + 1}`} shape="circle" icon="delete" onClick={() => deleteClip(clip.clipName)} />,
      ]}
    >
      <List.Item.Meta
        title={clip.clipName}
        description={(
          <div>
            {clip.tags && clip.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      />
    </List.Item>
  ));
};

// This component show all the nodes on the playlist
class Clips extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.handlePlayClip = this.handlePlayClip.bind(this);
    this.handleEditClip = this.handleEditClip.bind(this);
    this.handleDeleteClip = this.handleDeleteClip.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handlePlayClip(start, end) {
    const { playClip } = this.props;
    playClip(start, end);
  }

  handleEditClip(clip) {
    const { showDrawer } = this.props;
    showDrawer(clip);
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  handleDeleteClip(clipName) {
    const { deleteClip } = this.props;
    const clips = JSON.parse(localStorage.getItem('videoClips'));
    const clipList = clips.filter(clip => clip.clipName !== clipName);
    localStorage.setItem('videoClips', JSON.stringify(clipList));
    deleteClip(clipList);
  }

  render() {
    const { showDrawer, clips } = this.props;
    const { search } = this.state;
    return (
      <Fragment>
        <List>
          <Input.Search
            placeholder="Search clip by tag"
            onChange={this.handleSearch}
          />
          <List.Item
            key="clip0"
            actions={[
              <Button key="play0" shape="circle" icon="caret-right" onClick={() => this.handlePlayClip()} />,
            ]}
          >
            Full Video
          </List.Item>
          {getClips(clips, this.handlePlayClip, this.handleEditClip, this.handleDeleteClip, search)}
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
