import styled from 'styled-components';

// #region SideBar
export const SideBar = styled.div`
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
  height: 100%;
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

// #endregion

// #region MessageList
export const HeaderMessageList = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
`;

export const MainMessageList = styled.div`
  width: 100%;
  height: 100%;
`;

export const FooterMessageList = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const MessageListEmpty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

// #endregion

export const Container = styled.div`
  height: 100vh;
`;
