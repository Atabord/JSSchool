import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faVolumeUp,
  faVolumeOff,
  faPause,
  faExpand,
  faCompress,
} from '@fortawesome/free-solid-svg-icons';
import { Slider, Tooltip, Tag } from 'antd';
import injectSheet from 'react-jss';
import styles from './styles';

/* eslint no-unused-expressions:
  ["error", { "allowShortCircuit": true, "allowTernary": true }] */

function addZero(number) {
  let converted = '';
  number >= 10
    ? converted = number
    : converted = `0${number}`;
  return converted;
}


class VideoControllers extends Component {
  constructor() {
    super();
    this.state = {
      timeToSlide: 0,
      showTime: '0:00 / 0:00',
      marks: {},
    };
    this.videoRef = React.createRef();
    this.videoContainerRef = React.createRef();
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.getTime = this.getTime.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { timeToSlide } = this.state;
    const { duration, currentTime, clips } = this.props;
    if (prevState.timeToSlide !== timeToSlide) {
      this.getTime();
    }

    (duration !== prevProps.duration)
      && this.getTime();

    (currentTime !== prevProps.currentTime)
      && this.handleTimeUpdate();

    (clips !== prevProps.clips)
      && this.getMarkers();
  }

  getTime() {
    const { currentTime, duration } = this.props;
    const curmins = Math.floor(currentTime / 60);
    const cursecs = Math.floor(currentTime - curmins * 60);
    const durmins = Math.floor(duration / 60);
    const dursecs = Math.floor(duration - durmins * 60);
    const curTime = `${curmins}:${addZero(cursecs)}`;
    const durTime = `${durmins}:${addZero(dursecs)}`;
    const showTime = `${curTime} / ${durTime}`;
    this.setState({
      showTime,
    });
  }

  getMarkers() {
    const { clips, duration } = this.props;
    let result = {};
    const array = clips.map((clip) => {
      const initialMark = Math.floor(Number(clip.startTime) * 100 / duration);
      return {
        [initialMark]: {
          label: <Tooltip title={clip.clipName} visible />,
          style: {
            margin: '0',
          },
        },
      };
    });

    for (let i = 0; i < array.length; i += 1) {
      result = {
        ...result,
        ...array[i],
      };
    }

    this.setState({
      marks: result,
    });
  }

  handleTimeUpdate() {
    const { currentTime, duration } = this.props;
    const timeToSlide = currentTime * (100 / duration);
    this.setState({ timeToSlide });
  }

  handleTimeChange(percentage) {
    const { moveTime, duration } = this.props;
    const changeTo = duration * (percentage / 100);
    moveTime(changeTo);
  }

  handleVolumeChange(percentage) {
    const { changeVolume } = this.props;
    const changeVolTo = (percentage / 100);
    changeVolume(changeVolTo);
  }

  render() {
    const {
      timeToSlide,
      showTime,
      marks,
    } = this.state;
    const {
      paused,
      classes,
      expanded,
      muted,
      volume,
      muteVideo,
      playVideo,
      expandVideo,
    } = this.props;
    /* eslint-disable jsx-a11y/media-has-caption */

    return (
      <div className={`${classes.controlsContainer} ${classes.w100}`}>
        <Slider
          tipFormatter={null}
          defaultValue={0}
          step={0.00001}
          value={timeToSlide}
          marks={marks}
          onChange={this.handleTimeChange}
          className={classes.w100}
        />
        <button type="button" onClick={playVideo}>
          {paused
            ? <FontAwesomeIcon icon={faPlay} />
            : <FontAwesomeIcon icon={faPause} />
          }
        </button>
        <span>{showTime}</span>
        <button type="button" onClick={muteVideo}>
          {(muted || volume === 0)
            ? <FontAwesomeIcon icon={faVolumeOff} />
            : <FontAwesomeIcon icon={faVolumeUp} />
          }
        </button>
        <Slider
          defaultValue={100}
          step={5}
          className={classes.soundSlider}
          onChange={this.handleVolumeChange}
        />
        <button type="button" className={classes.expandButton} onClick={expandVideo}>
          {expanded
            ? <FontAwesomeIcon icon={faCompress} />
            : <FontAwesomeIcon icon={faExpand} />
          }
        </button>
      </div>
    );
  }
}

VideoControllers.defaultProps = {
  paused: true,
  classes: {},
  currentTime: 0,
  muted: false,
  volume: 1,
  duration: 0,
  clips: [],
  expanded: false,
};

VideoControllers.propTypes = {
  paused: PropTypes.bool,
  expanded: PropTypes.bool,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  clips: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  currentTime: PropTypes.number,
  muteVideo: PropTypes.func.isRequired,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  duration: PropTypes.number,
  changeVolume: PropTypes.func.isRequired,
  expandVideo: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  moveTime: PropTypes.func.isRequired,
};

export default injectSheet(styles)(VideoControllers);
