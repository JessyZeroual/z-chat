import React from 'react';
import PropTypes from 'prop-types';

import SVGIconStyled from './SVGIcon.styled';

const getViewBox = name => {
  switch (name) {
    case 'chevron-down':
      return '0 0 16 16';
    case 'caret-right':
      return '0 0 16 16';
    case 'caret-down':
      return '0 0 16 16';
    case 'plus':
      return '0 0 16 16';
    case 'trash':
      return '0 0 24 24';
    default:
      return '0 0 16 16';
  }
};

const getPath = name => {
  switch (name) {
    case 'caret-right':
      return (
        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
      );
    case 'caret-down':
      return (
        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      );
    case 'plus':
      return (
        <>
          <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
          <path d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
        </>
      );
    case 'trash':
      return (
        <>
          <path d="m22.25 8.5h-20.5c-.414 0-.75-.336-.75-.75v-2c0-1.517 1.233-2.75 2.75-2.75h16.5c1.517 0 2.75 1.233 2.75 2.75v2c0 .414-.336.75-.75.75z" />
          <path d="m3 9.5v11.75c0 1.517 1.233 2.75 2.75 2.75h12.5c1.517 0 2.75-1.233 2.75-2.75v-11.75zm5.75 10.5c0 .552-.447 1-1 1s-1-.448-1-1v-7.5c0-.552.447-1 1-1s1 .448 1 1zm4.25 0c0 .552-.447 1-1 1s-1-.448-1-1v-7.5c0-.552.447-1 1-1s1 .448 1 1zm4.25 0c0 .552-.447 1-1 1s-1-.448-1-1v-7.5c0-.552.447-1 1-1s1 .448 1 1z" />
          <path d="m16 2v-.25c0-.965-.785-1.75-1.75-1.75h-4.5c-.965 0-1.75.785-1.75 1.75v.25z" />
        </>
      );
    case 'chevron-down':
      return (
        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      );
    default:
      return <path />;
  }
};

const SVGIcon = ({ name, fill, width }) => (
  <SVGIconStyled
    width={width}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={getViewBox(name)}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name)}
  </SVGIconStyled>
);

SVGIcon.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default SVGIcon;
