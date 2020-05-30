import styled from 'styled-components';
import {
  SideBarWidth,
  primaryBackgroundColor,
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
  color: #ccc0cc;
  border-bottom: 2px solid #4b264b;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    color: white;
    background-color: #350c37;
  }
`;

export const MainSideBar = styled.div`
  overflow-y: auto;
  padding: 10px 0px;
  border-bottom: 2px solid #4b264b;
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
  color: ${props => (props.active ? 'white' : '#ccc0cc')};
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #350c37;
  }
`;

export const WrapperChannels = styled.div`
  display: flex;
  align-items: center;
  color: #ccc0cc;
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
  color: #ccc0cc;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:hover {
    background-color: #4b264b;
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
  color: #ccc0cc;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
