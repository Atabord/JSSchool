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
import { Slider } from 'antd';
import injectSheet from 'react-jss';
import styles from './styles';

function addZero(number) {
  let converted = '';
  number >= 10
    ? converted = number
    : converted = `0${number}`;
  return converted;
}

class Video extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      timeToSlide: 0,
      showTime: '0:00 / 0:00',
    };
    this.videoRef = React.createRef();
    this.videoContainerRef = React.createRef();
    this.handleVideoPlay = this.handleVideoPlay.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.getTime = this.getTime.bind(this);
    this.openFullScreen = this.openFullScreen.bind(this);
    this.exitFullscreen = this.exitFullscreen.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { timeToSlide } = this.state;
    if (prevState.timeToSlide !== timeToSlide) {
      this.getTime();
    }
  }

  getTime() {
    const { currentTime, duration } = this.videoRef.current;
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

  handleVideoPlay() {
    const { paused, playVideo } = this.props;
    /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
    paused
      ? this.videoRef.current.play()
      : this.videoRef.current.pause();
    playVideo();
  }

  handleTimeChange(percentage) {
    const { moveTime, currentTime } = this.props;
    const { duration } = this.videoRef.current;
    const changeTo = duration * (percentage / 100);
    moveTime(changeTo);
    this.videoRef.current.currentTime = currentTime;
  }

  handleTimeUpdate() {
    const { currentTime, duration } = this.videoRef.current;
    const timeToSlide = currentTime * (100 / duration);
    this.setState({ timeToSlide });
  }

  handleEnd() {
    const { playVideo } = this.props;
    playVideo();
  }

  handleMute() {
    const { muteVideo, muted } = this.props;
    const { current } = this.videoRef;
    current.muted = !muted;
    muteVideo();
  }

  handleVolumeChange(percentage) {
    const { current } = this.videoRef;
    const { changeVolume } = this.props;
    const changeVolTo = (percentage / 100);
    changeVolume(changeVolTo);
    current.volume = changeVolTo;
  }

  openFullScreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    this.setState({
      expanded: true,
    });
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    this.setState({
      expanded: false,
    });
  }

  handleExpand() {
    const elem = this.videoContainerRef.current;
    if (!document.fullscreen) {
      this.openFullScreen(elem);
    } else {
      this.exitFullscreen();
    }
  }

  render() {
    const {
      expanded,
      timeToSlide,
      showTime,
    } = this.state;
    const {
      paused, classes, muted, volume,
    } = this.props;
    /* eslint-disable jsx-a11y/media-has-caption */
    return (
      <div ref={this.videoContainerRef}>
        <video
          ref={this.videoRef}
          src={process.env.VIDEO_URL}
          className={classes.w100}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleEnd}
        />
        <div className={`${classes.controlsContainer} ${classes.w100}`}>
          <Slider
            tipFormatter={null}
            defaultValue={0}
            step={0.00001}
            value={timeToSlide}
            onChange={this.handleTimeChange}
            className={classes.w100}
          />
          <button type="button" onClick={this.handleVideoPlay}>
            {paused
              ? <FontAwesomeIcon icon={faPlay} />
              : <FontAwesomeIcon icon={faPause} />
            }
          </button>
          <span>{showTime}</span>
          <button type="button" onClick={this.handleMute}>
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
          <button type="button" className={classes.expandButton} onClick={this.handleExpand}>
            {expanded
              ? <FontAwesomeIcon icon={faCompress} />
              : <FontAwesomeIcon icon={faExpand} />
            }
          </button>
        </div>
      </div>
    );
  }
}

Video.defaultProps = {
  paused: true,
  classes: {},
  currentTime: 0,
  muted: false,
  volume: 1,
};

Video.propTypes = {
  paused: PropTypes.bool,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  currentTime: PropTypes.number,
  muteVideo: PropTypes.func.isRequired,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  changeVolume: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  moveTime: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Video);
