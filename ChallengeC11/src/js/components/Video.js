import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './styles';
import VideoControllers from '../containers/videoControllers';
/* eslint no-unused-expressions:
  ["error", { "allowShortCircuit": true, "allowTernary": true }] */

function openFullScreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

class Video extends Component {
  constructor() {
    super();
    this.state = {
      duration: 0,
    };
    this.videoRef = React.createRef();
    this.videoContainerRef = React.createRef();
    this.handleVideoPlay = this.handleVideoPlay.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.loadClipAndPlay = this.loadClipAndPlay.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      paused, muted, volume, currentTime, expanded, videoSource,
    } = this.props;
    const { current } = this.videoRef;

    (paused !== prevProps.paused)
      && this.handleVideoPlay();
    (muted !== prevProps.muted)
      && this.handleMute();
    (volume !== prevProps.volume)
      && this.handleVolumeChange(volume);
    (currentTime !== current.currentTime)
      && this.handleTimeChange();
    (expanded !== prevProps.expanded)
      && this.handleExpand();
    (videoSource !== prevProps.videoSource)
      && this.loadClipAndPlay();
  }

  videoInit() {
    const { current } = this.videoRef;
    this.setState({
      duration: current.duration,
    });
  }

  handleVideoPlay() {
    const { paused, currentTime, moveTime } = this.props;
    const { current } = this.videoRef;
    if (paused) {
      current.pause();
    } else {
      current.play();
      (currentTime >= current.duration)
        && moveTime(0);
    }
  }

  loadClipAndPlay() {
    const { playVideo, paused } = this.props;
    const { current } = this.videoRef;
    if (paused) {
      current.load();
      playVideo();
    } else {
      current.pause();
      current.load();
      current.play();
    }
  }

  handleTimeChange() {
    const { currentTime } = this.props;
    this.videoRef.current.currentTime = currentTime;
  }

  handleTimeUpdate() {
    const { currentTime } = this.videoRef.current;
    const { showTimeRunning } = this.props;
    showTimeRunning(currentTime);
  }

  handleMute() {
    const { muted } = this.props;
    const { current } = this.videoRef;
    current.muted = muted;
  }

  handleVolumeChange(volume) {
    const { current } = this.videoRef;
    current.volume = volume;
  }

  handleExpand() {
    const elem = this.videoContainerRef.current;
    const { expanded } = this.props;
    expanded
      ? openFullScreen(elem)
      : exitFullscreen();
  }

  render() {
    const {
      playVideo, classes, videoSource,
    } = this.props;
    const { duration } = this.state;
    /* eslint-disable jsx-a11y/media-has-caption */
    return (
      <div ref={this.videoContainerRef}>
        <video
          ref={this.videoRef}
          className={classes.w100}
          onCanPlay={this.videoInit.bind(this)}
          onTimeUpdate={this.handleTimeUpdate.bind(this)}
          onEnded={playVideo}
        >
          <source src={videoSource} />
        </video>
        <VideoControllers duration={duration} />
      </div>
    );
  }
}

Video.defaultProps = {
  paused: true,
  classes: {},
  currentTime: 0,
  videoSource: process.env.VIDEO_URL,
  muted: false,
  volume: 1,
  expanded: false,
};

Video.propTypes = {
  paused: PropTypes.bool,
  expanded: PropTypes.bool,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  currentTime: PropTypes.number,
  videoSource: PropTypes.string,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  showTimeRunning: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  moveTime: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Video);
