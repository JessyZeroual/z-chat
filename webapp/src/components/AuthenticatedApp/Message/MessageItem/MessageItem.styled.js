import styled from 'styled-components';

export const OptionMessageItem = styled.div`
  display: none;
  padding: 2px;
  margin-left: auto;
  border: 1px solid #e4e3e3;
  border-radius: 5px;
  background: white;
`;

export const ButtonOptionMessageItem = styled.button`
  background-color: none;
  color: grey;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f8f8f8;
    color: #1d1c1d;
  }
`;

export const MessageItemWrapper = styled.div`
  display: flex;
  padding: 10px;
  margin: 5px 0px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f8f8f8;
  }
  &:hover ${OptionMessageItem} {
    display: block;
  }
`;

export const AvatarMessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0px 10px;
`;

export const ContentMessageItem = styled.div`
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
`;

export const HeaderMessageItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

export const TextMessageItem = styled.p``;
