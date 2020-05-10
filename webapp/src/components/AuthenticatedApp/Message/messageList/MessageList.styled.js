import styled from 'styled-components';
import {
  TopBarHeight,
  FooterMessageListHeight,
} from '../../../../constants/style-constants';

export const MessageListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MessageListDivider = styled.div`
  position: relative;
  text-align: center;
  margin: 20px 0px;

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

export const MainMessageList = styled.div`
  margin-top: ${TopBarHeight};
  margin-bottom: ${FooterMessageListHeight};
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const FooterMessageList = styled.div`
  position: fixed;
  bottom: 0;
  width: ${({ messageListWrapperWidth }) =>
    messageListWrapperWidth && `${messageListWrapperWidth}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${FooterMessageListHeight};
  background-color: #fff;
  z-index: 4;
  border-top: 1px solid #e2e2e2;
`;

export const BadgeDate = styled.span`
  background-color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  padding: 10px;
`;

export const MessageListEmpty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;
