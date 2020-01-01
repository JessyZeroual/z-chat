import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import SideBarNav from './SideBarNav';

const WorkSpace = ({ currentUser }) => (
  <BrowserRouter>
    <SideBarNav currentUser={currentUser} />
  </BrowserRouter>
);

WorkSpace.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default WorkSpace;
