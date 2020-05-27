import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

import { primaryBackgroundColor } from '../constants/style-constants';

const Spinner = () => (
  <div
    style={{ marginTop: 250 }}
    className="d-flex justify-content-center align-items-center"
  >
    <HashLoader sizeUnit="px" size={120} color={primaryBackgroundColor} />
  </div>
);

export default Spinner;
