import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import {faStar as regStar} from '@fortawesome/free-regular-svg-icons';

// This component will create the stars depending on the book raiting
class Stars extends Component {
    
    getStars(){
        let starIcons = []
        const ratingNumber = Math.floor(Number(this.props.rating));
        for (let i = 0; i < ratingNumber; i += 1) {
            starIcons.push(<FontAwesomeIcon icon={solidStar} key={`Star ${i}`}/>);
        }
        if (ratingNumber !== 5) {
          for (let i = 0; i < (5 - ratingNumber); i += 1) {            
            starIcons.push(<FontAwesomeIcon icon={regStar} key={`Star ${i}.2`}/>)
          }
        }

        return starIcons
    }

    render(){
        return(
            <div>
                {this.getStars()}
            </div>
        )
    }
}

export default Stars;