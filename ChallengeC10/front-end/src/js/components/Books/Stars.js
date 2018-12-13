import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

const getStars = (rating) => {
  const starIcons = [];
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
};

// This component will create the stars depending on the book raiting
const Stars = (props) => {
  const { rating } = props;
  return (
    <div>
      { getStars(rating) }
    </div>
  );
};

Stars.defaultProps = {
  rating: 0,
};

Stars.propTypes = {
  rating: PropTypes.number,
};

export default Stars;
