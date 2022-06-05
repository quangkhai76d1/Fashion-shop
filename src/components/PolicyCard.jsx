import React from "react";
import PropTypes from "prop-types";

const PolicyCard = (props) => {
  return (
    <div className='policy__card'>
      <div className='policy__card__icon'>
        <i className={props.icon}></i>
      </div>
      <div className='policy__card__info'>
        <div className='policy__card__info--name'>
          <p>{props.name}</p>
        </div>
        <div className='policy__card__info--desc'>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

PolicyCard.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.string,
};

export default PolicyCard;
