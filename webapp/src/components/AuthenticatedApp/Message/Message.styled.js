import styled from 'styled-components';
import { SideBarWidth } from '../../../constants/style-constants';

export const MessageListWrapper = styled.div`
  height: 100%;
  width: 100%;
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
  height: calc(100% - 80px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const FooterMessageList = styled.div`
  position: 'fixed';
  width: 100%;
  height: 80px;
  bottom: offset;
  border-top: 1px solid #e2e2e2;
  background-color: '#fff';
`;

export const BadgeDate = styled.span`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
`;

export const MessageListEmpty = styled.div`
  height: calc(100% - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0px 10px;
`;

export const FormCreateMessage = styled.form`
  display: flex;
  width: ${({ isSmallScreen }) =>
    isSmallScreen ? '100%' : `calc(100% - ${SideBarWidth})`};
  padding: 16px;
`;
