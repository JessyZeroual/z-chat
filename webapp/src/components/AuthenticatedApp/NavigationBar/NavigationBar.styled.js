import styled from 'styled-components';

export const SideBar = styled.div`
  width: 250px;
  height: 100%;
  background-color: #3f0f40;
`;

export const HeaderSideBar = styled.div`
  padding: 10px 20px;
  width: 100%;
  color: #ccc0cc;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    color: white;
    background-color: #350c37;
  }
`;

export const MainSideBar = styled.div`
  /* overflow-y: scroll; */
  padding: 10px 0px;
`;

export const FooterSideBar = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 1.2em;
  height: 70px;
  width: 100%;
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
