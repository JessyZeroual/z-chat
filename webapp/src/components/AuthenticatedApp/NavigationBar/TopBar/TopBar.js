import React from 'react';
import PropTypes from 'prop-types';

import { TopBarStyled, BurgerWrapper, StyledBurger } from './TopBar.styled';

const TopBar = ({
  currentChannelName,
  setIsOpenSideBar,
  isOpenSideBar,
  isSmallScreen,
}) => {
  return (
    <TopBarStyled>
      <div className=" d-flex align-items-center h-100">
        <span className="font-weight-bold p-3">{`#${currentChannelName}`}</span>

        {isSmallScreen && (
          <BurgerWrapper>
            <StyledBurger
              open={isOpenSideBar}
              onClick={() => setIsOpenSideBar(!isOpenSideBar)}
            >
              <div />
              <div />
              <div />
            </StyledBurger>
          </BurgerWrapper>
        )}
      </div>
    </TopBarStyled>
  );
};

TopBar.propTypes = {
  currentChannelName: PropTypes.string.isRequired,
  isOpenSideBar: PropTypes.bool.isRequired,
  setIsOpenSideBar: PropTypes.func.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};

export default TopBar;
