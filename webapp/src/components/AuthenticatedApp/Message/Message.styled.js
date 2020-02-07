import styled from 'styled-components';

export const MessageListWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderMessageList = styled.div`
  height: 60px;

  border-bottom: 1px solid #e2e2e2;
`;

export const MainMessageList = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
`;

export const FooterMessageList = styled.div`
  margin-top: auto;
`;

export const MessageListEmpty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;
