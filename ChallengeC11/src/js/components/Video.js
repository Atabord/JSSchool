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

class Video extends Component {
  constructor() {
    super();
    this.state = {
      muted: false,
      expanded: false,
      timeToSlide: 0,
    };
    this.videoRef = React.createRef();
    this.handleVideoPlay = this.handleVideoPlay.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleVideoPlay() {
    const { paused, playVideo } = this.props;
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
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

  render() {
    const { muted, expanded, timeToSlide } = this.state;
    const { paused, classes } = this.props;
    return (
      <div>
        <video ref={this.videoRef} src={process.env.VIDEO_URL} className={classes.w100} onTimeUpdate={this.handleTimeUpdate}/>
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
          <button type="button">
            {muted
              ? <FontAwesomeIcon icon={faVolumeOff} />
              : <FontAwesomeIcon icon={faVolumeUp} />
            }
          </button>
          <Slider defaultValue={100} step={5} className={classes.soundSlider} />
          <button type="button">
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
  timeToSlide: 0,
};

Video.propTypes = {
  paused: PropTypes.bool,
  timeToSlide: PropTypes.number,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  currentTime: PropTypes.number,
  playVideo: PropTypes.func.isRequired,
  showCurrentTime: PropTypes.func.isRequired,
  moveTime: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Video);