import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

// This component will create the stars depending on the book raiting
class Stars extends Component {
  getStars() {
    const starIcons = [];
    const { rating } = this.props;
    const ratingNumber = Math.floor(rating);
    for (let i = 0; i < ratingNumber; i += 1) {
      starIcons.push(<FontAwesomeIcon icon={solidStar} key={`Star ${i}`} />);
    }
    if (ratingNumber !== 5) {
      for (let i = 0; i < (5 - ratingNumber); i += 1) {
        starIcons.push(<FontAwesomeIcon icon={regStar} key={`Star ${i}.2`} />);
      }
    }

    return starIcons;
  }

  render() {
    return (
      <div>
        {this.getStars()}
      </div>
    );
  }
}

Stars.defaultProps = {
  rating: 0,
};

Stars.propTypes = {
  rating: PropTypes.number,
};

export default Stars;
