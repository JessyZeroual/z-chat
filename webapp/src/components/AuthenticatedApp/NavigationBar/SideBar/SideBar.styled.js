import styled from 'styled-components';
import {
  SideBarWidth,
  primaryBackgroundColor,
  primaryBackgroundColorHover,
} from '../../../../constants/style-constants';

export const SideBarStyled = styled.div`
  position: ${props => props.isSmallScreen && 'fixed'};
  width: ${props => (props.isSmallScreen ? '80%' : SideBarWidth)};
  height: 100%;
  font-size: 15px;
  background-color: ${primaryBackgroundColor};
  z-index: 5;
  display: flex;
  flex-direction: column;
  transform: ${props =>
    props.isOpenSideBar ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.2s ease-out;
`;

export const HeaderSideBar = styled.div`
  height: 60px;
  padding: 10px 20px;
  color: #bdc5ce;
  border-bottom: 2px solid #0a182a;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    color: white;
    background-color: ${primaryBackgroundColorHover};
  }
`;

export const MainSideBar = styled.div`
  overflow-y: auto;
  padding: 10px 0px;
  border-bottom: 2px solid #0a182a;
`;

export const FooterSideBar = styled.div`
  margin-top: auto;
  font-size: 1.2em;
  height: 70px;
  color: white;
`;

export const ButtonSideBarStyled = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 25px;
  list-style-type: none;
  font-weight: ${props => props.hasNotification && 'bold'};
  color: ${props => (props.hasNotification ? 'white' : '#bdc5ce')};
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    color: white;
    background-color: ${primaryBackgroundColorHover};
  }
`;

export const WrapperChannels = styled.div`
  display: flex;
  align-items: center;
  color: #bdc5ce;
  padding: 5px 20px;
`;

export const ButtonCreateChannel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: none;
  margin-left: auto;
  width: 25px;
  height: 25px;
  color: #bdc5ce;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:hover {
    background-color: #0a182a;
  }
`;

export const ButtonDropdownChannel = styled.button`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: none;
  margin-left: auto;
  width: 100%;
  height: 25px;
  color: #bdc5ce;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
