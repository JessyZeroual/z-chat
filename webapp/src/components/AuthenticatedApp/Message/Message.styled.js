import styled from 'styled-components';

export const MessageListWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MessageListDivider = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;

  &:before {
    border-top: 1px solid #dfdfdf;
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 95%;
    z-index: -1;
  }
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

export const BadgeDate = styled.span`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
`;

export const MessageListEmpty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;
