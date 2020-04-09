import React from 'react';
import PropTypes from 'prop-types';

import {
  ExtraInfoWrapper,
  HeaderExtraInfo,
  ContentExtraInfo,
} from './ExtraInfo.styled';

const ExtraInfo = ({ extraInfo }) => (
  <>
    {extraInfo.title && (
      <ExtraInfoWrapper>
        <HeaderExtraInfo>
          <img
            width="16"
            height="16"
            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${extraInfo.url}`}
            alt={`Icon ${extraInfo.url.match(/:\/\/(.[^/]+)/)[1]}`}
          />
          <b className="ml-2 font-bold">
            {extraInfo.url.match(/:\/\/(.[^/]+)/)[1]}
          </b>
        </HeaderExtraInfo>

        <ContentExtraInfo>
          <a href={extraInfo.url} target="_blank" rel="noopener noreferrer">
            {extraInfo.title}
          </a>
          <p>{extraInfo.description}</p>
        </ContentExtraInfo>
      </ExtraInfoWrapper>
    )}
  </>
);

ExtraInfo.propTypes = {
  extraInfo: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ExtraInfo;
