import styled from 'styled-components';

export const ExtraInfoWrapper = styled.div`
  padding: 10px;
  border-left: 4px solid #dddddd;
  width: 60%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const HeaderExtraInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const ContentExtraInfo = styled.div`
  word-wrap: break-word;
`;
