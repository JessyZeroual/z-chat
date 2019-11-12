import styled from 'styled-components';

// #region SideBar
export const SideBar = styled.div`
  height: 100%;
  background-color: #3f0f40;
`;

export const HeaderSideBar = styled.div`
  font-size: 1.2em;
  height: 60px;
  width: 100%;
  color: white;
  background-color: #390e3a;
`;

export const MainSideBar = styled.div`
  /* overflow-y: scroll; */
  height: 100%;
`;

export const FooterSideBar = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 1.2em;
  height: 70px;
  width: 100%;
  color: white;
  background-color: #390e3a;
`;

export const ButtonSideBar = styled.li`
  list-style-type: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.4s;
  &:hover {
    background-color: #621564;
  }
`;

// #endregion

// #region MessageList
export const HeaderMessageList = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 2px solid #e2e2e2;
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
  font-size:25px;
`;

// #endregion

export const Container = styled.div`
  height: 100vh;
`;
