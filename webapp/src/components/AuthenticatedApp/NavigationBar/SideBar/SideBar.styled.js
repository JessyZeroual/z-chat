import styled from 'styled-components';
import {
  SideBarWidth,
  primaryBackgroundColor,
} from '../../../../constants/style-constants';

export const SideBarStyled = styled.div`
  position: ${props => props.isSmallScreen && 'fixed'};
  width: ${props => (props.isSmallScreen ? '80%' : SideBarWidth)};
  height: 100%;
  background-color: ${primaryBackgroundColor};
  z-index: 5;
  display: flex;
  flex-direction: column;
  transform: ${props =>
    props.isOpenSideBar ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.2s ease-out;
`;

export const HeaderSideBar = styled.div`
  padding: 10px 20px;
  color: #ccc0cc;
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
`;

export const FooterSideBar = styled.div`
  margin-top: auto;
  font-size: 1.2em;
  height: 70px;
  color: white;
`;

export const ButtonSideBar = styled.li`
  padding: 0px 20px;
  list-style-type: none;
  color: ${props => (props.active ? 'white' : '#ccc0cc')};
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #350c37;
  }
`;
